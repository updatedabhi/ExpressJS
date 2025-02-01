const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: path.join(__dirname, "config.env") });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
