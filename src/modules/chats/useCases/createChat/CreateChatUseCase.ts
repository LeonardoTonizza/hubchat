import { ChatSchema } from "@modules/chats/schemas/Chat";

export class CreateChatUseCase {
  async execute(participants: string[]): Promise<void> {
    await ChatSchema.create({
      participants,
    });
  }
}
