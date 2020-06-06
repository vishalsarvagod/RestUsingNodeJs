const express = require('express'); //import express
const Joi = require('joi'); // import joi
const app = express(); //create Express Application on the app variable
app.use(express.json()); //used the json file

// give data to the server

const customer = [
    {title: 'vishal', id:1},
    {title: 'Aishwarya', id:2},
    {title: 'Milind', id:3},
    {title: 'Rohit', id:4},
    {title: 'Vrushali', id:5},
    {title: 'Surbhi', id:6},
]
//Read Request handlers
//Display the Message when the URL consist of

app.get('/',(req,res)=>{
    res.send('Welcome to DemoRest API...');
});

app.get('/api/customer',(req,res)=>{
    //const custom = customer.find(c=>c.id === parseInt(req.params.id));
    //If there is no valid customer ID, then display an error with the following 
    //if(!custom) res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;">Oops..Cant find what you are looking for!</h2>');
    res.send(customer);
});

app.get('/api/customer/:id',(req,res)=>{
    const custom = customer.find(c=>c.id === parseInt(req.params.id));
    //If there is no valid customer ID, then display an error with the following 
    if(!custom) res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;">Oops..Cant find what you are looking for!</h2>');    
    res.send(custom);
});

//Create Request Handler
//Create New Customer Information

app.post('/api/customer',(req,res)=>{
    const {error}=validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    //increment the customer id
    const custom ={
        id: customer.length +1,
        title: req.body.title
    };
    customer.push(custom);
    res.send(customer);
});

function validateCustomer(customer){
    const schema={
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer,schema);
}
//Port Environment variable
const port = process.env.port || 8080 ;
app.listen(port, ()=> console.log("Listening on port ${port}.."));