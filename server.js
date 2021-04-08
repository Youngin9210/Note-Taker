const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./Routes/apiRoutes.js")(app);
require("./Routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
