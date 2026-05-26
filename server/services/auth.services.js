import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';

export const findUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({ $or: [{ email }, { username }] });
};

