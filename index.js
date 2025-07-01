const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const notesList = document.getElementById('notes-list');

let notes = JSON.parse(localStorage.getItem('notes') || '[]');

function displayNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteDiv);
  });
}

function saveNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title && !content) return;

  notes.push({ title, content });
  localStorage.setItem('notes', JSON.stringify(notes));
  titleInput.value = '';
  contentInput.value = '';
  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}


displayNotes();
