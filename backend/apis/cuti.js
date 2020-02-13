const express   = require('express');
const router    = express.Router();

const Cuti  = require("../schemas/cuti");
const User  = require("../schemas/user");


/* API Cuti */
router.get("/listCuti", (req, res) => {
    Cuti.find(function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      createdAt: -1
    });
  });
  
  router.post("/listCutiUser", (req, res) => {
    const { user_id } = req.body;
  
    Cuti.find({ user_id: user_id }, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      createdAt: -1
    });
  });
  
  router.post("/listApproval", (req, res) => {
    const { id_approver } = req.body;
  
    Cuti.find({ approver_id: id_approver, status: "Waiting For Approval" }, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      createdAt: -1
    });
  });
  
  router.post("/listApprovalAll", (req, res) => {
    Cuti.find({ status: "Waiting For Approval" }, function(err, data) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    }).sort({
      createdAt: -1
    });
  });
  
  router.post("/addCuti", (req, res) => {
    let data = new Cuti();
  
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        data[key] = req.body[key];
      }
    }
  
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.post("/approveCuti", (req, res) => {
    const { id, total_days, requester } = req.body;
  
    User.find({ _id: requester }, function(err, datauser) {
      let { remaining } = datauser[0];
  
      if (!err) {
        Cuti.findByIdAndUpdate(id, { status: "Approved" }, err => {
          if (err) {
            return res.json({ success: false, error: err });
          } else {
            // Kurangi saldo cuti user
            // console.log(remaining);
            // console.log(total_days);
            // console.log(id_user);
            // console.log("gajelassss ====== " + datauser.remaining - total_days);
            User.findByIdAndUpdate(
              requester,
              { remaining: remaining - total_days },
              err => {}
            );
            // End Kurangi saldo cuti user
  
            return res.json({ success: true });
          }
        });
      }
    });
  });
  
  router.post("/rejectCuti", (req, res) => {
    const { id } = req.body;
    Cuti.findByIdAndUpdate(id, { status: "Rejected" }, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  router.get("/deleteCuti", (req, res) => {
    Cuti.find((err, data) => {
      data.forEach(function(cuti) {
        cuti.remove();
      });
    });
    return res.json({ success: "GG cuy" });
  });
  
  /* End API Cuti */
  

module.exports = router
