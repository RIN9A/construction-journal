import { Entry, WorkType } from "./api";

const BASE = process.env.API_URL ?? 'http://localhost:3001/api';

export async function getEntriesServer(): Promise<Entry[]> {
  const res = await fetch(`${BASE}/entries?sort=desc`, {cache: 'no-store'});
  if(!res.ok) return [];
  return res.json();
  
}

export async function getWorkTypesServer(): Promise<WorkType[]> {
  const res = await fetch(`${BASE}/work-types`, {
    next: {revalidate: 3600},
  });
  if(!res.ok) return [];
  return res.json();
}
  