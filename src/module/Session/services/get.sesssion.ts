import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import Session from '../../../common/database/document/session.document';
import { ParsedQs } from 'qs';
import Http from '../../../common/utils/http.utils';
import SessionRepository from '../repository/session.repository';
import ErrorHelper from '../../../common/helpers/error.helpers';

@injectable()
export default class GetSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.sessionRepository.getOne({ _id: id });
      if (!data) {
        return next(new ErrorHelper('Session Not Found', 404));
      }

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Session Retrieved!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
