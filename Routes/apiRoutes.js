const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let noteData = [];

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      noteData = JSON.parse(data);
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      console.log(noteData);
      noteData.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(noteData, null, 2), (err) => {
        if (err) throw err;
        res.json(noteData);
      });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      noteData = JSON.parse(data);
      let selectedNoteID = req.params.id;
      console.log(selectedNoteID);
      for (const n in noteData) {
        if (noteData[n].id === selectedNoteID) {
          let i = noteData.indexOf(noteData[n]);
          if (i > -1) {
            console.log(noteData[n].id);
            noteData.splice(i, 1);
          }
        }
      }
      fs.writeFile("db/db.json", JSON.stringify(noteData, null, 2), (err) => {
        if (err) throw err;
        res.json(noteData);
      });
    });
  });
};
