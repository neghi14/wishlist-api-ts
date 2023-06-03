import { injectable } from 'tsyringe';
import CRUD from '../../../common/interface/crud.interface';
import databaseUtils from '../../../common/utils/database.utils';
import wishModel from '../../../common/database/model/wish.model';

@injectable()
export default class WishRepository implements CRUD {
  async getOne(params: Record<string, any>): Promise<any> {
    return await databaseUtils.readOne(wishModel, params);
  }
  async getAll(query: Record<string, any>): Promise<any> {
    return await databaseUtils.readAll(wishModel, query);
  }
  async createOne(payload: Record<string, any>): Promise<any> {
    return await databaseUtils.createOne(wishModel, payload);
  }
  async updateOne(params: Record<string, any>, payload: Record<string, any>): Promise<any> {
    return await databaseUtils.updateOne(wishModel, params, payload);
  }
  async deleteOne(params: Record<string, any>): Promise<any> {
    return await databaseUtils.deleteOne(wishModel, params);
  }
}
