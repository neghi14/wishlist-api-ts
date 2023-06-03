import { Request, Response, Router, NextFunction } from 'express';
import { container } from 'tsyringe';
import UserController from '../controller/user.controller';
import validatorHelper from '../../../common/helpers/validator.helper';
import { createUserSchema } from '../../../common/database/schema/user.schema';
import AuthController from '../controller/auth/auth.controller';

const user = container.resolve(UserController);
const auth = container.resolve(AuthController);
const userRoute = Router();

userRoute
  .get(
    '/all',
    (req: Request, res: Response, next: NextFunction) => auth.verifySession(req, res, next),
    (req: Request, res: Response, next: NextFunction) => user.getAll(req, res, next)
  )
  .post('/new', validatorHelper(createUserSchema), (req: Request, res: Response, next: NextFunction) =>
    user.post(req, res, next)
  )
  .get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => user.getOne(req, res, next))
  .patch('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => user.patch(req, res, next))
  .delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => user.delete(req, res, next));

export default userRoute;
