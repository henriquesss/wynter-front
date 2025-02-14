import React, { useState, useEffect } from "react";
import { Note } from "../../types/Note";
import NoteForm from "../NoteForm";
import NoteTable from "../NoteTable";

const NoteManager: React.FC = () => {
  useEffect(() => {
    // get all notes from storage
    // put them inside on notes state
    // pass it to NoteTable
    const localNotes:Note[] | null = localStorage.getItem('notes');

    setNotes(localNotes);
  }, [])

  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  // Note: remove id from type Note in this case**
  const storageNote = (data:Note) => {
    /*
      Check data params
      Storage on the localStorage
    */

    /*
     [] get some type array from localstorage
     [] insert the new note in this array
    */
    
   console.log('ARRIVED', data)
  }

  return (
    <div
      className="layout-column align-items-center justify-content-start"
      data-testid="note-manager"
    >
      <NoteForm onSubmit={storageNote} noteToEdit={undefined} />
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
