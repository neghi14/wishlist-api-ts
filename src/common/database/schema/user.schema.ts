import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    first_name: string({
      required_error: 'First name is required',
    })
      .min(2)
      .toLowerCase(),
    last_name: string({
      required_error: 'Last name is required',
    })
      .min(2)
      .toLowerCase(),
    email: string({
      required_error: 'Email is required',
    })
      .email('Not a valid email')
      .toLowerCase(),
    password: string({
      required_error: 'Password is required',
    })
      .min(6)
      .max(12),
  }),
});

//export type CreateUserInput = typeof createUserSchema;
