const path = require("path");
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const server= require('./server.js')

// create express app
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Use body-parser for handling form submissions
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// app.get('/projects', (req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// })

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
// app.use(express.static("client/build"));
app.use(routes)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Artihaus'
//production
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://artihausapi:artihaus4153@ds149998.mlab.com:49998/heroku_09kfqkw9'
mongoose.Promise = Promise
mongoose.connect(MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(res => console.log(`MongoDB is running!`))
  .catch(err => console.log(err))

// start express server on port 5000
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("server started on port 5000");
});