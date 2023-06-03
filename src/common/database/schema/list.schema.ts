import { string, object } from 'zod';

export const CreateListSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }).toLowerCase(),
  }),
});
