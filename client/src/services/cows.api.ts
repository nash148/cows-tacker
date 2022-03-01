import api from './api';
import { Cow } from '../common/interfaces/cows.interface';

export const getAll = async (): Promise<Cow[]> => {
  const response = await api.get('cows/');
  return response.data as Cow[];
}