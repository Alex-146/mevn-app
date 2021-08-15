
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todos"));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => `Server started at ${PORT}...`);
  }
  catch(error) {
    console.log(error);
  }
}

main();
