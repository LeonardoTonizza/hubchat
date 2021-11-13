import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@exceptions/AppError";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", "application/token-missing");
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    throw new AppError(
      "Token malformatted.",
      "application/token-malformatted",
      406
    );
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError(
      "Token malformatted.",
      "application/token-malformatted",
      406
    );
  }

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };
  } catch {
    throw new AppError("Invalid token", "application/invalid-token", 401);
  }

  next();
}
