import { Document } from 'mongoose';

export interface Video extends Document {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly date: Date;
  readonly artist: string;
}
