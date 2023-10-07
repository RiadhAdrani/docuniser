import { CardType, Language, Preference, Priority, Theme } from '../../types';
import yup from 'yup';

export const validation = {
  createDocument: yup.object({
    title: yup.string().required(),
    priority: yup.string().oneOf(Object.values(Priority)).required(),
    parent: yup.string().optional(),
  }),
  updateDocument: yup.object({
    id: yup.string().required(),
    title: yup.string().optional(),
    priority: yup.string().oneOf(Object.values(Priority)).optional(),
    shortDescription: yup.string().max(1000).optional(),
  }),
  updatePreference: yup.object({
    cardType: yup
      .string()
      .oneOf(['compact', 'list', 'normal'] as Array<CardType>)
      .optional(),
    lang: yup
      .string()
      .oneOf(['en', 'fr'] as Array<Language>)
      .optional(),
    theme: yup
      .string()
      .oneOf(['light', 'dark'] as Array<Theme>)
      .optional(),
  }),
};
