import { injectable } from 'tsyringe';
import UserLogin from '../../services/auth/login.user';
import { NextFunction, Request, Response } from 'express';
import RegisterUserService from '../../services/auth/register.user';
import VerifyUserSession from '../../helpers/auth/verify.user';
import LogoutUserService from '../../services/auth/logout.user';

@injectable()
export default class AuthController {
  constructor(
    private userLogin: UserLogin,
    private userRegister: RegisterUserService,
    private verifyUserSession: VerifyUserSession,
    private logoutUser: LogoutUserService
  ) {}
  async login(req: Request, res: Response, next: NextFunction) {
    await this.userLogin.execute(req, res, next);
  }
  async register(req: Request, res: Response, next: NextFunction) {
    await this.userRegister.execute(req, res, next);
  }
  async verifySession(req: Request, res: Response, next: NextFunction) {
    await this.verifyUserSession.execute(req, res, next);
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    await this.logoutUser.execute(req, res, next);
  }
}
