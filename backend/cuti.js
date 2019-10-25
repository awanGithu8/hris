const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    user_id: {type: String, required: true},
    type: {type: String, required: true},
    from_date: {type: String, required: true},
    to_date: {type: String, required: true},
    total_days: {type: Number, required: true},
    work_date: {type: String, required: true},
    reason: {type: String, required: true},
    status: {type: String, default: 'Waiting For Approval'}
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Cuti", DataSchema);
