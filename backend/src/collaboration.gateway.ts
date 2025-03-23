import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for WebSockets
  export class CollaborationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('code-change')
    handleCodeChange(client: Socket, payload: { room: string; content: string }) {
      // Broadcast the updated content to all clients in the same room
      this.server.to(payload.room).emit('code-update', payload.content);
    }
  }
  