export type ContentType = { type: `video` | `photo`; fileId: string };

export type EventsType = { [_id: string]: EventType };
export type DailyType = { [day: string]: Array<EventType> };

export type EventType = {
  _id: string;
  title: string;
  picture: string;
  fg: string;
  bg: string;
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
  voting?: {
    title: string;
    options: Array<string>;
    votes: Array<{ user: string; option: string }>;
  };
};

export type ClubType = {
  _id: string;
  name: string;
  description: string;
  channel?: string;
  cover: string;
  hidden: boolean;
  leader: UserType;
  fg: string;
  bg: string;
  members: Array<UserType>;
  rank: number;
  events: Array<EventType>;
  username?: string;
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
  loadingVote: boolean;
  update: (userId?: string) => any;
  edit: (event: EventType) => any;
  participate: (participant: string) => any;
  vote: (option: string) => any;
};

export type ShortClubType = {
  _id: string;
  description: string;
  channel?: string;
  cover: string;
  fg: string;
  bg: string;
};

export type ClubContextType = ClubType & {
  update: () => any;
  edit: (event: ShortClubType) => any;
  remove: (userId: string) => any;
};
