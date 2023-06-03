import { injectable } from 'tsyringe';
import Service from '../../../../common/interface/service.interface';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repository/user.repository';
import Http from '../../../../common/utils/http.utils';
import SessionRepository from '../../../Session/repository/session.repository';
import User from '../../../../common/database/document/user.document';
import ErrorHelper from '../../../../common/helpers/error.helpers';
import Session from '../../../../common/database/document/session.document';
import config from 'config';
import { signJwt } from '../../../../common/utils/jwt.utils';
import { verifyHash } from '../../../../common/utils/bcrypt.utils';
import { omit } from 'lodash';

@injectable()
export default class UserLoginService implements Service<Request, Response, NextFunction> {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private http: Http
  ) {}
  async execute(req: Request<{}, any, User>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      //TODO: Check if there are values
      if (!email || !password) {
        return next(new ErrorHelper('Invalid Credentials', 400));
      }

      //TODO: Fetch User data
      const user = await this.userRepository.getOne({ email });

      if (!user) {
        return next(new ErrorHelper('User not Found!', 404));
      }

      //TODO: Check if passwords match

      const hashedPassword = await verifyHash(password, user.password);

      if (!hashedPassword) {
        return next(new ErrorHelper("Passwords Don't Match", 400));
      }

      //CREATE NEW SESSION
      const createSessionPayload: Session = {
        user: user._id,
        is_valid: true,
      };

      const session = await this.sessionRepository.createOne(createSessionPayload);

      //DONE: Create Token

      const session_exp = config.get<string>('sessionTokenTtl');
      const refresh_exp = config.get<string>('refreshTokenTtl');

      const newSessionPayload: Session = {
        session_token: await signJwt(
          { _id: user._id, session: session._id },
          {
            expiresIn: session_exp,
          }
        ),
        refresh_token: await signJwt(
          { _id: user._id, session: session._id },
          {
            expiresIn: refresh_exp,
          }
        ),
      };
      if (newSessionPayload.refresh_token?.includes('Error')) {
        return next(new ErrorHelper(newSessionPayload.refresh_token, 403));
      }

      const token = await this.sessionRepository.updateOne({ _id: session._id }, newSessionPayload);
      const data = {
        user: omit(user.toJSON(), 'password'),
        token,
      };

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Login Successfull!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
