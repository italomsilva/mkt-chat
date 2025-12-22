import * as React from "react";
import { Message } from "../model/Message";
import { useChatContext } from "../context/ChatContext";

export interface IMessageBubbleProps {
  message: Message;
  index: number;
}

export default function MessageBubble(props: IMessageBubbleProps) {
  const { userName } = useChatContext();
  return props.message.isServerMessage ? (
    <li className="flex self-center bg-my-primary-light rounded-sm p-2">
      <p>{props.message.text}</p>
    </li>
  ) : (
    <li
      key={props.index}
      className={`flex max-w-7/10 p-2 rounded-sm ${
        props.message.userName == userName
          ? "self-end bg-my-primary-lighter"
          : "selfstart bg-white"
      }`}
    >
      <div className="flex flex-col">
        <h2 className="font-bold text-my-contrast">{`${
          props.message.userName == userName
            ? `${props.message.userName} (Eu)`
            : props.message.userName
        }`}</h2>
        <p className="flex text-justify text-wrap max-w-full break-all">
          {props.message.text}
        </p>
      </div>
    </li>
  );
}
