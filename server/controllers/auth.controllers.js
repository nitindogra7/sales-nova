import User from '../models/user.model.js';
import { otpSchema } from '../schemas/otp.schema.js';
import { registerSchema } from '../schemas/user.schema.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import sendEmail from '../services/nodemailer.services.js';
import Otp from '../models/otp.model.js';
import generateOtp from '../services/otp.services.js';

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
export const signUpController = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues.map((err) => err.message);
      return res.status(400).json({ success: false, message: error });
    }

    const { email, username, password } = result.data;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

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
    const accessToken = generateAccessToken(createUser._id);
    const refreshToken = generateRefreshToken(createUser._id);

    const details = {
      username: user.username,
      email: user.email,
      accessToken,
    };

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('market_rfs_tkn', refreshToken, options);
    createUser.refreshToken = hashToken(refreshToken);
    await createUser.save();

    res
      .status(201)
      .json({ success: true, message: 'user created successfully' });
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
