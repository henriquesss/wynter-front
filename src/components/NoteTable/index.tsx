import React, { useState } from "react";
import { Note } from "../../types/Note";
import NoteItem from "../NoteItem";
import NoteFilter from "../NoteFilter";

interface NoteTableProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  unlockNotes: (id: number) => void;
}

const NoteTable: React.FC<NoteTableProps> = ({
  notes,
  onDelete,
  onEdit,
  unlockNotes,
}) => {
  const [filterParams, setFilterParams] = useState<{
    search: string;
    sortBy: "asc" | "desc";
    priority?: "low" | "medium" | "high";
  }>({ search: "", sortBy: "asc" });

  return (
    <div className="card w-90 pt-35 pb-8 mt-2">
      <NoteFilter
        setFilterParams={setFilterParams}
      />
      <table>
        <thead>
          <tr>
            <th colSpan={4}>Notes</th>
          </tr>
        </thead>
        <tbody data-testid="notes-list">
          {notes.map((note, index) => (
            <NoteItem
              note={note}
              id={index} // for passing loop index for testids
              onDelete={() => {}}
              onEdit={note => onEdit(note)}
              unlockNotes={unlockNotes}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
