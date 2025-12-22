import { io, Socket } from "socket.io-client";

export class ChatService {
  public static connectUser(userName: string): Socket {
    const socket = io("http://localhost:3060");
    socket.emit("set_username", userName);
    return socket;
  }

  public static sendMessage(socket: Socket, message: string) {
    socket.emit("message", message);
  }
}
