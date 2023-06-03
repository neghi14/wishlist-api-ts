import { injectable } from 'tsyringe';
import CRUD from '../../../common/interface/crud.interface';
import databaseUtils from '../../../common/utils/database.utils';
import listModel from '../../../common/database/model/list.model';

@injectable()
export default class ListRepository implements CRUD {
  async getOne(params: Record<string, any>): Promise<any> {
    return await databaseUtils.readOne(listModel, params);
  }
  async getAll(query: Record<string, any>): Promise<any> {
    return await databaseUtils.readAll(listModel, query);
  }
  async createOne(payload: Record<string, any>): Promise<any> {
    return await databaseUtils.createOne(listModel, payload);
  }
  async updateOne(params: Record<string, any>, payload: Record<string, any>): Promise<any> {
    return await databaseUtils.updateOne(listModel, params, payload);
  }
  async deleteOne(params: Record<string, any>): Promise<any> {
    return await databaseUtils.deleteOne(listModel, params);
  }
}
