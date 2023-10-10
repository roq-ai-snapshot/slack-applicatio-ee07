import * as yup from 'yup';

export const attachmentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().nullable(),
  size: yup.number().integer().nullable(),
  message_id: yup.string().nullable().required(),
});
