import { injectable } from 'tsyringe';
import Service from '../../../../common/interface/service.interface';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repository/user.repository';
import SessionRepository from '../../../Session/repository/session.repository';
import Http from '../../../../common/utils/http.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { get } from 'lodash';

@injectable()
export default class LogoutUserService implements Service<Request, Response, NextFunction> {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private http: Http
  ) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      //get user
      const user = res.locals.user;
      //get session token
      const token = await this.sessionRepository.updateOne({ _id: get(user, 'session') }, { is_valid: false });

      this.http.Response({
        res,
        status: 'success',
        statusCode: 200,
        message: 'Logout Successfull!',
      });
    } catch (error) {}
  }
}
