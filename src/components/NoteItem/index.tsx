import React from "react";
import { Note } from "../../types/Note";
import "./index.css";
import { Modal } from "react-bootstrap";

export interface NoteItemProps {
  id: number;
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  unlockNotes: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  id,
  note,
  onDelete,
  onEdit,
  unlockNotes,
}) => {
  return (
    <tr key={0}>
      <td>Note Title</td>
      <td>Note Content</td>
      <td>
        <button
          className="outlined"
          data-testid={`note-edit-${id}`}
          onClick={() => {}}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="danger"
          data-testid={`note-delete-${id}`}
          onClick={() => {}}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default NoteItem;
