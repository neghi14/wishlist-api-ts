import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { Request, Response, NextFunction } from 'express';
import SessionRepository from '../repository/session.repository';
import Http from '../../../common/utils/http.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Session from '../../../common/database/document/session.document';
import { signJwt } from '../../../common/utils/jwt.utils';
import config from 'config';

@injectable()
export default class CreateSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = res.locals.user;

      const session_exp = config.get<string>('sessionTokenTtl');
      const refresh_exp = config.get<string>('refreshTokenTtl');

      const newSessionPayload: Session = {
        user: _id,
        session_token: await signJwt(
          { _id },
          {
            expiresIn: session_exp,
          }
        ),
        refresh_token: await signJwt(
          { _id },
          {
            expiresIn: refresh_exp,
          }
        ),
      };

      const data = await this.sessionRepository.createOne(newSessionPayload);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'Session Created!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
