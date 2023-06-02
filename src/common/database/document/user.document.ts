import Base from './base.document';

export default interface User extends Base {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: number;
}
