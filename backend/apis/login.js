const express   = require('express');
const router    = express.Router();

const User  = require("../schemas/user");


/* Api Login */
router.post("/checkUserLogin", (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    User.find({ username: username, password: password }, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
  
  router.post("/userLoggedIn", (req, res) => {
    User.findOneAndUpdate(req.body, { isLogin: true }, {}, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
  
  router.post("/userLoggedOut", (req, res) => {
    User.findOneAndUpdate(req.body, { isLogin: false }, {}, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
  /* End Api Login */
  
  module.exports = router
