import { UserSchema } from "@modules/accounts/schemas/User";
import { AppError } from "@exceptions/AppError";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await UserSchema.findOne({ email });
    if (userAlreadyExists) {
      throw new AppError(
        "User already exists",
        "application/user-already-exists"
      );
    }

    const doc = new UserSchema({
      name,
      email,
      password,
    });

    await doc.save();
  }
}
