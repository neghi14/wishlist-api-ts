import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import { NextFunction, Request, Response } from 'express';
import WishRepository from '../repository/wish.repository';
import Http from '../../../common/utils/http.utils';
import { ParsedQs } from 'qs';

@injectable()
export default class GetWishesService implements Service<Request, Response, NextFunction> {
  constructor(private wishRepository: WishRepository, private http: Http) {}
  async execute(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await this.wishRepository.getAll(req.query);

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Wish Retrieved!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
