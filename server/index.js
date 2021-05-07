require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Static folder
app.use("/static", express.static(path.join(__dirname, "public")));

// Kết nối database
connectDB();

// Listen for requests
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/api", require("./routes/api.route"));
app.use("/example", require("./routes/example.route"));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
