const express   = require('express');
const router    = express.Router();

const Cuti  = require("../schemas/cuti");


/* API Report */
// router.get("/reportCuti", (req, res) => {
//     const { user_id } = req.body;
  
//     Cuti.find({ user_id: user_id }, function(err, data) {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: data });
//     }).sort({
//       createdAt: -1
//     });
//   });
   
  /* END API Report */

  module.exports = router
