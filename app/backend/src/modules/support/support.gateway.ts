import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
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

  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat(
    @MessageBody() payload: { chatId: ID },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('handleSubscribeToChat DEBUG');
    console.log(payload);

    return this.supportService.subscribe(async (supportRequest, message) => {
      console.log('this.supportService.subscribe DEBUG');
      console.log(supportRequest._id.toString());
      console.log('payload.chatId DEBUG');
      console.log(payload.chatId);

      if (supportRequest._id.toString() === payload.chatId) {
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
