import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserValidation } from "./CreateUserValidation";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = await CreateUserValidation.validate(
      request.body,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json();
  }
}
