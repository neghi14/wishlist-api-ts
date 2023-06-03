import { injectable } from 'tsyringe';
import Service from '../../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import Session from '../../../../common/database/document/session.document';
import config from 'config';
import User from '../../../../common/database/document/user.document';
import ErrorHelper from '../../../../common/helpers/error.helpers';
import Http from '../../../../common/utils/http.utils';
import { signJwt } from '../../../../common/utils/jwt.utils';
import SessionRepository from '../../../Session/repository/session.repository';
import UserRepository from '../../repository/user.repository';
import { hashed } from '../../../../common/utils/bcrypt.utils';
import { omit } from 'lodash';

@injectable()
export default class RegisterUserService implements Service<Request, Response, NextFunction> {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private http: Http
  ) {}
  async execute(req: Request<{}, any, User>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { first_name, last_name, email, password, phone } = req.body;

      const newUserPayload: User = {
        first_name,
        last_name,
        email,
        password: await hashed(password),
        phone,
      };

      //TODO: Fetch User data
      const user = await this.userRepository.createOne(newUserPayload);

      //TODO: Create Token

      const session_exp = config.get<string>('sessionTokenTtl');
      const refresh_exp = config.get<string>('refreshTokenTtl');

      const newSessionPayload = {
        user: user._id,
        session_token: await signJwt(
          { _id: user._id },
          {
            expiresIn: session_exp,
          }
        ),
        refresh_token: await signJwt(
          { _id: user._id },
          {
            expiresIn: refresh_exp,
          }
        ),
        is_valid: true,
      };
      if (newSessionPayload.refresh_token?.includes('Error') || newSessionPayload.session_token?.includes('Error')) {
        return next(new ErrorHelper(newSessionPayload.refresh_token, 400));
      }
      const token = await this.sessionRepository.createOne(newSessionPayload);
      const data = {
        user: omit(user.toJSON(), 'password'),
        token,
      };

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Registration Successfull!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
