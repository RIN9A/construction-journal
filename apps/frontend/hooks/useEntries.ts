import { CreateEntryPayload, entriesApi, EntryFilters, workTypesApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ENTRIES_KEY = 'entries';
export const WORK_TYPES_KEY = 'work-types';

export function useEntries(filters: EntryFilters) {
  return useQuery({
    queryKey: [ENTRIES_KEY, filters],
    queryFn: () => entriesApi.getAll(filters),
  });
}

export function useWorkTypes(){
  return useQuery({
    queryKey: [WORK_TYPES_KEY],
    queryFn: workTypesApi.getAll,
    staleTime: Infinity,
  })
}

export function useCreateEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEntryPayload) => 
      entriesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [ENTRIES_KEY]}),
  });
}

export function useUpdateEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: { id:number; data: Partial<CreateEntryPayload>}) => 
      entriesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [ENTRIES_KEY]}),
  });
}

export function useDeleteEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => entriesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: [ENTRIES_KEY]}),
  });
}