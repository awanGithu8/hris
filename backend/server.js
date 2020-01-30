
const mongoose      = require("mongoose");
const express       = require("express");
const cors          = require("cors");
const bodyParser    = require("body-parser");
const logger        = require("morgan");

const API_PORT  = 3001;
const app       = express();
app.use(cors());
const router = express.Router();

/* Setup Routes */
const userRoute             = require('./apis/user');
const divisionRoute         = require('./apis/division');
const jobTitleRoute         = require('./apis/job_title');
const cutiRoute             = require('./apis/cuti');
const loginRoute            = require('./apis/login');
const specialPermitRoute    = require('./apis/special_permit');
const dataRoute              = require('./apis/data');

app.use('/api', userRoute);
app.use('/api', divisionRoute);
app.use('/api', jobTitleRoute);
app.use('/api', cutiRoute);
app.use('/api', loginRoute);
app.use('/api', specialPermitRoute);
app.use('/api', dataRoute);
/* End Setup Routes */

// this is our MongoDB database
const dbUrl = {
  live: "mongodb+srv://sindata:sindata@sindatadb-eyfmi.mongodb.net/test?retryWrites=true&w=majority",
  dev: "mongodb+srv://santuy:santuy@santuycluster-9nevr.gcp.mongodb.net/test?retryWrites=true&w=majority"
}

const dbRoute = dbUrl.dev;
  

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true }, function(err) {
  if (err) { return console.error('Failed connect to database ', err);}
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));












// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(process.env.PORT || API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
