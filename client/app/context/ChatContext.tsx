"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Socket } from "socket.io-client";

interface ChatContextType {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  return (
    <ChatContext.Provider value={{ userName, setUserName, socket, setSocket }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChatContext deve ser usado dentro de um ChatContextProvider"
    );
  }
  return context;
};
