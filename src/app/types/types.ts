export type ContentType = { type: `video` | `photo`; fileId: string };

export type EventsType = { [_id: string]: EventType };
export type DailyType = { [day: string]: Array<EventType> };

export type EventType = {
  _id: string;
  title: string;
  picture: string;
  description: string;
  author: UserType | ClubType;
  authorModel: `users` | `clubs`;
  date: Date;
  venue: string;
  duration: number;
  shares: number;
  content?: ContentType;
  template?: string;
  button?: string;
  external?: string;
  participants: Array<string>;
};

export type ClubType = {
  _id: string;
  username: string;
  name: string;
  description: string;
  links: Array<{ url: string; text: string }>;
  cover: string;
  coordinators: Array<UserType>;
};

export type UserType = {
  _id: string;
  name: string;
  picture?: string;
  email: string;
  id: number;
  organizer: boolean;
  member: Array<ClubType>;
  clubs: Array<ClubType>;
};
