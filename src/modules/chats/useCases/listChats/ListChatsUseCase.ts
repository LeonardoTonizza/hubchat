import { ChatSchema } from "@modules/chats/schemas/Chat";

export class ListChatsUseCase {
  async execute(userId: string) {
    const chats = await ChatSchema.find({
      participants: userId,
    } as any);

    return chats;
  }
}
