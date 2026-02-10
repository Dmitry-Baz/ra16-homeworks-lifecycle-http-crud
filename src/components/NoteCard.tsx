// src/components/NoteCard.tsx
import type { Note } from "../types";

interface Props {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div className="note-card">
      <p className="note-content">{note.content}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(note.id)}
        aria-label="Удалить заметку"
      >
        ×
      </button>
    </div>
  );
}
