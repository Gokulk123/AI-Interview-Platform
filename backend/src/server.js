require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");
const port = process.env.PORT || 5000;

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`running on post ${port}`);
});
