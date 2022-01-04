const Database = require('./Database');
const express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


let insert = function()
{
    app.post('/', (req, res)=> {
      console.log(req.body);
        // res.render("user-list" , );
      });
    return app;
}
module.exports = {insert,app};