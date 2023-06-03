import { container } from 'tsyringe';
import ListController from '../controller/list.controller';
import { Request, Response, NextFunction, Router } from 'express';
import validatorHelper from '../../../common/helpers/validator.helper';
import { CreateListSchema } from '../../../common/database/schema/list.schema';
import VerifyUserSession from '../../User/helpers/auth/verify.user';
import AuthController from '../../User/controller/auth/auth.controller';

const listRoute = Router();
const list = container.resolve(ListController);
const auth = container.resolve(AuthController);

listRoute
  .get('/all', (req: Request, res: Response, next: NextFunction) => list.getAll(req, res, next))
  .post(
    '/new',
    (req: Request<{ id: string }>, res: Response, next: NextFunction) => auth.verifySession(req, res, next),
    validatorHelper(CreateListSchema),
    (req: Request, res: Response, next: NextFunction) => list.post(req, res, next)
  )
  .get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.getOne(req, res, next))
  .patch('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.patch(req, res, next))
  .delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.delete(req, res, next));

export default listRoute;
