const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      res.json(notes);
    });
  });

  app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      notes.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
      });
    });
  });
};
