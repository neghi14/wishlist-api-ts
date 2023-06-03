import { string, object } from 'zod';

export const CreateWishSchema = object({
  content: string({
    required_error: 'Your wish is empty',
  }).min(2, 'Your wish should be longer than that'),
  priority: string({ required_error: 'Priority required' }).toUpperCase(),
});
