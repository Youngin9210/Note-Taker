// requiring node file system module
const fs = require("fs");
// requiring path module to edit/read files
const path = require("path");
// requiring npm package to add a uniquely generated id form json objects
const { v4: uuidv4 } = require("uuid");

// setting an empty array to push json datan into
let noteData = [];

// exporting a function passing through an argument to use express routes in server.js
module.exports = (app) => {
  // GET request to /api/notes
  app.get("/api/notes", (req, res) => {
    // sending db.json to the path /api/notes to display notes, if any exist, using the node path module method path.join()
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  // POST request to /api/notes
  app.post("/api/notes", (req, res) => {
    // reading db.json and calling a callback function
    fs.readFile("db/db.json", (err, data) => {
      // if err then throw err
      if (err) throw err;
      // setting noteData as a parsed string of data being passed through the callback function above
      noteData = JSON.parse(data);
      // newNote will have a title, text content, and a unique id from user input in POST route
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        // uses an npm package to create a unique id
        id: uuidv4(),
      };
      // console.log(noteData);

      // pushing newNote object data into noteData array
      noteData.push(newNote);

      // updating db.json with newNote data
      fs.writeFile("db/db.json", JSON.stringify(noteData, null, 2), (err) => {
        if (err) throw err;
        // sending a noteData as a JSON string
        res.json(noteData);
      });
    });
  });

  // DELETE request to /api/note/:id
  app.delete("/api/notes/:id", (req, res) => {
    // reading db.json and calling a callback function
    fs.readFile("db/db.json", (err, data) => {
      // if err then throw err
      if (err) throw err;
      // setting noteData as a parsed string of data being passed through the callback function above
      noteData = JSON.parse(data);
      // declaring a variable for the id of the selected note
      let selectedNoteID = req.params.id;
      // console.log(selectedNoteID);
      // looping through noteData(for note in noteData)
      for (const n in noteData) {
        // if the id or current note is equal to the id of the selected noteData,
        if (noteData[n].id === selectedNoteID) {
          // then...
          // declaring i to be the index of the current note
          let i = noteData.indexOf(noteData[n]);
          // if i > -1 (aka: if it exists)
          if (i > -1) {
            // console.log(noteData[n].id);
            // then remove that note object from the array
            noteData.splice(i, 1);
          }
        }
      }
      // updating db.json with removing selected note
      fs.writeFile("db/db.json", JSON.stringify(noteData, null, 2), (err) => {
        // if err then throw err
        if (err) throw err;
        // sending a noteData as a JSON string
        res.json(noteData);
      });
    });
  });
};
