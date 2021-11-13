import { ChatMessageSchema } from "@modules/chats/schemas/ChatMessage";

interface IParams {
  message: string;
  senderId: string;
  chatId: string;
}

export class CreateMessageUseCase {
  async execute({ message, senderId, chatId }: IParams) {
    const messageCreated = await ChatMessageSchema.create({
      message,
      sender: senderId,
      chat: chatId,
    });

    return messageCreated;
  }
}
