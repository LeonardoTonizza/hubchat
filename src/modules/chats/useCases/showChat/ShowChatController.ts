import { Request, Response } from "express";

import { ShowChatUseCase } from "./ShowChatUseCase";

export class ShowChatController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chatId } = request.params;

    const showChat = new ShowChatUseCase();

    const chat = await showChat.execute({
      chatId,
      userId: request.user.id,
    });

    return response.json(chat);
  }
}
