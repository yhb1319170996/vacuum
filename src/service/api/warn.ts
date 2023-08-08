import { requestFinal } from '@/service/request/init';

export function queryAllWarn() {
  return requestFinal.get<[]>(`/warn/queryAllWarn`);
}

export function deleteAllWarn() {
  return requestFinal.post<string>(`/warn/deleteAllLog`);
}
