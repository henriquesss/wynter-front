import React from 'react';
import './App.css';
import 'h8k-components';
import NoteManager from './components/NoteManager';

const title = "Note Manager";

function App() {
  return (
    <div className="App">
      <h8k-navbar header={title} data-testid="navbar"></h8k-navbar>
      <NoteManager />
    </div>
  );
}

export default App;
