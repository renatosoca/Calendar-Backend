import { User } from './user.interface';

export interface Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  createdFor: User;
}