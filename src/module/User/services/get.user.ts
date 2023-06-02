import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { omit } from 'lodash';

@injectable()
export default class GetUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userRepository.getOne({ _id: id });

      const data = omit(user.JSON(), 'password');

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'User Retrieved Successfully',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
