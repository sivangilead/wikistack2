
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { db } = require('./models');
const path = require('path');
const morgan = require("morgan");
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.use(morgan("dev"));


app.use(express.static('public'))

// app.use("/",(req,res,next)=>{
// res.redirect('/wiki')
// }
// )




app.get("/",(req,res,next)=>{
const layout=require("./views/layout")
res.send(layout(''))
})

const init=async()=>{
await db.sync({force: false})

PORT=3000
app.listen(PORT,()=>console.log(`listening on port ${PORT}`))
}
init()
