// Including packages needed for this application
// requiring express
const express = require("express");
// setting app as an express function
const app = express();

// setting port to whatever environment variable is needed (Heroku) OR 3000
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requiring routes
require("./Routes/apiRoutes.js")(app);
require("./Routes/htmlRoutes.js")(app);

// listening for connections to PORT
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
