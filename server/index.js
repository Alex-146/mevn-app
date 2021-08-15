
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todos"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("server", "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("server", "public", "index.html"));
  });
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started at ${PORT}...`));
  }
  catch(error) {
    console.log(error);
  }
}

main();
