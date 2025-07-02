<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>📝 Aesthetic Note-Taking App</title>
  <style>
    :root {
      --primary: #4e54c8;
      --secondary: #8f94fb;
      --bg: #f5f7fa;
      --white: #ffffff;
      --gray: #6b7280;
      --radius: 16px;
    }

    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: #333;
      padding: 2rem;
    }

    h1 {
      text-align: center;
      color: var(--primary);
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }

    .note-form {
      max-width: 600px;
      margin: 0 auto;
      background: var(--white);
      padding: 2rem;
      border-radius: var(--radius);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: 0.3s;
    }

    .note-form input,
    .note-form textarea {
      width: 100%;
      padding: 0.85rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 12px;
      font-size: 1rem;
      transition: 0.2s;
    }

    .note-form input:focus,
    .note-form textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(78, 84, 200, 0.15);
    }

    .note-form button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(to right, var(--primary), var(--secondary));
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .note-form button:hover {
      transform: scale(1.03);
    }

    .notes-container {
      margin-top: 2.5rem;
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .note {
      background: white;
      border-radius: var(--radius);
      padding: 1.5rem;
      position: relative;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease;
    }

    .note:hover {
      transform: translateY(-5px);
    }

    .note h3 {
      margin-top: 0;
      color: var(--primary);
    }

    .note p {
      color: var(--gray);
    }

    .note button {
      position: absolute;
      top: 10px;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 5px;
      transition: color 0.2s ease;
    }

    .delete-btn {
      right: 10px;
      color: #f87171;
    }

    .edit-btn {
      right: 45px;
      color: #60a5fa;
    }

    .delete-btn:hover {
      color: #dc2626;
    }

    .edit-btn:hover {
      color: #2563eb;
    }

    @media (max-width: 600px) {
      .note-form {
        padding: 1rem;
      }

      .note-form input,
      .note-form textarea {
        font-size: 0.95rem;
      }

      .note-form button {
        font-size: 0.95rem;
      }
    }
  </style>
</head>
<body>

  <h1>📝 My Notes</h1>

  <div class="note-form">
    <input type="text" id="note-title" placeholder="Enter note title..." />
    <textarea id="note-body" rows="5" placeholder="Write your note..."></textarea>
    <button onclick="saveNote()">💾 Save Note</button>
  </div>

  <div class="notes-container" id="notes-container"></div>

  <script>
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

    // On page load
    renderNotes();
  </script>
</body>
</html>
