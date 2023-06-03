import { NextFunction, Request, Response } from 'express';
import ErrorHelper from '../../../../common/helpers/error.helpers';
import { signJwt, verifyJwt } from '../../../../common/utils/jwt.utils';
import { get } from 'lodash';
import { injectable } from 'tsyringe';
import Service from '../../../../common/interface/service.interface';
import SessionRepository from '../../../Session/repository/session.repository';
import UserRepository from '../../repository/user.repository';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import config from 'config';

@injectable()
export default class VerifyUserSession implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private userRepository: UserRepository) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      //Get session & refresh token
      let sessionToken = get(req, 'headers.authorization')
        ?.replace(/^Bearer/s, '')
        .trim();
      const refreshToken = get(req, 'headers.x-refresh')?.toString().trim();
      if (!sessionToken) return next(new ErrorHelper('Authentication Error: Header', 403));
      //verify session token
      const { decoded, expired } = verifyJwt(sessionToken);
      const session = await this.sessionRepository.getOne({ _id: get(decoded, 'session') });
      if (!session || !session.is_valid) return next(new ErrorHelper('Session Expired/Expired!', 403));
      if (decoded) {
        res.locals.user = decoded;
        return next();
      }

      //if token expired and there is refresh token

      //BUG: CODE NOT WORKING
      if (expired && refreshToken) {
        const { decoded } = verifyJwt(refreshToken);
        console.log(refreshToken, verifyJwt(refreshToken));
        if (!decoded || !get(decoded, 'session')) return next(new ErrorHelper('Authentication Error: Refresh', 403));

        const session = await this.sessionRepository.getOne({ _id: get(decoded, 'session') });
        if (!session.is_valid) return next(new ErrorHelper('Session Expired/Expired!', 403));
        const user = await this.userRepository.getOne({ _id: session.user });

        sessionToken = await signJwt(
          { ...user, session: session._id },
          {
            expiresIn: config.get('sessionTokenTtl'),
          }
        );
        if (sessionToken) res.setHeader('x-session', sessionToken);
        const result = verifyJwt(sessionToken as string);
        res.locals.result = result.decoded;
        return next();
      }
      next();
    } catch (error) {
      return next(error);
    }
  }
}
