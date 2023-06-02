import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';

@injectable()
export default class GetUsersService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
        const data = await this.userRepository.getAll(req.query);
        

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Users Retrieved Successfully',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
