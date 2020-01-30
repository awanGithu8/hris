const express   = require('express');
const router    = express.Router();

const User      = require("../schemas/user");

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      username: 1
    });
  });
  
  // this is our update method
  // this method overwrites existing data in our database
  router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    User.findByIdAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  // this is our delete method
  // this method removes existing data in our database
  router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    User.findByIdAndRemove(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  
  // this is our create methid
  // this method adds new data in our database
  router.post("/putData", (req, res) => {
    let data = new User();
  
    const { username, role } = req.body;
  
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        data[key] = req.body[key];
      }
    }
  
    if (username == "" && role == "") {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    // data.username = username;
    // data.role = role;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  module.exports = router