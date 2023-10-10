import * as yup from 'yup';

export const messageValidationSchema = yup.object().shape({
  content: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  channel_id: yup.string().nullable().required(),
});
