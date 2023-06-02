import { injectable } from 'tsyringe';
import CRUD from '../../../common/interface/crud.interface';
import databaseUtils from '../../../common/utils/database.utils';
import sessionModel from '../../../common/database/model/session.model';
import Session from '../../../common/database/document/session.document';

@injectable()
export default class SessionRepository implements CRUD {
  async getOne(params: Record<string, any>): Promise<void> {
    return await databaseUtils.readOne(sessionModel, params);
  }
  async getAll(query: Record<string, any>): Promise<any> {
    return await databaseUtils.readAll(sessionModel, query);
  }
  async createOne(payload: Session): Promise<void> {
    return await databaseUtils.createOne(sessionModel, payload);
  }
  async updateOne(params: Record<string, any>, payload: Session): Promise<void> {
    return await databaseUtils.updateOne(sessionModel, params, payload);
  }
  async deleteOne(params: Record<string, any>): Promise<void> {
    return await databaseUtils.deleteOne(sessionModel, params);
  }
}
