const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const postRoute = require("./src/routes/postRoute");
const commentRoute = require("./src/routes/commentRoute");

const config = require("./src/configs");

const PORT = config.app.port;
const MONGO_URL = config.db.uri;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

//database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to AgricultureVN Web");
});
