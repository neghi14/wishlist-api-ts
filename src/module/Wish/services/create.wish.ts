import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import WishRepository from '../repository/wish.repository';
import Http from '../../../common/utils/http.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Wish, { Status } from '../../../common/database/document/wish.document';

@injectable()
export default class CreateWishService implements Service<Request, Response, NextFunction> {
  constructor(private wishRepository: WishRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, Wish, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { list, content, priority } = req.body;

      const newWishPayload = {
        list,
        content,
        priority,
        status: 'UNFULFILLED',
      };
      const data = await this.wishRepository.createOne(newWishPayload);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'Wish Created!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
