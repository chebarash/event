import { Telegram } from "./telegram";

declare global {
  interface Window {
    Telegram: Telegram;
  }

  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
    }
  }
}

export {};
