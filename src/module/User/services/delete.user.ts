import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { omit } from 'lodash';

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

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'User Removed Successfully',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
