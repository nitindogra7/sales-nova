import crypto from 'crypto';
import Workspace from '../models/workspace.model.js';

export const generateApiKey = () => {
  return `sn_${crypto.randomBytes(32).toString('hex')}`;
};

export const findWorkspaceByUserId = async (id) => {
  let workspace = await Workspace.findOne({ user: id });
  return workspace;
};
