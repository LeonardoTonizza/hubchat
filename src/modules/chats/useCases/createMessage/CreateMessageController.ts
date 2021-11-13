import { Request, Response } from "express";

import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { CreateMessageValidation } from "./CreateMessageValidation";

export class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chatId } = request.params;

    const { message } = await CreateMessageValidation.validate(request.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    const createMessage = new CreateMessageUseCase();

    const messageCreated = await createMessage.execute({
      message,
      chatId,
      senderId: request.user.id,
    });

    response.io.in(chatId).emit("message", messageCreated);

    return response.status(204).json();
  }
}
