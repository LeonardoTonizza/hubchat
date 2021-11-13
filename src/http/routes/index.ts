import { Router } from "express";

import { sessionsRoutes } from "./sessions.routes";
import { chatsRoutes } from "./chats.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/chats", chatsRoutes);
router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);

export { router };
