const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

/* Import Schema */
const User = require('./user');
const Division = require('./division');
const JobTitle = require('./job_title');
const Cuti = require('./cuti');
/* End Import Schema */

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  // 'mongodb+srv://sindata:sindata@sindatadb-eyfmi.mongodb.net/test?retryWrites=true&w=majority'

  'mongodb+srv://santuy:santuy@santuycluster-9nevr.gcp.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    username: 1
  });;
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
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
      error: 'INVALID INPUTS',
    });
  }
  // data.username = username;
  // data.role = role;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

/* API Division */
router.get('/listDivision', (req, res) => {
  Division.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    description: 1
  });;
});

router.post('/addDivision', (req, res) => {
  let data = new Division();

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  if (req.body.description == "") {
    return res.json({
      success: false,
      error: 'Description is required',
    });
  }

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateDivision', (req, res) => {
  const { id, update } = req.body;
  Division.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteDivision', (req, res) => {
  const { id } = req.body;
  Division.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});


router.get('/listApprover', (req, res) => {
  User.find({ role: "Approver" }, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    createdAt: -1
  });
});

/* END API Division */

/* API Job Title */

router.get('/listJobTitle', (req, res) => {
  JobTitle.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    description: 1
  });;
});

router.post('/addJobTitle', (req, res) => {
  let data = new JobTitle();

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  if (req.body.description == "" || req.body.division == "") {
    return res.json({
      success: false,
      error: 'Description and Division is required',
    });
  }

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateJobTitle', (req, res) => {
  const { id, update } = req.body;
  JobTitle.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteJobTitle', (req, res) => {
  const { id } = req.body;
  JobTitle.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
/* END API Job title */

/* API Cuti */
router.get('/listCuti', (req, res) => {
  Cuti.find(function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    createdAt: -1
  });
});

router.post('/listCutiUser', (req, res) => {
  const { username } = req.body;

  Cuti.find({ name: username }, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    createdAt: -1
  });
});

router.get('/listApproval', (req, res) => {
  Cuti.find({ status: "Waiting For Approval" }, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort({
    createdAt: -1
  });
});

router.post('/addCuti', (req, res) => {
  let data = new Cuti();

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/approveCuti', (req, res) => {
  const { id, total_days, requester } = req.body;

  User.find({ username: requester }, function (err, datauser) {
    let {remaining} = datauser[0];
    let id_user = datauser[0].id;

    if (!err) {
      Cuti.findByIdAndUpdate(id, { status: "Approved" }, (err) => {
        if (err) {
          return res.json({ success: false, error: err });
        } else {
          // Kurangi saldo cuti user
          console.log(remaining);
          console.log(total_days);
          console.log(id_user);
          console.log("gajelassss ====== " + datauser.remaining-total_days);
          User.findByIdAndUpdate(id_user, { remaining: remaining - total_days }, (err) => { });
          // End Kurangi saldo cuti user

          return res.json({ success: true });
        }
      });
    }
  });

});

router.post('/rejectCuti', (req, res) => {
  const { id } = req.body;
  Cuti.findByIdAndUpdate(id, { status: "Rejected" }, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/deleteCuti', (req, res) => {
  Cuti.find((err, data) => {
    data.forEach(function (cuti) {
      cuti.remove();
    })
  });
  return res.json({ success: "GG cuy" });
});

/* End API Cuti */

/* Api Login */
router.post('/checkUserLogin', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  User.find({ username: username, password: password }, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/userLoggedIn', (req, res) => {
  User.findOneAndUpdate(req.body, { isLogin: true }, {}, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/userLoggedOut', (req, res) => {
  User.findOneAndUpdate(req.body, { isLogin: false }, {}, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
/* End Api Login */

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
