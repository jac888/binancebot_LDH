var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login", { title: "登入" });
  //register jquery animated page
  //res.render("test1", { title: "Express" });
});

module.exports = router;
