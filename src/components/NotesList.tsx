import { useState, useEffect, useCallback } from "react";
import NoteCard from "./NoteCard";
import type { Note } from "../types";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:7070/notes");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:7070/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления");
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Notes</h2>
        <button
          className="refresh-btn"
          onClick={fetchNotes}
          aria-label="Обновить"
        >
          ↻
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="notes-list">
          {notes.length === 0 ? (
            <div
              style={{ textAlign: "center", color: "#999", padding: "40px" }}
            >
              Нет заметок. Добавьте первую.
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
