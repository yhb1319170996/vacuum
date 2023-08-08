import { requestFinal } from '@/service/request/init';

export function queryHeatValue() {
  return requestFinal.get<string>(`/param/queryHeat`);
}

export function updateHeatParam(key: string) {
  return requestFinal.post<string>(`/param/heatSave?param=${key}`);
}

export function getSum() {
  return requestFinal.get<number>(`/count/querySumCount`);
}

export function queryHeatCompensation() {
  return requestFinal.get<object>(`/param/queryAllParam`);
}

export function updateTimeInterval(key: string) {
  return requestFinal.post<string>(`/param/updateTimeInterval?number=${key}`);
}

export function queryAllProduct() {
  return requestFinal.get<object>(`/product/queryAllProduct`);
}

export function queryStoveLength() {
  return requestFinal.post<object>(`/param/queryStoveLength`);
}

export function savaAsFile(key: object) {
  return requestFinal.post<object>('/file/savaAsFile', key);
}

export function selectHeat() {
  return requestFinal.get<object>('/file/queryHeatValue');
}

export function selectN2() {
  return requestFinal.get<object>('/file/queryN2Value');
}

export function selectVacuum() {
  return requestFinal.get<object>('/file/queryVacuumValue');
}
export function queryTrackValue() {
  return requestFinal.get<object>('/file/queryTrackValue');
}

export function savaAsTrackFile(key: object) {
  return requestFinal.post<object>('/file/savaAsFileTrack', key);
}

export function savaAsN2File(key: object) {
  return requestFinal.post<object>('/file/savaAsFileN2', key);
}

export function savaAsVacuum(key: object) {
  return requestFinal.post<object>('/file/savaAsVacuum', key);
}

export function queryFileName() {
  return requestFinal.get<object>('/param/queryFileName');
}

export function updateFileName(key: string) {
  return requestFinal.post<object>(`/param/updateFileName?fileName=${key}`);
}

export function saveEditFile() {
  return requestFinal.get<string>(`/file/save`);
}
