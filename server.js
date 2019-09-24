// Calling the modules to beused and assigning them to variables
const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');
const morgan = require('morgan');

//assing express to our app
const app = express();

// setting the toyota page
var html_dir ='./public/';

// Enablingtheuse of express to the app
app.use(express.static('./public'));

app.use(morgan('short'));

app.use(parser.urlencoded({extended:false}));
      

app.get('/', function(req, res){

    var foot ={root :__dirname}
    res.sendFile(html_dir + '/toyota.html',foot);
});

var connection =  mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'toyota',
    password:'',

});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Database connected'); 
    
});
app.post('/userdetails',(req, res)=>{
    
    const cusid = req.body.cusid;
    const name = req.body.name;
    const state = req.body.state;
    const partnumber = req.body.partnumber;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const shipping = req.body.shipping;
    const total = req.body.total;

    const querystring = " INSERT INTO order (cusid, name, state,partnumber,description, price, quantity,shipping, total) VALUE (?,?,?,?,?,?,?,?,?)";
    connection.query(querystring, [cusid, name, state, partnumber, description, price, quantity, shipping, total]);
    connection.end();

    console.log('getting the form input' + req.body.name);
});
    
app.listen(5010);
console.log('Running at port 5010');