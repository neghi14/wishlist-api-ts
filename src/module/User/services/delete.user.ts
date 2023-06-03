import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { omit } from 'lodash';
import ErrorHelper from '../../../common/helpers/error.helpers';

@injectable()
export default class DeleteUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const data = await this.userRepository.deleteOne({ _id: id });

      if (!data) {
        return next(new ErrorHelper('User Not Found', 404));
      }

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'User Deleted!',
      });
    } catch (error) {
      return next(error);
    }
  }
}
