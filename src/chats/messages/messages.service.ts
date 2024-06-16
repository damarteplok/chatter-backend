import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Types } from 'mongoose';
import { Message } from './entities/message.entity';
import { GetMessagesArgs } from './dto/get-messages.args';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      userId,
      createdAt: new Date(),
      _id: new Types.ObjectId(),
    };
    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
        ...this.userChatFilter(userId),
      },
      {
        $push: {
          messages: message,
        },
      },
    );
    return message;
  }

  private userChatFilter(userId: string) {
    return {
      $or: [
        { userId },
        {
          userIds: {
            $in: [userId],
          },
        },
      ],
    };
  }

  async getMessages({ chatId }: GetMessagesArgs, userId: string) {
    const res = await this.chatsRepository.findOne({
        _id: chatId,
        ...this.userChatFilter(userId),
      });

    if (res?.messages) {
        return res.messages;
    }
    return [];
  }
}
