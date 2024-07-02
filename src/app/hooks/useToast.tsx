"use client";
import { createContext, useContext, useState } from "react";
import Toast from "../components/toast";

type ToastType = { toast: (message: string) => any };

const ToastContext = createContext<ToastType>({
  toast: (message: string) => {},
});

export function ToastProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, setMessages] = useState<Array<string>>([]);

  const toast = (message: string) => {
    const mess = `${Date.now()} ${message}`;
    setMessages((messages) => [...messages, mess]);
    setTimeout(() => {
      setMessages((messages) => {
        messages.splice(messages.indexOf(mess), 1);
        return messages;
      });
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="toast">
        {messages.map((message) => (
          <Toast key={message}>{message.slice(message.indexOf(` `) + 1)}</Toast>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export default function useToast() {
  return useContext(ToastContext);
}
