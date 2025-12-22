import ChatPage from "@/app/pages/chat/ChatPage";
import * as React from "react";

export interface IPageProps {}

export default function Page(props: IPageProps) {
  return (
    <main>
      <ChatPage />
    </main>
  );
}
