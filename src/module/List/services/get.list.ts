import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import ListRepository from '../repository/list.repository';
import Http from '../../../common/utils/http.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ErrorHelper from '../../../common/helpers/error.helpers';

@injectable()
export default class GetListService implements Service<Request, Response, NextFunction> {
  constructor(private listRepository: ListRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = await this.listRepository.getOne({ _id: id });

      if (!data) return next(new ErrorHelper('List not found', 404));

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
