import React, { useState } from "react";

interface Props {
  onAdd: (content: string) => void;
}

export default function NotesForm({ onAdd }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content.trim());
    setContent("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Новая заметка..."
            aria-label="Текст заметки"
          />
        </div>
        <button type="submit" className="submit-btn">
          Добавить
        </button>
      </form>
    </div>
  );
}
