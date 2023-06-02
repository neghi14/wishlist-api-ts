import { injectable } from 'tsyringe';
import GetSessionService from '../services/get.sesssion';
import GetSessionsService from '../services/get.sessions';
import CreateSessionService from '../services/create.session';
import UpdateSessionService from '../services/update.session';
import DeleteSessionService from '../services/delete.session';
import Controller from '../../../common/interface/controller.interface';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@injectable()
export default class UserController implements Controller<Request, Response, NextFunction> {
  constructor(
    private readOne: GetSessionService,
    private readAll: GetSessionsService,
    private createOne: CreateSessionService,
    private updateOne: UpdateSessionService,
    private deleteOne: DeleteSessionService
  ) {}

  async getOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.readOne.execute(req, res, next);
  }

  async getAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.readAll.execute(req, res, next);
  }

  async post(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createOne.execute(req, res, next);
  }

  async patch(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.updateOne.execute(req, res, next);
  }

  async delete(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteOne.execute(req, res, next);
  }
}
