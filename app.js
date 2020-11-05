const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000


// middlewares
app.use(express.json());


// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log('server is started');
  })
  .catch((err) => console.log(err));

  
