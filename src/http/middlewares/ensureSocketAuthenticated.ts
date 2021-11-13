import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";

import auth from "@config/auth";

export async function ensureSocketAuthenticated(
  socket: Socket,
  next: (err?: Error) => void
) {
  const token = socket.handshake.auth.token;

  if (!token) {
    next(new Error("application/token-missing"));
    return;
  }

  try {
    verify(token, auth.secret_token);
    next();
  } catch {
    next(new Error("application/invalid-token"));
  }
}
