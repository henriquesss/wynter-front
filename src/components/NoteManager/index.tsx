import React, { useState, useEffect } from "react";
import { Note } from "../../types/Note";
import NoteForm from "../NoteForm";
import NoteTable from "../NoteTable";

const NoteManager: React.FC = () => {
  useEffect(() => {
    listAll();
  }, []);

  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  function listAll() {
    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]");

    setNotes(allNotes);
  }

  const storageNote = (newNote:Note) => {
    const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));

    listAll();
  }

  const editNote = (noteToEdit:Note) => {
    setNoteToEdit(noteToEdit);
    
    listAll();
  }

  return (
    <div
      className="layout-column align-items-center justify-content-start"
      data-testid="note-manager"
    >
      <NoteForm onSubmit={storageNote} noteToEdit={noteToEdit} onEdit={editNote} />
      <NoteTable
        notes={notes}
        onDelete={() => {}}
        onEdit={editNote}
        unlockNotes={() => {}}
      />
    </div>
  );
};

export default NoteManager;
