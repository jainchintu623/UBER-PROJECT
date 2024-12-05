const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app =express();
const connectToDb = require('./Db/Db');
const userRoutes = require('./Routes/User.route')
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/',(req,res) =>{
   res.send('hello world');
});

app.use('/users',userRoutes);

module.exports=app;