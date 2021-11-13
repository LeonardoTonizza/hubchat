import { Request, Response } from "express";

import { ListMessageUseCase } from "./ListMessageUseCase";

export class ListMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chatId } = request.params;

    const sendMessage = new ListMessageUseCase();

    const messages = await sendMessage.execute({
      chatId,
      userId: request.user.id,
    });

    return response.json(messages);
  }
}
