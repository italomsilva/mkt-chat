import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.server.emit('receive_message', {
      text: `Usuario ${client.data.userName} Saiu`,
      userId: client.id,
      userName: client.data.userName,
      isServerMessage: true      
    });
  }
  @WebSocketServer()
  server: Server;
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Usuario conectado', client.id);
    this.server.emit('receive_message', {
      text: 'Usuario Entrou',
      userId: client.id,
      userName: client.data.userName,
      isServerMessage: true
    });
    return 'Usuario conectado';
  }

  @SubscribeMessage('set_username')
  setUserName(
    @ConnectedSocket() client: Socket,
    @MessageBody() userName: string,
  ) {
    client.data.userName = userName;
  }

  @SubscribeMessage('message')
  addMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ) {
    this.server.emit('receive_message', {
      text: message,
      userId: client.id,
      userName: client.data.userName,
      isServerMessage: false
    });
  }
}
