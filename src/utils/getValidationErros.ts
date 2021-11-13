import { ValidationError } from "yup";

interface IErros {
  [key: string]: string;
}

export function getValidationErros(err: ValidationError): IErros {
  const validationsErros: IErros = {};

  err.inner.forEach((error) => {
    if (error.path) {
      validationsErros[error.path] = error.message;
    }
  });

  return validationsErros;
}
