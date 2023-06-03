import { model, Schema } from 'mongoose';
import Session from '../document/session.document';

const SessionSchema: Schema = new Schema<Session>(
  {
    refresh_token: String,
    session_token: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    is_valid: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model<Session>('Sessions', SessionSchema);
