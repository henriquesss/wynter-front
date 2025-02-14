## React Typescript: Note Manager

Complete the components as shown to pass the test cases. Certain core React functionalities are already implemented.

![](https://hrcdn.net/s3_pub/istreet-assets/mU5oMhWPTmUklQD8eQRvkQ/note-manager.gif)

The application has four functional components: _NoteManager.tsx_, _NoteForm.tsx_, _NoteItem.tsx_, and _NoteTable.tsx_, where all the functionalities will be implemented.

The component must have the following functionalities:

- The type of input for the _Note Title_ should be _text_.
- The initial view should have no notes in the list.
- Clicking the _Add Note_ button should:
  - add a note in the notes list with the _Note Title_, _Note Content_, an _Edit_ button, and a _Delete_ button respectively.
  - do not add a note to the list if the input fields for either _Note Title_ or _Note Content_ are empty then keep the _Add Note_ button disabled.
  - reset the input fields for the _Note Title_ and _Note Content_ to empty after adding a valid note to the list.
- Clicking the _Delete_ button should delete the corresponding note from the list.
- Clicking the _Edit_ button should:
  - populate the input fields with the selected note's title and content.
  - change the text of the _Add Note_ button to _Update_.
  - should maintain the order of notes and update the note with new values after editing

The following types needs to be updated:

| **Type**         | **Properties**                                                              |
|------------------|-----------------------------------------------------------------------------|
| NoteFormProps    | onSubmit: (note: Note) => void, noteToEdit(optional): Note                  |
| NoteTableProps   | notes: Note[], onDelete: (id: number) => void, onEdit: (note: Note) => void |
| NoteItemProps    | note: Note, onDelete: (id: number) => void, onEdit: (note: Note) => void    |
| Note             | id: number, title: string, content: string;                                 |

The following data-testid attributes are required in the components for the tests to pass:

| **Attribute**          | **Component**                   |
|------------------------|---------------------------------|
| form-input             | Input box for note title        |
| form-textarea          | Textarea for note content       |
| form-submit-button     | Button for adding/updating note |
| notes-list             | List of notes                   |

Note:

- Components have data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
- The file that should be modified by the candidate is `src/NoteManager.tsx` and the other three components in their respective files.
- Avoid making changes to other files in the project structure.


## Environment

- React Version: 18.2.0
- Node Version: 14(LTS)
- Default Port: 8000


**Read Only Files**
- `src/App.test.tsx`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

