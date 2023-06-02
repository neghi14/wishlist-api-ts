import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey: string = Buffer.from(config.get<string>('private_key'), 'base64').toString('ascii');
const publicKey: string = Buffer.from(config.get<string>('public_key'), 'base64').toString('ascii');

export const signJwt = (data: string, options?: jwt.SignOptions): any => {
  try {
    return jwt.sign(data, privateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (error) {
    return error;
  }
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: '',
    };
  }
};
