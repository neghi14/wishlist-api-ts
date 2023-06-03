import { container } from 'tsyringe';
import { Request, Response, NextFunction, Router } from 'express';
import AuthController from '../../controller/auth/auth.controller';
import validatorHelper from '../../../../common/helpers/validator.helper';
import { createUserSchema } from '../../../../common/database/schema/user.schema';

const authRoute = Router();

const auth = container.resolve(AuthController);

authRoute
  .post('/login', (req: Request, res: Response, next: NextFunction) => auth.login(req, res, next))
  .post('/register', validatorHelper(createUserSchema), (req: Request, res: Response, next: NextFunction) =>
    auth.register(req, res, next)
  )
  .post(
    '/logout',
    (req: Request, res: Response, next: NextFunction) => auth.verifySession(req, res, next),
    (req: Request, res: Response, next: NextFunction) => auth.logout(req, res, next)
  );

export default authRoute;
