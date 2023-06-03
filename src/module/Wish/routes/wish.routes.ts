import { Request, Response, NextFunction, Router } from 'express';
import { container } from 'tsyringe';
import WishController from '../controller/wish.controller';

const wishRoute = Router();
const wish = container.resolve(WishController);

wishRoute
  .get('/all', (req: Request, res: Response, next: NextFunction) => wish.getAll(req, res, next))
  .post('/new', (req: Request, res: Response, next: NextFunction) => wish.post(req, res, next))
  .get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => wish.getOne(req, res, next))
  .patch('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => wish.patch(req, res, next))
  .delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => wish.delete(req, res, next));

export default wishRoute;
