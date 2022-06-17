const express = require('express');
const cors=require('cors');//cross origin resource sharing.
const userRouter = require('./routes/userRouter')
const app = express();
const orderRouter =require('./routes/orderRouter')
app.use(cors());

app.use(express.json()); //middleware for post method.

app.use('/user',userRouter);
app.use('/order',orderRouter);

module.exports=app;
