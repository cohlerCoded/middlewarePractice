const express = require("express");
const app = express();
const morgan = require("morgan");

//app.use(morgan("tiny"));
app.use((req, res, next) => {
  req.requestTime = Date().toString();
  console.log(req.method.toLocaleUpperCase(), req.path);
  next();
});

// app.use((req, res, next) => {
//   console.log("THIS IS MY FIRST MIDDLEWARE!");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("THIS IS MY SECOND MIDDLEWARE!");
//   next();
// });

app.get("/", (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send("home page!!!");
});

app.get("/dogs", (req, res) => {
  res.send("WOOF WOOF!!!");
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
