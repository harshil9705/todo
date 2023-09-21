const express = require('express')
const app =express()
app.use(express.json())

let initialTodo = [{title:'HTML',isCompleted:true,id:1},{title:'javascript',isCompleted:true,id:2},{title:'React',isCompleted:false,id:3}]

app.get('/',(req,res)=>{
    res.send('welcome to the todo api')
})

// get

app.get('/todos',(req,res)=>{
    res.send(initialTodo)
})

// post

app.post('/addtodo',(req,res)=>{
    let posttodo ={
        title:req.body.title,
        isCompleted:req.body.isCompleted,
        id:initialTodo.length+1
    }
    initialTodo.push(posttodo)
    res.status(200).send(posttodo)
})

// patch

app.patch('/update/:id',(req,res)=>{
    let {id} = req.params

    let patch = initialTodo.findIndex((pera)=>pera.id == id)

    if(patch == -1){
        res.status(404).send('this todo in not found')
    }
    else{
        initialTodo[patch]=req.body;
    }
    res.status(200).send(initialTodo[patch])
})

// delete

app.delete('/delete/:id',(req,res)=>{
    let {id} = req.params
    let index = initialTodo.findIndex((pera)=> pera.id == id)
    let deletedTodo = initialTodo.splice(index,1)[0]
    let todos = initialTodo.filter((ele)=>ele.id != id)
    res.send({"deletedTodo":deletedTodo,"todos":todos})
})


// get single todo

app.get('/todo/:id',(req,res)=>{
    let {id} = req.params
    let single = initialTodo.filter((data)=>data.id == id)
    
    res.status(200).send(single)
})

// filters

app.get('/findbystatus',(req,res)=>{
    let {isCompleted} = req.query;
    let filter = initialTodo.filter((find)=>find.isCompleted.toString() == isCompleted)
    res.status(200).send(filter)
})

app.listen(8090,()=>{
    console.log('port running on 8090');
})