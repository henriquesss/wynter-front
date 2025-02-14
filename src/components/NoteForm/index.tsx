import React, { useState, useEffect } from "react";
import "./index.css";
import { Note } from "../../types/Note";

/*
  [X] Get the priority input data
  [x] Implement the disable function to the submit button
  [x] Get a function from parent component to submit the new note (better way)
  [] Validate the input data before send to parent component function
    [] Issue with onSubmit 
     - button option
     - form option
*/

export interface NoteFormProps {
  onSubmit: (note: Note) => void;
  noteToEdit?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, noteToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('1 ==> handleSubmit')

    const newNote = { id: Math.random(), title, content, priority}
    console.log('2 ==>', newNote)

    onSubmit(newNote);
  };

  const handleDisableAdd = ():boolean => {
    if (title && content) {
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
          {/* <section className="mt-20 mr-20 ml-20">
            <input
              type="checkbox"
              data-testid="form-password-checkbox"
              className="mr-10"
              checked={showPassword}
              onChange={() => {}}
            />{" "}
            Enable Password
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                data-testid="form-password-input"
                className="form-input password-input"
                onChange={() => {}}
              />
            )}
          </section> */}
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <button
              type="submit"
              data-testid="form-submit-button"
              disabled={handleDisableAdd()}
              //onSubmit={event => handleSubmit(event)}
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
