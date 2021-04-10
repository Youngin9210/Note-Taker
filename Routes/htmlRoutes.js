// requiring path module to edit/read files
const path = require("path");

// exporting a function passing through an argument to use express routes in server.js
module.exports = (app) => {
  // GET request to /notes
  app.get("/notes", (req, res) => {
    // sending note.html to /notes
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // GET request to all other routes
  app.get("*", (req, res) => {
    // sending index.html to all other routes
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
