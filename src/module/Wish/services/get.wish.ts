import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import WishRepository from '../repository/wish.repository';
import Http from '../../../common/utils/http.utils';
import { ParsedQs } from 'qs';
import ErrorHelper from '../../../common/helpers/error.helpers';

@injectable()
export default class GetWishService implements Service<Request, Response, NextFunction> {
  constructor(private wishRepository: WishRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = await this.wishRepository.getOne({ _id: id });

      if (!data) return next(new ErrorHelper('Wish not found', 404));

      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'Wish Retrieved!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
