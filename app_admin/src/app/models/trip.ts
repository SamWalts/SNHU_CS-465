export interface Trip {
  _id: string; // Mongodb Internal primary key
  code: string;
  name: string;
  length: string;
  start: Date;
  resort: string;
  perPerson: string;
  image: string;
  description: string;
}
