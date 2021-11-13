import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { AppError } from "@exceptions/AppError";
import { getValidationErros } from "../../utils/getValidationErros";

export const globalErrors = (
  err: Error,
  _: Request,
  response: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });

    return;
  }

  if (err instanceof Yup.ValidationError) {
    const erros = getValidationErros(err);

    response.status(400).json({
      code: "application/validations-fail",
      message: "Validation fails.",
      erros,
    });

    return;
  }

  console.error({
    name: err.name,
    message: err.message,
  });

  response.status(500).json({
    code: "application/internal-error",
    message: "Internal server error.",
  });
};
