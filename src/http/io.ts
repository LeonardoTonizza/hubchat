import { Server } from "socket.io";
import http from "http";
import { BeAbleToListenController } from "@modules/chats/useCases/beAbleToListen/BeAbleToListenController";
import { ensureSocketAuthenticated } from "./middlewares/ensureSocketAuthenticated";

export function createSocket(server: http.Server) {
  const io = new Server(server);

  io.use(ensureSocketAuthenticated);

  io.on("connection", (socket) => {
    socket.on("connectRoom", async (chatId) => {
      const beAbleToListen = new BeAbleToListenController();
      if (await beAbleToListen.handle(socket, chatId)) {
        socket.join(chatId);
      }
    });
  });

  return io;
}
