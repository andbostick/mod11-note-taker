const express = require("express");
const PORT = 3001;
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const app = express();

function createNewNote(note, arr) {
    let count = 0;
    const newNote = note;
    if (!Array.isArray(arr))
        arr = [];
    
    if (arr.length === 0)
        arr.push(0);

    note.id = count;
    count++;

    arr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(arr, null, 2)
    );
    return newNote;
}


app.use(express.json());
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});