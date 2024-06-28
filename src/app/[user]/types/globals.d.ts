import { TelegramWebApps } from "./telegram";

declare global {
  interface Window {
    Telegram: { WebApp: TelegramWebApps.WebApp };
  }

  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
    }
  }
}

export {};
