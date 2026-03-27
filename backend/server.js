require("dotenv").config({ path: "./.env" });

const app = require("./src/app");
const connectDB = require("./src/DB/db");

connectDB(); // ✅ now it works

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});