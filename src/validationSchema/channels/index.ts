import * as yup from 'yup';

export const channelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  team_id: yup.string().nullable().required(),
});
