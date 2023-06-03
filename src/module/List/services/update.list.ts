import { injectable } from 'tsyringe';
import ListRepository from '../repository/list.repository';
import Http from '../../../common/utils/http.utils';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import List from '../../../common/database/document/list.document';

@injectable()
export default class ListUpdateService implements Service<Request, Response, NextFunction> {
  constructor(private listRepository: ListRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, List, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const { title } = req.body;

      const newListPayload = {
        title,
      };

      const data = await this.listRepository.updateOne({ _id: id }, newListPayload);

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
