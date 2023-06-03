import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import User from '../../../common/database/document/user.document';
import { hashed } from '../../../common/utils/bcrypt.utils';
import { omit } from 'lodash';
import ErrorHelper from '../../../common/helpers/error.helpers';

@injectable()
export default class UpdateUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, User, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, password } = req.body;

      const payload: User = {
        first_name,
        last_name,
        email,
        password: await hashed(password),
      };
      const data = await this.userRepository.updateOne({ _id: id }, payload);

      //  const user = omit(data.JSON(), 'password');
      if (!data) {
        return next(new ErrorHelper('User Not Found', 404));
      }
      this.http.Response({
        res,
        status: 'success',
        statusCode: 201,
        message: 'User Updated!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
