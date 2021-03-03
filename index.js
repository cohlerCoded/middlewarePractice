const express = require("express");
const app = express();
const morgan = require("morgan");

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennuggets") {
    next();
  }
  res.send("Sorry, you need to enter a password!!!");
};

//app.use(morgan("tiny"));
app.use((req, res, next) => {
  req.requestTime = Date().toString();
  console.log(req.method.toLocaleUpperCase(), req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log(req.requestTime);
  console.log("I LOVE DOGS!!!!");
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

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "I wear my sunglasses at so I can, so I can watch you weave then breathe your story lines"
  );
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND 404");
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
