export default interface Service<Request, Response, NextFunction> {
  execute(req: Request, res: Response, next: NextFunction): Promise<any>;
}
