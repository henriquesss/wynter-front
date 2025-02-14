import React, { useState } from "react";
import { Note } from "../../types/Note";
import NoteForm from "../NoteForm";
import NoteTable from "../NoteTable";

const NoteManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  return (
    <div
      className="layout-column align-items-center justify-content-start"
      data-testid="note-manager"
    >
      <NoteForm onSubmit={() => {}} noteToEdit={undefined} />
      <NoteTable
        notes={notes}
        onDelete={() => {}}
        onEdit={() => {}}
        unlockNotes={() => {}}
      />
    </div>
  );
};

export default NoteManager;
