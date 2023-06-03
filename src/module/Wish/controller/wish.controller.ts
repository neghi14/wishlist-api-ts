import { injectable } from 'tsyringe';
import Controller from '../../../common/interface/controller.interface';
import { NextFunction, Request, Response } from 'express';
import GetWishService from '../services/get.wish';
import GetWishesService from '../services/get.wishes';
import CreateWishService from '../services/create.wish';
import UpdateWishService from '../services/update.wish';
import DeleteWishService from '../services/delete.wish';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@injectable()
export default class WishController implements Controller<Request, Response, NextFunction> {
  constructor(
    private getWish: GetWishService,
    private getWishes: GetWishesService,
    private createWish: CreateWishService,
    private updateWish: UpdateWishService,
    private deleteWish: DeleteWishService
  ) {}
  async getOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getWish.execute(req, res, next);
  }
  async getAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getWishes.execute(req, res, next);
  }
  async post(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createWish.execute(req, res, next);
  }
  async patch(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.updateWish.execute(req, res, next);
  }
  async delete(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteWish.execute(req, res, next);
  }
}
