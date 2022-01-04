const Database = require('./Database');
const express = require('express');
const fs = require('fs');
let app = express.Router();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
let customQuery = function(filename)
{
    const fetchedQuery = fs.readFileSync(__dirname + "/sqlQueries/" + filename).toString();
    app = express.Router();
    app.get('/', (req, res)=> {
        Database.query(fetchedQuery,(err,result,fields)=>{
            if (err) console.log(err);
            res.send(result);
            // res.render("user-list" , );
        })
    });
    return app;
}

module.exports = {customQuery,app};