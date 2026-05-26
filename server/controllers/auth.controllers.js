import User from '../models/user.model.js';
import { otpSchema } from '../schemas/otp.schema.js';
import jwt from 'jsonwebtoken';
import { registerSchema } from '../schemas/user.schema.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { findUserByEmailOrUsername } from '../services/auth.services.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import sendEmail from '../services/nodemailer.services.js';
import Otp from '../models/otp.model.js';
import generateOtp from '../services/otp.services.js';

// Helper functions

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Controllers

export const signUpController = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues.map((err) => err.message);
      return res.status(400).json({ success: false, message: error });
    }

    const { email, username, password } = result.data;
    const userExists = await findUserByEmailOrUsername(email, username);

    if (userExists)
      return res.status(409).json({
        success: false,
        message: 'user already exists',
      });

    const saltRounds = Number(process.env.SALT_ROUNDS);
    if (isNaN(saltRounds))
      return res.status(500).json({ success: false, message: 'server broke' });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const otp = generateOtp();
    const emailSent = await sendEmail(otp, email);
    const hashedOtp = await bcrypt.hash(String(otp), 10);

    if (!emailSent.success)
      return res
        .status(500)
        .json({ success: false, message: emailSent.message });

    const otpData = await Otp.findOneAndUpdate(
      { email },
      {
        email,
        username,
        password: hashedPassword,
        otp: hashedOtp,
        companyName: result.data.companyName,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      message: 'otp sent successfully',
      otpId: otpData._id,
    });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(409)
        .json({ success: false, message: 'user already exists' });
    console.error(err);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const result = otpSchema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues.map((err) => err.message);
      return res.status(400).json({ success: false, message: error });
    }
    const { stringOtp, id } = result.data;
    const user = await Otp.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'user otp not found' });
    const isOtpValid = await bcrypt.compare(stringOtp, user.otp);
    if (!isOtpValid)
      return res
        .status(400)
        .json({ success: false, message: 'please enter a valid otp' });

    await Otp.findByIdAndDelete(id);
    const createUser = await User.create({
      email: user.email,
      password: user.password,
      companyName: user.companyName,
      username: user.username,
      role: 'owner',
    });
    const accessToken = generateAccessToken(createUser._id, createUser.role);
    const refreshToken = generateRefreshToken(createUser._id, createUser.role);

    const details = {
      username: user.username,
      companyName: user.companyName,
      email: user.email,
      accessToken,
    };

    res.cookie('salesNova_rfs_tkn', refreshToken, refreshCookieOptions);
    createUser.refreshToken = hashToken(refreshToken);
    await createUser.save();

    res.status(201).json({
      success: true,
      message: 'user created successfully',
      userData: details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: 'otpId required from localstorage' });

    const user = await Otp.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'user not found signup again' });
    const email = user.email;
    if (!email)
      return res
        .status(404)
        .json({ success: false, message: 'please signin again' });
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(String(otp), 10);
    user.otp = hashedOtp;
    await user.save();
    res.status(200).json({ success: true, message: 'otp send successfully' });
    const emailSent = await sendEmail(otp, email);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong please try again later',
    });
    console.log(err);
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.salesNova_rfs_tkn;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.refreshToken !== hashToken(refreshToken)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id, user.role);

    res.cookie('salesNova_rfs_tkn', newRefreshToken, refreshCookieOptions);

    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: 'Refresh token expired or invalid',
    });
  }
};
