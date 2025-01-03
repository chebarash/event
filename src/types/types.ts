export type ContentType = { type: `video` | `photo`; fileId: string };

export type EventsType = { [_id: string]: EventType };
export type DailyType = { [day: string]: Array<EventType> };

export type EventType = {
  _id: string;
  title: string;
  picture: string;
  color: string;
  description: string;
  author: ClubType;
  date: Date;
  venue: string;
  duration: number;
  shares: number;
  registered: Array<UserType>;
  participated: Array<UserType>;
  hashtags: Array<string>;
  spots?: number;
  deadline?: Date;
  external?: string;
  content?: ContentType;
  template?: string;
  button?: string;
  private?: boolean;
  cancelled?: boolean;
  isRegistered?: boolean;
  isParticipated?: boolean;
};

export type ClubType = {
  _id: string;
  username: string;
  name: string;
  description: string;
  links: Array<{ url: string; text: string }>;
  cover: string;
  hidden: boolean;
  leader: UserType;
  color: string;
};

export type UserType = {
  _id: string;
  name: string;
  picture?: string;
  email: string;
  id: number;
  member: Array<ClubType>;
  clubs: Array<ClubType>;
};

export type ForYouType = {
  title: string;
  subtitle: string;
  button: string;
  image: string;
  link: string;
};

export type EventContextType = EventType & {
  update: () => any;
  edit: (event: EventType) => any;
  participate: (participant: string) => any;
};
