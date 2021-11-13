import * as yup from "yup";

export const CreateChatValidation = yup.object().shape({
  participants: yup.array().ensure().of(yup.string().required()).min(1).required(),
});
