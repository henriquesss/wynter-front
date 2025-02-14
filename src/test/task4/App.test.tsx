import React from "react";
import App from "../../App";
import { render, fireEvent, cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

let noteInput: Node | Window,
  noteContent: Node | Window,
  notePriority: Node | Window,
  filterInput: Node | Window,
  filterSelect: Node | Window,
  filterSort: Node | Window,
  filterGetData: Node | Window,
  filterReset: Node | Window,
  addAndUpdateButton: Node | Window,
  notesList: HTMLElement;
const initialNoteCount = 0;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  let { getByTestId } = renderApp();
  noteInput = getByTestId("form-input");
  noteContent = getByTestId("form-textarea");
  notePriority = getByTestId("form-select");
  addAndUpdateButton = getByTestId("form-submit-button");
  notesList = getByTestId("notes-list");
  filterInput = getByTestId("filter-input");
  filterSelect = getByTestId("filter-select");
  filterSort = getByTestId("filter-sort");
  filterGetData = getByTestId("filter-getData");
  filterReset = getByTestId("filter-reset");
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }
});

describe("Filter Notes", () => {
  it("should filter notes based on title or content", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.change(notePriority, { target: { value: "high" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    // add another note
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    fireEvent.change(notePriority, { target: { value: "medium" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    fireEvent.change(filterInput, { target: { value: "Note 1" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    fireEvent.change(filterInput, { target: { value: "Note 2" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 2");

    fireEvent.change(filterInput, { target: { value: "Note" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);

    fireEvent.change(filterInput, { target: { value: "Note 3" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount);

    fireEvent.change(filterInput, { target: { value: "" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);

    fireEvent.change(filterInput, { target: { value: "Note 1 content" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent(
      "Note 1 content"
    );
  });

  it("should filter notes based on priority", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.change(notePriority, { target: { value: "high" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    // add another note
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    fireEvent.change(notePriority, { target: { value: "medium" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    fireEvent.change(filterSelect, { target: { value: "low" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount);
    fireEvent.change(filterSelect, { target: { value: "medium" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
  });

  it("should sort notes based on latest update", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.change(notePriority, { target: { value: "high" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    // add another note
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    fireEvent.change(notePriority, { target: { value: "medium" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    // change button to sort in descending order
    fireEvent.click(filterSort);
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 2");
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 1"
    );

    // change button to sort in ascending order
    fireEvent.click(filterSort);
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );
  });

  it("should reset the filter and show all notes", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.change(notePriority, { target: { value: "high" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    // add another note
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    fireEvent.change(notePriority, { target: { value: "medium" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    fireEvent.change(filterInput, { target: { value: "Note 1" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    fireEvent.click(filterReset);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
  });

  it("combination of filter and sort", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.change(notePriority, { target: { value: "high" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    // add another note
    fireEvent.change(noteInput, { target: { value: "Note 2" } });
    fireEvent.change(noteContent, { target: { value: "Note 2 content" } });
    fireEvent.change(notePriority, { target: { value: "medium" } });

    // Click Add Note Button
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 2);
    expect(notesList.children[initialNoteCount + 1]).toHaveTextContent(
      "Note 2"
    );

    fireEvent.change(filterInput, { target: { value: "Note 1" } });
    fireEvent.change(filterSelect, { target: { value: "high" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    fireEvent.change(filterInput, { target: { value: "Note 2" } });
    fireEvent.change(filterSelect, { target: { value: "medium" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 2");

    fireEvent.change(filterInput, { target: { value: "Note" } });
    fireEvent.change(filterSelect, { target: { value: "all" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);

    fireEvent.change(filterInput, { target: { value: "" } });
    fireEvent.change(filterSelect, { target: { value: "all" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 2);

    fireEvent.change(filterInput, { target: { value: "Note 1" } });
    fireEvent.change(filterSelect, { target: { value: "all" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount + 1);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");

    fireEvent.change(filterInput, { target: { value: "Note 3" } });
    fireEvent.change(filterSelect, { target: { value: "all" } });
    fireEvent.click(filterGetData);
    expect(notesList.children.length).toBe(initialNoteCount);
  });
});
