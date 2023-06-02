import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import Session from '../../../common/database/document/session.document';
import { ParsedQs } from 'qs';
import Http from '../../../common/utils/http.utils';
import SessionRepository from '../repository/session.repository';

@injectable()
export default class GetSessionsService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{}, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.sessionRepository.getAll(req.query);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Sessions Retrieved!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
