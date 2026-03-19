"use client";

import {
  useCreateEntry,
  useUpdateEntry,
  useWorkTypes,
} from "@/hooks/useEntries";
import type { Entry } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";

const schema = z.object({
  date: z.string().min(1, "Укажите дату"),
  workTypeId: z.coerce.number().min(1, "Выберите вид работ"),
  volume: z.coerce.number().min(0.01, "Объём > 0"),
  lastName: z.string().min(2, "Укажите фамилию"),
  firstName: z.string().min(2, "Укажите имя"),
  patronymic: z.string().optional(),
  notes: z.string().optional(),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

interface EntryFormProps {
  entry?: Entry | null;
  onSuccess: () => void;
}

export function EntryForm({ entry, onSuccess }: EntryFormProps) {
  const { data: workTypes = [] } = useWorkTypes();
  const create = useCreateEntry();
  const update = useUpdateEntry();
  const isPending = create.isPending || update.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: entry
      ? { ...entry, date: entry.date.slice(0, 10), notes: entry.notes ?? "" }
      : { date: new Date().toISOString().slice(0, 10) },
  });
useEffect(() => {
  if (entry) {
    const [lastName = '', firstName = '', patronymic = ''] = 
      entry.executorName.trim().split(/\s+/);
    reset({
      date: entry.date.slice(0, 10),
      workTypeId: entry.workTypeId,
      volume: entry.volume,
      lastName,
      firstName,
      patronymic,
      notes: entry.notes ?? '',
    });
  } else {
    reset({ date: new Date().toISOString().slice(0, 10) });
  }
}, [entry?.id, reset]);

  const onSubmit = async (values: FormValues) => {
    const executorName = [values.lastName, values.firstName, values.patronymic]
      .filter(Boolean)
      .join(" ");

    const payload = {
      date: values.date,
      workTypeId: values.workTypeId,
      volume: values.volume,
      executorName,
      notes: values.notes,
    };
    if (entry) {
      await update.mutateAsync({ id: entry.id, data: payload });
    } else {
      await create.mutateAsync(payload);
    }
    onSuccess();
  };

  const workTypeOptions = workTypes.map((wt) => ({
    value: wt.id,
    label: `${wt.name} (${wt.unit})`,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Input
          label="Дата"
          type="date"
          error={errors.date?.message}
          {...register("date")}
        />
        <Input
          label="Объём"
          type="number"
          step="0.01"
          placeholder="24"
          error={errors.volume?.message}
          {...register("volume")}
        />
      </div>

      <Select
        label="Вид работ"
        placeholder="— Выберите —"
        options={workTypeOptions}
        error={errors.workTypeId?.message}
        {...register("workTypeId")}
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        <Input
          label="Фамилия"
          placeholder="Иванов"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <Input
          label="Имя"
          placeholder="Иван"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Отчество"
          placeholder="Иванович"
          error={errors.patronymic?.message}
          {...register("patronymic")}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-2)",
          }}
        >
          Примечания{" "}
          <span
            style={{
              color: "var(--text-3)",
              fontWeight: 400,
              textTransform: "none",
            }}
          >
            (необязательно)
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="Дополнительная информация..."
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            borderRadius: "var(--r-md)",
            padding: "9px 12px",
            fontSize: 14,
            outline: "none",
            resize: "vertical",
            width: "100%",
          }}
          {...register("notes")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isPending}
        className="w-full"
      >
        {entry ? "Сохранить изменения" : "Создать запись"}
      </Button>

      {(create.isError || update.isError) && (
        <p
          style={{ fontSize: 13, color: "var(--danger)", textAlign: "center" }}
        >
          Ошибка сохранения. Проверьте соединение с сервером.
        </p>
      )}
    </form>
  );
}
