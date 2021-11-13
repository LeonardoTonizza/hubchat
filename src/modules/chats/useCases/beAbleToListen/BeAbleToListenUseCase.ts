import { ChatSchema } from "@modules/chats/schemas/Chat";

interface IParams {
  chatId: string;
  userId: string;
}

export class BeAbleToListenUseCase {
  async execute({ chatId, userId }: IParams) {
    const chat = await ChatSchema.findById(chatId);

    return !!chat?.participants.includes(userId as any);
  }
}
