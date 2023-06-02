import { object, string } from 'zod';

export const createSessionSchema = object({
  body: object({
    user: string({
      required_error: 'User ID not provided',
    }),
  }),
});
