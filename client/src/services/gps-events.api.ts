import api from './api';
import { GpsEvent } from '../common/interfaces/gps-event.interface';

export const getOneByCowId = async (cowId: string): Promise<GpsEvent> => {
  const response = await api.get(`gps-events/find-one-by-cow-id/${cowId}`);
  return response.data as GpsEvent;
}

export const getByCowId = async (cowId: string): Promise<GpsEvent[]> => {
  const response = await api.get(`gps-events/by-cow-id/${cowId}`);
  return response.data as GpsEvent[];
}