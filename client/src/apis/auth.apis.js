import api from './Api.js';
export const signup = async (input) => {
  try {
    const res = await api.post('/auth/signup', input);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const verifyOtp = async (data) => {
  try {
    const res = await api.post('/auth/verify-otp', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'something went wrong..' };
  }
};

export const resendOtp = async (id) => {
  try {
    const res = await api.post('/auth/resend-otp', { id });
    return res;
  } catch (err) {
    console.log(err);
  }
};
