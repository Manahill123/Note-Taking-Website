let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

function renderNotes() {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const title = document.createElement("h3");
    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteNote(index);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => editNote(index);

    noteDiv.appendChild(title);
    noteDiv.appendChild(body);
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(editBtn);

    container.appendChild(noteDiv);
  });
}

function saveNote() {
  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();
  if (!title || !body) return alert("Please fill out both fields.");

  if (editIndex !== null) {
    notes[editIndex] = { title, body };
    editIndex = null;
  } else {
    notes.push({ title, body });
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
  renderNotes();
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
}

function editNote(index) {
  const note = notes[index];
  document.getElementById("note-title").value = note.title;
  document.getElementById("note-body").value = note.body;
  editIndex = index;
}

// Load on startup
renderNotes();
