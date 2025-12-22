"use client";
import { useChatContext } from "@/app/context/ChatContext";
import { Message } from "@/app/model/Message";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import wallpaper from "@/app/images/wallpaper.png";
import { BsChatLeftText } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";

export default function ChatPage() {
  const router = useRouter();

  const { socket, userName } = useChatContext();
  if (!socket) {
    router.push("/");
    return;
  }

  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessages((msgs) => [...msgs, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleSubmit = () => {
    socket.emit("message", messageRef.current?.value ?? "");
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  const colorsUser = ["#ff8800"];
  return (
    <section className="flex flex-col justify-center items-center min-h-dvh">
      <h1 className=" flex bg-my-primary-dark w-full text-my-primary-lighter text-3xl justify-center font-extrabold italic gap-x-3 fixed top-0">
        Makita Chat <BsChatLeftText />
      </h1>

      <div
        className="flex flex-col items-center justify-between w-full max-w-250 min-h-dvh pb-20 pt-10 px-5"
        style={{
          background: `url(${wallpaper.src}) #00000022`,
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
          backgroundSize: "cover",
          backgroundPositionX: "fixed",
          backgroundPositionY: "fixed",
          backgroundAttachment: "fixed",
        }}
      >
        <ul className="flex flex-col gap-y-3 w-full">
          {messages.map((msg, i) => (
            <li
              key={i}
              className={`flex max-w-7/10 p-2 rounded-sm ${
                msg.userName == userName
                  ? "self-end bg-my-primary-lighter"
                  : "selfstart bg-white"
              }`}
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-my-contrast">{`${
                  msg.userName == userName
                    ? `${msg.userName} (Eu)`
                    : msg.userName
                }`}</h2>
                <p className="flex text-justify text-wrap max-w-full break-all">{msg.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex bg-my-primary-dark  w-full max-w-250 rounded-2xl p-3 gap-x-3 fixed bottom-0">
          <input
            type="text"
            className="border-my-primary-lighter w-full rounded-lg outline-2 text-my-primary-lighter px-3"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
            ref={messageRef}
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="p-2 bg-my-primary-medium rounded-full"
          >
            <BiSolidSend className="text-my-primary-lighter text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
