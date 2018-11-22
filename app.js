const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressHbrs = require("express-handlebars");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").localStrategy;
const mongo = require("mongodb");
const mongoose = require("mongoose");
const registerRouter = require("./routes/register");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
const app = express();

//load view enging
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set staic folders
app.use(express.static(__dirname + "/public"));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.get("/", function(req, res) {
//   res.render("index");
// });

//connect mongodb
mongoose.connect(
  "mongodb://localhost/customers",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
//console.log(db);

//express session
app.use(
  session({
    secret: "test",
    saveUninitialized: true,
    resave: true
  })
);

//passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator

//connect flash
app.use(flash());

//global vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("登入成功！");
  res.locals.error_msg = req.flash("登入失敗！");
  res.locals.error = req.flash("其他錯誤");
  next();
});

//routes
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

app.listen(3001, () => {
  console.log("server starts...");
});

//   binance.prices(eosKey, (error, ticker) => {
//     console.log("Price of EOS (USDT): ", ticker.EOSUSDT);
//   });

// function formatDate() {
//   const d = new Date(),
//     month = "" + (d.getMonth() + 1),
//     day = "" + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return [year, month, day].join("-");
// }
