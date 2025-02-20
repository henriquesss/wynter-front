import React, { useState, useEffect } from "react";
import "./index.css";
import { Note } from "../../types/Note";

/*
  [X] Get the priority input data
  [x] Implement the disable function to the submit button
  [x] Get a function from parent component to submit the new note (better way)
  [x] Validate the input data before send to parent component function (handleDisabledAdd)
  [x] Fix issue with onSubmit
*/

export interface NoteFormProps {
  onSubmit: (note: Note) => void;
  onEdit: (noteToEdit: Note) => void;
  noteToEdit?: Note | null;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onEdit, noteToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setPriority(noteToEdit.priority || '');
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (noteToEdit) {
      let notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
      const newData = { id: noteToEdit.id, title, content, priority}
      notes = notes.map(note => (note.id === noteToEdit.id ? newData : note));

      localStorage.setItem("notes", JSON.stringify(notes));

      setTitle('');
      setContent('');
      setPriority('low')

      onEdit(noteToEdit);
    } else {
      // Just used math.Random() for the test. In production enviroment, the best option is the id gived by the databases
      const newNote = {
        id: parseInt(Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0')),
        title,
        content,
        priority
      }
        
      setTitle('');
      setContent('');
      setPriority('low')
  
      onSubmit(newNote);
    }

  };
  
  const handleDisableAdd = ():boolean => {
    // Priority was not in the Acceptance criteria, but will help with the filter
    if (title && content && priority) {
      return false;
    }

    return true;
  }

  return (
    <div
      className="layout-column align-items-center justify-content-start"
      data-testid="note-manager"
    >
      <div className="card w-200 pt-30 pb-8 mt-15 mb-15">
        <form
          onSubmit={handleSubmit}
          data-testid="note-form">
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-title-label">Title:</label>
            <input
              placeholder="Title"
              value={title}
              data-testid="form-input"
              className="form-input"
              onChange={(event) => setTitle(event.target.value)}
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-content-label">Content:</label>
            <textarea
              placeholder="Content"
              value={content}
              data-testid="form-textarea"
              className="form-textarea"
              onChange={(event) => setContent(event.target.value)}
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-content-label">Priority:</label>
            <select
              className="form-select"
              data-testid="form-select"
              value={priority}
              onChange={(event) => {
                setPriority(event.target.value);
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <button
              type="submit"
              data-testid="form-submit-button"
              disabled={handleDisableAdd()}
              onSubmit={event => {
                handleSubmit(event)}
              }
            >
              {noteToEdit ? "Update" : "Add"}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
