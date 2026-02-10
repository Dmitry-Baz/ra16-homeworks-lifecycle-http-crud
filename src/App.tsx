import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";

export default function App() {
  return (
    <div className="container">
      <NotesForm
        onAdd={async (content) => {
          try {
            const res = await fetch("http://localhost:7070/notes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: 0, content }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            // Обновляем список через window-хак или перезапуск
            // Но проще: добавим refetch через window (временно)
            (window as any).refreshNotes?.();
          } catch (err) {
            console.error("Ошибка добавления:", err);
          }
        }}
      />
      <NotesList />
    </div>
  );
}
