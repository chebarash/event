"use client";

import Toast from "@/ui/toast/toast";
import { createContext, useContext, useState } from "react";

type MessagesType = Array<{ message: string; date: number; error: boolean }>;
type ToastType = {
  toast: (message: string, error?: boolean) => any;
};

const ToastContext = createContext<ToastType>({
  toast: () => {},
});

export function ToastProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, setMessages] = useState<MessagesType>([]);

  const toast = (message: string, error: boolean = false) => {
    const mess = { message, date: Date.now(), error };
    setMessages((messages) => [...messages, mess]);
    setTimeout(() => {
      setMessages((messages) =>
        messages.filter(
          ({ message, date, error }) =>
            message != mess.message || date != mess.date || error != mess.error
        )
      );
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="toast">
        {messages.map(({ message, error, date }) => (
          <Toast key={date} error={error}>
            {message}
          </Toast>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export default function useToast() {
  return useContext(ToastContext);
}
