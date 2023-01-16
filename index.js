const express = require("express");
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   },
//   () => {
//     console.log("Connected to the database.");
//   }
// );

mongoose
  .connect(
    "mongodb+srv://LisandraFerraz:Bazph0000@movinitdb.ebicxsa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
    console.log("Connection with the database established.");
  })
  .catch((err) => {
    console.log("Caught Error:", err);
  });

const routes = require("./routes/routes");

app = express();

app.get("/", (req, resp) => {
  resp.status(200).json({ msg: "Olá mundo!" });
});

app.use(express.json());

app.use("/api", routes);

// app.listen(8000);
