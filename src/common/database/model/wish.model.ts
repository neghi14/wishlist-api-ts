import { model, Schema } from 'mongoose';
import Wish from '../document/wish.document';

const wishSchema: Schema = new Schema<Wish>(
  {
    list: {
      type: Schema.Types.ObjectId,
      ref: 'Lists',
    },
    content: String,
    status: String,
    priority: String,
  },
  {
    timestamps: true,
  }
);

export default model<Wish>('Wishes', wishSchema);
