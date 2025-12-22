"use client";

import { useChatContext } from "@/app/context/ChatContext";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatService } from "@/app/services/ChatService";

export default function JoinPage() {
  const router = useRouter();
  const { setUserName, setSocket } = useChatContext();
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const userName = userNameRef.current?.value ?? "";
    if (!userName.trim()) {
      alert("Username is required");
      return;
    }
    const socket = ChatService.connectUser(userName);
    setSocket(socket);

    setUserName(userName);
    
    router.push("/chat");
  };
  return (
    <div className="flex flex-col w-full justify-center items-center min-h-dvh gap-5">
      <h1 className="text-5xl font-bold">Join on MKT Chat</h1>
      <div className="flex flex-col items-center bg-my-primary-dark p-10 rounded-3xl gap-y-5">
        <div className="flex items-center gap-x-5 w-full">
          <label
            htmlFor="iusername"
            className="text-my-primary-lighter font-bold text-2xl"
          >
            UserName:
          </label>
          <input
            id="iusername"
            name="username"
            type="text"
            placeholder="Ed Ganola"
            ref={userNameRef}
            className="border-2 border-my-primary-light bg-transparent p-2 rounded-md outline-none text-my-primary-lighter"
          />
        </div>
        <input
          className="bg-my-primary-lighter w-full py-2 font-bold rounded-md text-2xl border-2 border-my-primary-lighter hover:bg-my-primary-light-hover hover:text-my-primary-lighter transition-all transition-discrete"
          type="button"
          value="Join"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
}
