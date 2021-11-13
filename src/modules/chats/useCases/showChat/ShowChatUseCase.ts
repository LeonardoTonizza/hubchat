import { AppError } from "@exceptions/AppError";
import { ChatSchema } from "@modules/chats/schemas/Chat";

interface IParams {
  chatId: string;
  userId: string;
}

export class ShowChatUseCase {
  async execute({ chatId, userId }: IParams) {
    const chat = await ChatSchema.findById(chatId);

    if (!chat?.participants.includes(userId as any)) {
      throw new AppError("Chat not found", "application/chat-not-found", 404);
    }

    return chat;
  }
}
