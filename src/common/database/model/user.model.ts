import { model, Schema } from 'mongoose';
import User from '../document/user.document';

const userSchema: Schema = new Schema<User>(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: Number,
  },
  {
    timestamps: true,
  }
);

export default model<User>('Users', userSchema);
