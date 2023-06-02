import { Document } from 'mongoose';

export default interface Base {
  _id?: string;
  created_at?: string;
  updated_at?: string;
}
