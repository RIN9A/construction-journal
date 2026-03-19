import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "d MMM yyyy", { locale: ru });
}

export function formatVolume(volume: number, unit: string): string {
  return `${Number.isInteger(volume) ? volume : volume.toFixed(2)} ${unit}`;

}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  const [lastName, firstName, patronymic] = parts;
  const initials = firstName ? `${firstName[0]}.` : '';
  const patronymicInitial = patronymic ? `${patronymic[0]}.` : '';
  return `${lastName} ${initials}${patronymicInitial}`.trim();
}