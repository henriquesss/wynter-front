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
  const note: Note = {
    id: 1,
    title: "Some Title",
    content: "Some Content",
  };
  const [filterParams, setFilterParams] = useState<{
    search: string;
    sortBy: "asc" | "desc";
    priority?: "low" | "medium" | "high";
  }>({ search: "", sortBy: "asc" });

  return (
    <div className="card w-90 pt-35 pb-8 mt-2">
      <NoteFilter setFilterParams={setFilterParams} />
      <table>
        <thead>
          <tr>
            <th colSpan={4}>Notes</th>
          </tr>
        </thead>
        <tbody data-testid="notes-list">
          <NoteItem
            note={note}
            id={0} // for passing loop index for testids
            onDelete={() => {}}
            onEdit={() => {}}
            unlockNotes={unlockNotes}
          />
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
