var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const api = require('./routes/api')
const PORT = 8000

app.use(bodyParser.json());

app.use('/',api)


// app.get('/',api)
// app.get('/task',api)
app.listen(PORT,()=>{
    console.log(`App listening on port  ${PORT}`)   
});


// console.log(1);
// function logMessage() {
//   console.log("Hello, this message was delayed by 2000 milliseconds (2 seconds)!");
// }

// setTimeout(logMessage, 2000);
// console.log(3);