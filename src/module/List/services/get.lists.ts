import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import ListRepository from '../repository/list.repository';
import Http from '../../../common/utils/http.utils';
import { ParsedQs } from 'qs';

@injectable()
export default class GetListsService implements Service<Request, Response, NextFunction> {
  constructor(private listRepository: ListRepository, private http: Http) {}
  async execute(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await this.listRepository.getAll(req.query);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'List Retrieved!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
