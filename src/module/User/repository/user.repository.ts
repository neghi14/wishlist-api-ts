import { injectable } from 'tsyringe';
import CRUD from '../../../common/interface/crud.interface';
import databaseUtils from '../../../common/utils/database.utils';
import userModel from '../../../common/database/model/user.model';
import User from '../../../common/database/document/user.document';

@injectable()
export default class UserRepository implements CRUD {
  async getOne(params: User): Promise<any> {
    return await databaseUtils.readOne(userModel, params);
  }
  async getAll(query: Record<string, any>): Promise<any> {
    return await databaseUtils.readAll(userModel, query);
  }
  async createOne(payload: Record<string, any>): Promise<any> {
    return await databaseUtils.createOne(userModel, payload);
  }
  async updateOne(params: Record<string, any>, payload: Record<string, any>): Promise<any> {
    return await databaseUtils.updateOne(userModel, params, payload);
  }
  async deleteOne(params: Record<string, any>): Promise<any> {
    return await databaseUtils.deleteOne(userModel, params);
  }
}
