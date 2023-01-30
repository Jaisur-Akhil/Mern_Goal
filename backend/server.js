/** @format */
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.port ||  5000;
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/goals' , require('./routes/goalRoutes'))
// app.get('/api/goals', (req, res)=>{
//     // res.send('Get Goals')
//     res.status(200).json({message:'Get Goals'})
// })

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
