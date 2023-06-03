import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import WishRepository from '../repository/wish.repository';
import Http from '../../../common/utils/http.utils';
import { ParsedQs } from 'qs';
import ErrorHelper from '../../../common/helpers/error.helpers';
import Wish, { Status } from '../../../common/database/document/wish.document';

@injectable()
export default class UpdateWishService implements Service<Request, Response, NextFunction> {
  constructor(private wishRepository: WishRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, Wish, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const { list, content, priority, status } = req.body;

      const newWishPayload: Wish = {
        list,
        content,
        priority,
        status,
      };
      const data = await this.wishRepository.updateOne({ _id: id }, newWishPayload);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'Wish Updated!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
