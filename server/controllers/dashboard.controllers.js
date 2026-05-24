import User from '../models/user.model.js';
export const getDashboard = async (req, res) => {
  const user = req.user;
  const userdata = await User.findById(user._id).select('-password -otpId');
  res
    .status(200)
    .json({ message: `Welcome to the dashboard, ${userdata.username}!` });
};
