const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennuggets") {
    next();
  }
  //res.send("Sorry, you need to enter a password!!!");
  throw new AppError("Password required!!!", 401);
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

app.get("/error", (req, res) => {
  chicken.fly();
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

app.get("/admin", (req, res) => {
  throw new AppError("YOU AINT NO ADMIN", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND 404");
});

// app.use((err, req, res, next) => {
//   console.log(
//     "******************************************************************"
//   );
//   console.log(
//     "************************ERROR*************************************"
//   );
//   console.log(
//     "******************************************************************"
//   );
//   //res.status(500).send("OH NO WE GOT AN ERROR!!!");
//   next(err);
// });
app.use((err, req, res, next) => {
  const { status = 500, message = "OH NO ERROR!!!" } = err;
  res.status(status).send(`${message} ${status}`);
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
