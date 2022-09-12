const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./model/Task');
const User = require('./model/User');

const app = express();
const PORT = 3000;


const connectToDatabase = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://admin:admin@todoapp.ysdlh3a.mongodb.net/?retryWrites=true&w=majority');
        console.log("Connected to db")
    } catch (error) {
        console.log(error);
    }
    
}
connectToDatabase();

app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log("server is up on Port No:", PORT)
})

let taskList = [];

app.get('/getTaskList', async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
})
app.get('/getUserList', async (req, res) => {
    const user = await User.find({})
    res.status(200).send(user)
})

app.post('/addTask', async (req, res) => {
    // let taskId = Math.random();
    // req.body.id = getRendomID();
    // taskList.push(req.body)
    if(!req.body.taskName){
       return res.status(400).send({ error: `user name required` });
    }
   
    const result = await Task.create({
        name: req.body.taskName,
        description: req.body.description
    })
      
    res.status(200).send({ sucess: `Task ${req.body.taskName} created sucessfully` });
})
app.post('/addUser',async(req, res) =>{
    if(!req.body.userName){
        return res.status(400).send({ error:'user name required'});
    }
    if(!req.body.email){
        return res.status(400).send({ error:'email is  required'});
    }
    if(!req.body.phoneNo){
        return res.status(400).send({ error:'phoneno is required'});
    }
    
    const result = await User.create({
        name: req.body.userName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        address: req.body.address,
    })
      
    res.status(200).send({ sucess: `user ${req.body.userName} created sucessfully` });
    
}
)












app.put('/updateTask', async (req, res) => {
    console.log(req.body)
    // let task = taskList.find(ele=> {
    //     return  ele.id == req.body.id
    // })
    // task.taskName = req.body.taskName;
    // task.description = req.body.description;
    
    const task = await Task.findById(req.body.id);
    task.name = req.body.taskName;
    task.description = req.body.description;

    await task.save();

    res.status(200).send({ sucess: 'date updated sucessfully' })
})
app.put('/updateUser', async (req, res) => {
    if(!req.body.userName){
        return res.status(400).send({ error:'user name required'});
    }
    if(!req.body.email){
        return res.status(400).send({ error:'email is  required'});
    }
    if(!req.body.phoneNo){
        return res.status(400).send({ error:'phoneno is required'});
    }
    const user = await User.findById(req.body.id);
    user.name = req.body.userName;
    user.phoneNo = req.body.phoneNo;
    user. email= req.body.email;
    user.address = req.body.address;

    await user.save();

    res.status(200).send({ sucess: 'date updated sucessfully' })
})


app.delete('/deleteTask',async (req,res)=>{
    if(!req.body.id){
        return res.status(400).send({ error:'user id required'});
    }
    await Task.deleteOne({_id:req.body.id })
    res.status(200).send("Task Deleted");
})
app.delete('/deleteUser',async (req,res)=>{
    if(!req.body.id){
        return res.status(400).send({ error:'user id required'});
    }
    await User.deleteOne({_id:req.body.id })
    res.status(200).send("User Deleted");
})

function getRendomID() {
    return (Math.random() * 1000000000000000000);
}