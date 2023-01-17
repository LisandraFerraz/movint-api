require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8000);
    console.log("Connection with the database established.");
  })
  .catch((err) => {
    console.log("Caught Error:", err);
  });

const routes = require("./routes/routes");

app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200", "http://localhost:8000"],
  })
);

app.get("/", (req, resp) => {
  resp.status(200).json({ msg: "Olá mundo!" });
});

app.use(express.json());

app.use("/api", routes);
