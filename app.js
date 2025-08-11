var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tweetsRouter = require("./routes/tweets");

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tweets", tweetsRouter);

app.use(errorHandler);

module.exports = app;
