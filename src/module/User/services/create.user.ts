import { injectable } from 'tsyringe';
import Service from '../../../common/interface/service.interface';
import UserRepository from '../repository/user.repository';
import Http from '../../../common/utils/http.utils';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import User from '../../../common/database/document/user.document';
import { hashed } from '../../../common/utils/bcrypt.utils';
import { omit } from 'lodash';

@injectable()
export default class CreateUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<{}, any, User, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;

      const payload: User = {
        first_name,
        last_name,
        email,
        password: await hashed(password),
      };
      const data = await this.userRepository.createOne(payload);

      //const data = await omit(user, 'password');

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'User Created!',
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
