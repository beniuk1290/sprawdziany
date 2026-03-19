const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// statyczne pliki (twoja strona)
app.use(express.static(path.join(__dirname, "public")));

// start serwera
app.listen(PORT, () => {
  console.log("Serwer działa na porcie " + PORT);
});vs