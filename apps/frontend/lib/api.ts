import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
});

export interface WorkType {
  id: number;
  name: string;
  unit: string;
}

export interface Entry {
  id: number;
  date: string;
  workTypeId: number;
  workType: WorkType;
  volume: number;
  executorName: string;
  notes?: string;
  createdAt: string;
}

export interface EntryFilters {
  dateFrom?: string;
  dateTo?: string;
  sort?: "asc" | "desc";
}

export interface CreateEntryPayload {
  date: string;
  workTypeId: number;
  volume: number;
  executorName: string;
  notes?: string;
}

export const entriesApi = {
  getAll: (filters?: EntryFilters) => 
    api.get<Entry[]>('/entries', {params: filters}).then(r => r.data),
  create: (data: CreateEntryPayload) => 
    api.post<Entry>('/entries', data).then(r => r.data),
  update: (id: number, data: Partial<CreateEntryPayload>) =>
    api.patch<Entry>(`/entries/${id}`, data).then(r => r.data),
  delete: (id: number) => 
    api.delete(`/entries/${id}`).then(r => r.data),
};

export const workTypesApi = {
  getAll: () => api.get<WorkType[]>('/work-types').then(r => r.data),
};
