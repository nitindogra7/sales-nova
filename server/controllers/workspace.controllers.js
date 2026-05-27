import User from '../models/user.model.js';
import Workspace from '../models/workspace.model.js';
import { generateApiKey } from '../services/workspace.services.js';
import { findUserById } from '../services/auth.services.js';
export const getWorkspace = async (req, res) => {
  try {
    const id = req.user.id;
    const userdata = await findUserById(id);
    res.status(200).json({
      sucess: true,
      user: {
        username: userdata.username,
        role: userdata.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const generateApi = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }
    const apiKey = generateApiKey();
    let workspace = await Workspace.findOne({ user: id });
    if (workspace) {
      workspace.apiKey = apiKey;
      await workspace.save();
    } else {
      workspace = await Workspace.create({
        user: id,
        apiKey,
      });
    }
    console.log(workspace.apiKey);
    return res.status(200).json({
      success: true,
      message: 'API key generated successfully',
      apiKey: workspace.apiKey,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id)
      return res.status(401).json({ success: false, message: 'access denied' });
    const workspace = await Workspace.findOne({ user: id });
    if (!workspace)
      return res
        .status(400)
        .json({ success: false, message: 'no api-key found' });
    const apiKey = workspace.apiKey;
    res.status(200).json({ success: true, apiKey });
  } catch (err) {
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};
