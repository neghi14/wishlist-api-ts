import { injectable } from 'tsyringe';
import GetUserService from '../services/get.user';
import GetUsersService from '../services/get.users';
import CreateUserService from '../services/create.user';
import UpdateUserService from '../services/update.user';
import DeleteUserService from '../services/delete.user';
import Controller from '../../../common/interface/controller.interface';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@injectable()
export default class UserController implements Controller<Request, Response, NextFunction> {
  constructor(
    private readOne: GetUserService,
    private readAll: GetUsersService,
    private createOne: CreateUserService,
    private updateOne: UpdateUserService,
    private deleteOne: DeleteUserService
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
