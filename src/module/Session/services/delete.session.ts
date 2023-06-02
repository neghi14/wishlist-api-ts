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
export default class DeleteSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const data = await this.sessionRepository.deleteOne({ _id: id });

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Session Deleted!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
