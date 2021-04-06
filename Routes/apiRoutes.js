const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let noteData = [];

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      let noteJSON = JSON.parse(data);
      for (const note in noteJSON) {
        noteData.push(noteJSON[note]);
        noteJSON[note].id = uuidv4();
      }
      console.log(noteData);
      res.json(noteData);
    });
  });

  app.post("/api/notes", (req, res) => {});
};
