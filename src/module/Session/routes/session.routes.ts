import { Request, Response, Router, NextFunction } from 'express';
import { container } from 'tsyringe';
import SessionController from '../controller/session.controller';
import validatorHelper from '../../../common/helpers/validator.helper';
import { createSessionSchema } from '../../../common/database/schema/session.schema';

const session = container.resolve(SessionController);
const sessionRoute = Router();

sessionRoute
  .get('/all', (req: Request, res: Response, next: NextFunction) => session.getAll(req, res, next))
  .post('/new', validatorHelper(createSessionSchema), (req: Request, res: Response, next: NextFunction) =>
    session.post(req, res, next)
  )
  .get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => session.getOne(req, res, next))
  .patch('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => session.patch(req, res, next))
  .delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => session.delete(req, res, next));

export default sessionRoute;
