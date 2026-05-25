import User from '../models/user.model.js';
export const getDashboard = async (req, res) => {
  try {
    const user = req.user;
    const userdata = await User.findById(req.user.id).select('-password');
    console.log(userdata);
    res
      .status(200)
      .json({ message: `Welcome to the dashboard, ${userdata.companyName}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
