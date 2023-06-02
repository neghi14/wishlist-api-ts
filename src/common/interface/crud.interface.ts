export default interface CRUD {
  getAll(query: Record<string, string | any>): Promise<void>;
  getOne(params: Record<string, string | any>): Promise<void>;
  createOne(payload: Record<string, string | any>): Promise<void>;
  updateOne(params: Record<string, string | any>, payload: Record<string, string | any>): Promise<void>;
  deleteOne(params: Record<string, string | any>): Promise<void>;
}
