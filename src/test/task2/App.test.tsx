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
  deleteNoteButton: Node | Window,
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

describe("Delete Note", () => {
  it("delete button should delete the corresponding note", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    deleteNoteButton = getByTestId(document.body, "note-delete-0");
    expect(deleteNoteButton).toHaveTextContent("Delete");
    // Click Delete Button for Note 1
    fireEvent.click(deleteNoteButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 2");
  });
});
