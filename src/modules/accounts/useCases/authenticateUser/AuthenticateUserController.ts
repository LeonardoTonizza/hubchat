import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserValidation } from "./AuthenticateUserValidation";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = await AuthenticateUserValidation.validate(
      request.body,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}
