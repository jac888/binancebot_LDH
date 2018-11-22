var express = require("express");
var router = express.Router();

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
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(password2);
});

module.exports = router;
