import React from "react";
import App from "../../App";
import {
  render,
  fireEvent,
  cleanup,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

let noteInput: Node | Window,
  noteContent: Node | Window,
  addAndUpdateButton: Node | Window,
  notesList: HTMLElement,
  noteCheckBox: Node | Window,
  notePasswordInput: Node | Window,
  openUnlockModal: Node | Window,
  modalPasswordInput: Node | Window,
  modalUnlockButton: Node | Window,
  modalPasswordError: Node | Window;

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
  noteCheckBox = getByTestId("form-password-checkbox");
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }
});

describe("Password Protected Notes", () => {
  it("should show password input field when password checkbox is checked and add button should be disabled", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.click(noteCheckBox);
    notePasswordInput = getByTestId(document.body, "form-password-input");
    expect(notePasswordInput).toBeInTheDocument();
    expect(notePasswordInput).toHaveAttribute("type", "password");
    expect(addAndUpdateButton).toBeDisabled();
  });

  it("should not show password input field when password checkbox is unchecked", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.click(noteCheckBox);
    notePasswordInput = getByTestId(document.body, "form-password-input");
    expect(notePasswordInput).toBeInTheDocument();
    fireEvent.click(noteCheckBox);
    const passwordInputNotRendered = queryByTestId(
      document.body,
      "form-password-input"
    );
    expect(passwordInputNotRendered).not.toBeInTheDocument();
    expect(addAndUpdateButton).not.toBeDisabled();
  });

  it("should show password input field in modal when password protected note is clicked & modal unlock button should be disabled", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.click(noteCheckBox);
    notePasswordInput = getByTestId(document.body, "form-password-input");
    fireEvent.change(notePasswordInput, { target: { value: "password" } });
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);

    //open unlock modal
    openUnlockModal = getByTestId(document.body, "open-unlock-modal-0");
    fireEvent.click(openUnlockModal);
    modalPasswordInput = getByTestId(document.body, "modal-password");
    modalUnlockButton = getByTestId(document.body, "modal-unlock-button");
    expect(modalPasswordInput).toBeInTheDocument();
    expect(modalUnlockButton).toBeDisabled();
  });

  it("should show error message when wrong password is entered", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.click(noteCheckBox);
    notePasswordInput = getByTestId(document.body, "form-password-input");
    fireEvent.change(notePasswordInput, { target: { value: "password" } });
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);

    //open unlock modal
    openUnlockModal = getByTestId(document.body, "open-unlock-modal-0");
    fireEvent.click(openUnlockModal);
    modalPasswordInput = getByTestId(document.body, "modal-password");
    modalUnlockButton = getByTestId(document.body, "modal-unlock-button");
    fireEvent.change(modalPasswordInput, { target: { value: "test" } });
    fireEvent.click(modalUnlockButton);
    modalPasswordError = getByTestId(document.body, "modal-password-err");
    expect(modalPasswordError).toHaveTextContent("Incorrect Password");
  });

  it("should unlock the note when correct password is entered", () => {
    fireEvent.change(noteInput, { target: { value: "Note 1" } });
    fireEvent.change(noteContent, { target: { value: "Note 1 content" } });
    fireEvent.click(noteCheckBox);
    notePasswordInput = getByTestId(document.body, "form-password-input");
    fireEvent.change(notePasswordInput, { target: { value: "password" } });
    fireEvent.click(addAndUpdateButton);
    expect(notesList.children.length).toBe(initialNoteCount + 1);

    //open unlock modal
    openUnlockModal = getByTestId(document.body, "open-unlock-modal-0");
    fireEvent.click(openUnlockModal);
    modalPasswordInput = getByTestId(document.body, "modal-password");
    modalUnlockButton = getByTestId(document.body, "modal-unlock-button");
    fireEvent.change(modalPasswordInput, { target: { value: "password" } });
    fireEvent.click(modalUnlockButton);
    expect(notesList.children[initialNoteCount]).toHaveTextContent("Note 1");
  });
});
