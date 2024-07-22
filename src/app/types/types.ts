export type EventType = {
  _id: string;
  title: string;
  picture: string;
  description: string;
  authors: Array<UserType>;
  date: Date;
  venue: string;
  duration: number;
};

export type UserType = {
  _id: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  id: number;
};
