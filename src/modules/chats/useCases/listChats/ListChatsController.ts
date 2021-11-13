import { Request, Response } from "express";

import { ListChatsUseCase } from "./ListChatsUseCase";

export class ListChatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listChats = new ListChatsUseCase();

    const chats = await listChats.execute(id);

    return response.json(chats);
  }
}
