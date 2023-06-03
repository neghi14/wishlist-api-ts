export default interface CRUD {
  getAll(query: Record<string, string | any>): Promise<any>;
  getOne(params: Record<string, string | any>): Promise<any>;
  createOne(payload: Record<string, string | any>): Promise<any>;
  updateOne(params: Record<string, string | any>, payload: Record<string, string | any>): Promise<any>;
  deleteOne(params: Record<string, string | any>): Promise<any>;
}
