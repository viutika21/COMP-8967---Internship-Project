const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require("mongoose");
const {Schema} = mongoose;
app.use(express.json());

//enable cors for all routes
app.use(cors());

mongoose.connect("mongodb://127.0.0.1/viutika_rathod",{
  useNewUrlParser:true,
  useUnifiedTopology: true
})

const sch = new Schema({
  id:String,
  name:String,
  email:String,
  age:Number
},{versionKey:false})

const monmodel = mongoose.model("NEWCOL", sch);

app.post("/post", async(req,res)=>{
  console.log("Inside post function");

  const data= new monmodel({
    name:req.body.name,
    email:req.body.email,
    id:req.body.id
  });
  const val= data.save();
  res.send("posted")
})

app.get("/fetchAll", async (req, res) => {
  try {
    const result = await monmodel.find().exec();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3001, ()=>{
  console.log("Connected to post 3001")
})








