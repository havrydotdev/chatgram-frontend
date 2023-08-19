import { Message } from "./message";

export interface Chat {
  id: number;

  name: string;

  users: number[];

  messages: Message[];
}
