import Base from './base.document';

export default interface Wish extends Base {
    list?: string,
    content: string,
    priority: Priority,
    status: Status
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}
export enum Status {
  FULFILLED,
  UNFUFILLED,
}
