import React from "react";
import App from "../../App";
import {
  render,
  fireEvent,
  cleanup,
  getByTestId,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

let noteInput: Node | Window,
  noteContent: Node | Window,
  addAndUpdateButton: Node | Window,
  editNoteButton: Node | Window,
  notesList: HTMLElement;
const initialNoteCount = 0;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  let { getByTestId } = renderApp();
  noteInput = getByTestId("form-input");
  noteContent = getByTestId("form-textarea");
  addAndUpdateButton = getByTestId("form-submit-button");
  notesList = getByTestId("notes-list");
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }
});

describe("Edit Note", () => {
  it("edit button should show the corresponding note in the input fields", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    editNoteButton = getByTestId(document.body, "note-edit-0");
    expect(editNoteButton).toHaveTextContent("Edit");
    // Click Edit Button for Note 1
    fireEvent.click(editNoteButton);
    expect(noteInput).toHaveValue("Note 1");
    expect(noteContent).toHaveValue("Note 1 content");
  });

  it("should update the note with new values after editing", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    editNoteButton = getByTestId(document.body, "note-edit-0");
    expect(editNoteButton).toHaveTextContent("Edit");
    // Click Edit Button for Note 1
    fireEvent.click(editNoteButton);

    fireEvent.change(noteInput, { target: { value: "Updated Note 1" } });
    fireEvent.change(noteContent, {
      target: { value: "Updated Note 1 content" },
    });
    // Click Save Changes Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent(
      "Updated Note 1"
    );
  });

  it("should maintain the order of notes and update the note with new values after editing", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);

    editNoteButton = getByTestId(document.body, "note-edit-0");
    expect(editNoteButton).toHaveTextContent("Edit");
    // Click Edit Button for Note 1
    fireEvent.click(editNoteButton);

    fireEvent.change(noteInput, { target: { value: "Updated Note 1" } });
    fireEvent.change(noteContent, {
      target: { value: "Updated Note 1 content" },
    });
    // Click Save Changes Button
    fireEvent.click(addAndUpdateButton);

    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount]).toHaveTextContent(
      "Updated Note 1"
    );
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );
  });
});
