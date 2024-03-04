import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { ID } from '../../infrastructure/global';
import { UsersService } from '../users/users.service';
import { SupportService } from './support.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupportGateway {
  constructor(
    private supportService: SupportService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat(
    @ConnectedSocket() client: Socket,
    @MessageBody('payload') payload: { chatId: ID },
  ) {
    return this.supportService.subscribe(async (supportRequest, message) => {
      if (supportRequest._id === payload.chatId) {
        const { _id, sentAt, text, readAt, authorId } = message;
        const { _id: userId, name } =
          await this.usersService.findById(authorId);
        const response = {
          _id,
          sentAt,
          text,
          readAt,
          author: {
            id: userId,
            name: name,
          },
        };
        client.emit('subscribeToChat', response);
      }
    });
  }
}
