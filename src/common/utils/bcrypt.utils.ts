import bcrypt from 'bcrypt';

export const hashed = (password: any): Promise<any> => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error: any) {
    return error;
  }
};
export const verifyHash = (password: string, data: string) => {
  try {
    return bcrypt.compare(password, data);
  } catch (error) {
    return error;
  }
};
