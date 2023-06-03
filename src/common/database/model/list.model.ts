import { Schema, model } from 'mongoose';
import List from '../document/list.document';

const ListSchema: Schema = new Schema<List>(
  {
    title: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

export default model<List>("Lists", ListSchema)