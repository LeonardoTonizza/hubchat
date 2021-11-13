import { UserSchema } from "@modules/accounts/schemas/User";
import { AppError } from "@exceptions/AppError";

interface IParams {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IParams): Promise<IResponse> {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw new AppError(
        "Email or password incorrect!",
        "application/auth/invalid-credential",
        401
      );
    }

    const passwordMatch = await user.compareHash(password);

    if (!passwordMatch) {
      throw new AppError(
        "Email or password incorrect!",
        "application/auth/invalid-credential",
        401
      );
    }

    const token = UserSchema.generateToken(user.id);

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
