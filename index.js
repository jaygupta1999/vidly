const config = require('config');
const dotenv = require('dotenv');
const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth')
const express = require('express');
const app = express();

dotenv.config();

if(!process.env.jwtPrivateKey) {
   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
   process.exit(1);
}


mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true})
   .then(()=>console.log('connected to mongodb'))
   .catch((err)=>console.log(err.message))

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/users', users);
app.use('/api/auth',auth);


const port = process.env.PORT || 3000;

app.listen(port,(req,res)=>{
   console.log(`Server listening at port ${port}`);
})

