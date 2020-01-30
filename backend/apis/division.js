const express   = require('express');
const router    = express.Router();

const Division  = require("../schemas/division");

/* API Division */
router.get("/listDivision", (req, res) => {
    Division.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      description: 1
    });
  });
  
  router.post("/addDivision", (req, res) => {
    let data = new Division();
  
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        data[key] = req.body[key];
      }
    }
  
    if (req.body.description == "") {
      return res.json({
        success: false,
        error: "Description is required"
      });
    }
  
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.post("/updateDivision", (req, res) => {
    const { id, update } = req.body;
    Division.findByIdAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.delete("/deleteDivision", (req, res) => {
    const { id } = req.body;
    Division.findByIdAndRemove(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  
  router.get("/listApprover", (req, res) => {
    User.find({ role: "Approver" }, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      createdAt: -1
    });
  });
  
  /* END API Division */

  module.exports = router
