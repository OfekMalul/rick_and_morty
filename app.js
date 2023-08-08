const express = require("express");

const rickAndMortyRouter = require("./routes/rickAndMortyCSVRoute");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

app.use("/rickandmortyCSV", rickAndMortyRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log("listening on port " + port);
});

// module.exports = app;
