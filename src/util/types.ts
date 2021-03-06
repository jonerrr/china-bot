import { MessageSelectOptionData } from "discord.js";

export interface Word {
  word: string;
  good: boolean;
}
export interface Question {
  question: string;
  answers: string[];
}

export interface Quiz {
  question: string;
  answers: MessageSelectOptionData[];
}

export interface UserModel {
  _id: string;
  username: string;
  credit: number;
  sentiment?: boolean;
  popQuiz?: boolean;
  voteExpire: number;
  cooldown: number;
}

export interface ServerModel {
  _id: string;
  sentiment: boolean;
  popQuiz: boolean;
  cooldown: number;
}

export interface Leaderboard {
  users: UserModel[];
  nextPage: boolean;
  prevPage: boolean;
}
