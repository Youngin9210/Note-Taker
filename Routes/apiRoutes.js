const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let noteData = [];

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  // app.get("/api/notes/:id", (req, res) => {
  //   fs.readFile("db/db.json", (err, data) => {
  //     let notes = JSON.parse(data);
  //     let selectedNote = req.params.id;
  //     console.log(selectedNote);
  //   });
  // });

  app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      console.log(newNote);
      notes.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.json(notes);
      });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      let notes = JSON.parse(data);
      let selectedNote = req.params.id;
      console.log(selectedNote);
    });
  });
};
