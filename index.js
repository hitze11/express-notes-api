const express = require("express");
const app = express();
const port = process.env.NOTES_APP_PORT || 8080;


app.use(express.json());


let notes = [
  {
    id: 1,
    note: "My first note",
    author: "Max Mustermann",
    date: "2025-01-15",
  },
];


function generateId() {
  return notes.length + 1;
}


app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  res.json(note || {});
});


app.post("/notes", (req, res) => {
  const newNote = { ...req.body, id: generateId() };
  notes.push(newNote);
  res.status(201).json(newNote);
});


app.put("/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body };
    res.json(notes[index]);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});


app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));
  if (index !== -1) {
    notes.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
