import crypto from 'crypto';

export const generateApiKey = () => {
  return `sn_${crypto.randomBytes(32).toString('hex')}`;
};
