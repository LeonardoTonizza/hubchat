import * as yup from "yup";

export const CreateMessageValidation = yup.object().shape({
  message: yup.string().required(),
});
