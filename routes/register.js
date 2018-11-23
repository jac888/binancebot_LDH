const express = require("express");
const router = express.Router();
const User = require("../model/user");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("register", { title: "註冊" });
  //register jquery animated page
  //res.render("test1", { title: "Express" });
});

router.post("/", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  // console.log(name);
  // console.log(email);
  // console.log(password);
  // console.log(password2);

  req.checkBody("name", "姓名不能為空").notEmpty();
  req.checkBody("email", "電子郵件不得為空").notEmpty();
  req.checkBody("email", "電子郵件格式有誤").isEmail();
  req.checkBody("password", "密碼不得為空").notEmpty();
  req.checkBody("password2", "密碼不相同").equals(req.body.password);

  var error = req.validationErrors();
  if (error) {
    //console.log("got error");
    res.render("register", {
      errors: error
    });
    console.log(error);
  } else {
    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, user) {
      console.log("creating user...");
      if (err) {
        console.log("creating failed!");
        throw err;
      }
      console.log("creating user success! User Info : " + user);
    });

    req.flash("success_msg", "Register success! Please login");
    res.redirect("/login");
  }
});

module.exports = router;
