const express   = require('express');
const router    = express.Router();

/* Clear All Data */
router.get("/deleteAllData", (req, res) => {
    let arr_Tables = [Cuti, User, Division, JobTitle];
    for (let index = 0; index < arr_Tables.length; index++) {
      const table = arr_Tables[index];
      table.find((err, data) => {
        data.forEach(function(data) {
          data.remove();
        });
      });
    }
    return res.json({ success: "Semua data telah terhapus" });
  });
  /* End Clear All Data */
  
  module.exports = router
