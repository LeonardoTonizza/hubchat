import auth from "@config/auth";
import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import { BeAbleToListenUseCase } from "./BeAbleToListenUseCase";

interface IPayload {
  sub: string;
}

export class BeAbleToListenController {
  async handle(socket: Socket, chatId: string): Promise<boolean> {
    const token = socket.handshake.auth.token;

    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    const beAbleToListen = new BeAbleToListenUseCase();

    return beAbleToListen.execute({
      chatId,
      userId,
    });
  }
}
