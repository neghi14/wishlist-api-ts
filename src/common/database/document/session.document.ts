import Base from './base.document';

export default interface Session extends Base {
  refresh_token: string;
  session_token?: string;
  user?: string;
}
