const express   = require('express');
const router    = express.Router();

const SpecialLeave  = require("../schemas/special_leave");


/* API Special Permit */

router.get("/listSpecialPermit", (req, res) => {
    SpecialLeave.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      description: 1
    });
  });
  
  router.post("/addSpecialPermit", (req, res) => {
    let data = new SpecialLeave();
  
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        data[key] = req.body[key];
      }
    }
  
    if (req.body.description == "" || req.body.permit_total == "") {
      return res.json({
        success: false,
        error: "Description and Permit Total is required"
      });
    }
  
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.post("/updateSpecialPermit", (req, res) => {
    const { id, update } = req.body;
    SpecialLeave.findByIdAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.delete("/deleteSpecialPermit", (req, res) => {
    const { id } = req.body;
    SpecialLeave.findByIdAndRemove(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  /* END API Special Permit */
  
  module.exports = router
