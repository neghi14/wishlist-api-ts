import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import ListRepository from '../repository/list.repository';
import Http from '../../../common/utils/http.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import List from '../../../common/database/document/list.document';

@injectable()
export default class ListCreateService implements Service<Request, Response, NextFunction> {
  constructor(private listRepository: ListRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, List, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { title, author } = req.body;

      const newListPayload = {
        title,
        author: res.locals.user,
      };
      const data = await this.listRepository.createOne(newListPayload);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'List Created!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
