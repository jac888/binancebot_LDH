var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "首頁" });
  //register jquery animated page
  //res.render("test1", { title: "Express" });
});

module.exports = router;
