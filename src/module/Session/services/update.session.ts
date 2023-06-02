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
export default class UpdateSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = res.locals.user;
      const { id } = req.params;

      const session_exp = Buffer.from(config.get<string>('sessionTokenTtl'), 'base64').toString('ascii');
      const refresh_exp = Buffer.from(config.get<string>('refreshTokenTtl'), 'base64').toString('ascii');

      const newSessionPayload: Session = {
        refresh_token: await signJwt(_id, {
          expiresIn: refresh_exp,
        }),
      };

      const data = await this.sessionRepository.updateOne({ _id: id }, newSessionPayload);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'Session Updated!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
