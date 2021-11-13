import { Router } from "express";

import { CreateMessageController } from "@modules/chats/useCases/createMessage/CreateMessageController";
import { CreateChatController } from "@modules/chats/useCases/createChat/CreateChatController";
import { ListMessagesController } from "@modules/chats/useCases/listMessages/ListMessagesController";
import { ensureAuthenticated } from "http/middlewares/ensureAuthenticated";
import { ShowChatController } from "@modules/chats/useCases/showChat/ShowChatController";
import { ListChatsController } from "@modules/chats/useCases/listChats/ListChatsController";

const chatsRoutes = Router();

const createMessageController = new CreateMessageController();
const createChatController = new CreateChatController();
const listMessagesController = new ListMessagesController();
const showChatController = new ShowChatController();
const listChatsController = new ListChatsController();

chatsRoutes.use(ensureAuthenticated);

chatsRoutes.post("/", createChatController.handle);
chatsRoutes.get("/", listChatsController.handle);
chatsRoutes.get("/:chatId", showChatController.handle);

chatsRoutes.get("/:chatId/messages", listMessagesController.handle);
chatsRoutes.post("/:chatId/messages", createMessageController.handle);

export { chatsRoutes };
