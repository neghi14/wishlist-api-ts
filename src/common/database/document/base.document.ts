import { Document } from 'mongoose';

export default interface Base {
  [key: string]: string | any;
  _id?: string;
}
