const dotenv = require("dotenv");
dotenv.config();
const Router = require("./routes/Router");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(Router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
