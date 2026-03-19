import { useDeleteEntry } from "@/hooks/useEntries";
import { Entry } from "@/lib/api";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";

interface DeleteConfirmProps {
  entry: Entry;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DeleteConfirm({
  entry,
  onSuccess,
  onCancel,
}: DeleteConfirmProps) {
  const { mutateAsync, isPending } = useDeleteEntry();
  const handleConfirm = async () => {
    await mutateAsync(entry.id);
    onSuccess();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "var(--danger-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertTriangle size={22} color="car(--danger)" />
      </div>

      <div>
        <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>
          Удалить запись?
        </p>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>
            {entry.workType.name}
          </strong>
          {" - "}
          {entry.executorName}.<br />
          Это действие нельзя отменить.
        </p>
      </div>
      <div style={{ display: "flex", gap: 10, width: "100%" }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onCancel}
          className="flex-1"
        >
          Отмена
        </Button>
        <Button
          variant="danger"
          size="lg"
          loading={isPending}
          onClick={handleConfirm}
          className="flex-1"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
