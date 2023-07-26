import { IUser } from "./user";

interface IPrompt {
  _id?: string;
  creator?: IUser;
  prompt: string;
  tag: string;
}

export type { IPrompt };
