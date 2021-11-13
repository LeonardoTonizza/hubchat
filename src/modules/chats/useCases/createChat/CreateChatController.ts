import { Request, Response } from "express";

import { CreateChatUseCase } from "./CreateChatUseCase";
import { CreateChatValidation } from "./CreateChatValidation";

export class CreateChatController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { participants } = await CreateChatValidation.validate(request.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    participants.push(request.user.id);

    const uniqueParticipants: string[] = Array.from(new Set(participants));

    const createChat = new CreateChatUseCase();
    await createChat.execute(uniqueParticipants);

    return response.status(204).json();
  }
}
