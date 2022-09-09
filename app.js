const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./model/Task')

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

app.post('/addTask', async (req, res) => {
    // let taskId = Math.random();
    // req.body.id = getRendomID();
    // taskList.push(req.body)
   
    const result = await Task.create({
        name: req.body.taskName,
        description: req.body.description
    })
      
    res.status(200).send({ sucess: `Task ${req.body.taskName} created sucessfully` });
})

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

app.delete('/deleteTask',(req,res)=>{
    let _tasklist = taskList.filter(ele=> ele.id != req.body.id);
    taskList = _tasklist;
    res.status(200).send("Task Deleted");
})

function getRendomID() {
    return (Math.random() * 1000000000000000000);
}