const connectToMongo = require('./db');
const express = require('express');
// const nodemailer = require("nodemailer");
//require("dotenv").config();
var cors = require('cors') ;
connectToMongo();
const app = express()
const port = 3001
app.use(cors())
var corsOptions = {
  origin: ["http://localhost:3000","https://letstock-2bc58.web.app/"]
};

app.use(cors(corsOptions));

app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/stocks', require('./routes/stocks'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})