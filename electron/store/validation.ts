import { Priority } from '../../types';
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
};
