import { container } from 'tsyringe';
import ListController from '../controller/list.controller';
import { Request, Response, NextFunction, Router } from 'express';

const listRoute = Router();
const list = container.resolve(ListController);

listRoute
  .get('/all', (req: Request, res: Response, next: NextFunction) => list.getAll(req, res, next))
  .post('/new', (req: Request, res: Response, next: NextFunction) => list.post(req, res, next))
  .get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.getOne(req, res, next))
  .patch('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.patch(req, res, next))
  .delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => list.delete(req, res, next));

export default listRoute;
