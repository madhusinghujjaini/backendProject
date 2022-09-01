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

app.put('/updateTask:task', (req, res) => {
    console.log(req.task)
    res.status(200).send({ sucess: 'date save sucessfully' })
})

function getRendomID() {
    return (Math.random() * 100000000000000000);
}