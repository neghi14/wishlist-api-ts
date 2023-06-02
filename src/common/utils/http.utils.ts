import { Response } from 'express';

export default class Http {
  constructor() {}

  Response({ res, status, statusCode, message, data }: IResponse) {
    res.status(statusCode).json({
      status,
      message,
      data,
    });
  }
}
interface IResponse {
  res: Response;
  status: 'success' | 'error' | 'failed';
  statusCode: number;
  message: string;
  data?: Object | Array<string>;
}
