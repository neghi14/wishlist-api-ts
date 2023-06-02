export default interface Controller<Request, Response, NextFunction> {
  getOne(req: Request, res: Response, next: NextFunction): Promise<any>;
  getAll(req: Request, res: Response, next: NextFunction): Promise<any>;
  post(req: Request, res: Response, next: NextFunction): Promise<any>;
  patch(req: Request, res: Response, next: NextFunction): Promise<any>;
  delete(req: Request, res: Response, next: NextFunction): Promise<any>;
}
