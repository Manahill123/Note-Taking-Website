const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DATA_FILE = './notes.json';

app.use(cors());
app.use(bodyParser.json());

// Read notes from file
function readNotes() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Write notes to file
function writeNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

// GET all notes
app.get('/notes', (req, res) => {
  res.json(readNotes());
});

// POST a new note
app.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    body: req.body.body,
    timestamp: new Date().toLocaleString(),
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// PUT to update a note
app.put('/notes/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.map(note =>
    note.id === req.params.id
      ? { ...note, title: req.body.title, body: req.body.body, timestamp: new Date().toLocaleString() }
      : note
  );
  writeNotes(notes);
  res.json({ message: 'Note updated' });
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter(note => note.id !== req.params.id);
  writeNotes(notes);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
