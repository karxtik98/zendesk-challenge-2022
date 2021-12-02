require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ticketRoutes = require("./routes/ticketRouter");
const { response } = require("express");

// initialise express server
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);

// bad request error handling
app.use((req, res, next) => {
  const err = new Error(`Route: ${req.originalUrl} does not exist.`);
  res.status(404).send({ message: err.message });
});

module.exports = app.listen(port, () => {
  console.log(`The server is listening on port ${port}!`);
});
