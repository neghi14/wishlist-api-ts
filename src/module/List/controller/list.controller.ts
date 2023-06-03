import { injectable } from 'tsyringe';
import Controller from '../../../common/interface/controller.interface';
import { NextFunction, Request, Response } from 'express';
import GetListService from '../services/get.list';
import GetListsService from '../services/get.lists';
import ListCreateService from '../services/create.list';
import ListUpdateService from '../services/update.list';
import ListDeleteService from '../services/delete.list';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@injectable()
export default class ListController implements Controller<Request, Response, NextFunction> {
  constructor(
    private getList: GetListService,
    private getLists: GetListsService,
    private createList: ListCreateService,
    private updateList: ListUpdateService,
    private deleteList: ListDeleteService
  ) {}
  async getOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getList.execute(req, res, next);
  }
  async getAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getLists.execute(req, res, next);
  }
  async post(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createList.execute(req, res, next);
  }
  async patch(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.updateList.execute(req, res, next);
  }
  async delete(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteList.execute(req, res, next);
  }
}
