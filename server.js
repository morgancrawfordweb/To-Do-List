const express = require("express")
const { render } = require("express/lib/response")
const app = express()
const PORT = 9000
const mongoose = require('mongoose')


const toDoTask = require('./models/toDoTask')
require('dotenv').config()


app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


mongoose.connect(process.env.CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('connect to database!')}
)


//GET method
app.get('/', async (request, response)=>{
    try{
         toDoTask.find({}, (err,tasks)=> {
            response.render('index.ejs', {
                toDoTasks: tasks})
        })
        
    }catch(err){
        if(err) return response.status(500).send(err)
    }
})


//POST method
app.post('/', async (req,res)=>{
    const TodoTask = new toDoTask(
        {
            title: req.body.title,
            content: req.body.content,
        }
    )
    try{
        await TodoTask.save()
        console.log(TodoTask)
        res.redirect('/')
    } catch(err){
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})


//EDIT or UPDATE METHOD
app
    .route('/edit/:id')
    .get((req,res)=>{
        const id = req.params.id
        toDoTask.find({},(err,tasks)=>{
            res.render('edit.ejs',{
                todoTasks: tasks, idTask: id})
            })
        })
    .post((req,res)=>{
        const id = req.params.id
        toDoTask.findByIdAndUpdate(
            id,
            {
                title:req.body.title,
                content:req.body.content
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
            )
    })
    

//DELETE

app
    .route('/remove/:id')
    .get((req,res)=>{
        const id = req.params.id
        toDoTask.findByIdAndRemove(id,err =>{
                if (err) return res.status(500).send(err)
                res.redirect('/')
        })
    })

app.listen(PORT, ()=>{
    console.log(`She be runnin on port ${PORT}`)
})



