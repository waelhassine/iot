import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  @WebSocketGateway({ cors: {
    origin: '*',
  }, transports: ['websocket'] })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;;
    users: number = 0;
    async handleConnection() {
      // A client has connected
      this.users++;
      // Notify connected clients of current users
      this.server.emit('users', this.users);
      console.log("client connected =>");
      console.log(this.users);
    }
    async handleDisconnect() {
      // A client has disconnected
      this.users--;
      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }
    @SubscribeMessage('chat')
    async onChat(client, message) {
      console.log("messagde =>",message);
      client.broadcast.emit('jouu', message);
    }
  }