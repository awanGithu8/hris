const express   = require('express');
const router    = express.Router();

const JobTitle  = require("../schemas/job_title");


/* API Job Title */

router.get("/listJobTitle", (req, res) => {
    JobTitle.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      description: 1
    });
  });
  
  router.post("/addJobTitle", (req, res) => {
    let data = new JobTitle();
  
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        data[key] = req.body[key];
      }
    }
  
    if (req.body.description == "" || req.body.division_id == "") {
      return res.json({
        success: false,
        error: "Description and Division is required"
      });
    }
  
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.post("/updateJobTitle", (req, res) => {
    const { id, update } = req.body;
    JobTitle.findByIdAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.delete("/deleteJobTitle", (req, res) => {
    const { id } = req.body;
    JobTitle.findByIdAndRemove(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  /* END API Job title */

  module.exports = router
