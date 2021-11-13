import { AppError } from "@exceptions/AppError";
import { ChatSchema } from "@modules/chats/schemas/Chat";
import { ChatMessageSchema } from "@modules/chats/schemas/ChatMessage";

interface IParams {
  chatId: string;
  userId: string;
}

export class ListMessageUseCase {
  async execute({ chatId, userId }: IParams) {
    const chat = await ChatSchema.findById(chatId);

    if (!chat?.participants.includes(userId as any)) {
      throw new AppError("Chat not found", "application/chat-not-found", 404);
    }

    const messages = await ChatMessageSchema.find({
      chat: chatId,
    } as any).sort({
      createdAt: "asc",
    });
    return messages;
  }
}
