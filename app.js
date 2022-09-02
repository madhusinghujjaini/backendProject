const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log("server is up on Port No:", PORT)
})

let taskList = [];

app.get('/getTaskList', (req, res) => {
    res.status(200).send(taskList)
})

app.post('/addTask', (req, res) => {
    let taskId = Math.random();
    req.body.id = getRendomID();
    taskList.push(req.body)
    res.status(200).send({ sucess: 'date save sucessfully' })
})

app.put('/updateTask', (req, res) => {
    console.log(req.body)
    let task = taskList.find(ele=> {
        return  ele.id == req.body.id
    })
    task.taskName = req.body.taskName;
    task.description = req.body.description;
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