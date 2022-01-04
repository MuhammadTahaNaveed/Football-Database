
const express = require('express')
      queryDB = require('./user');
const Database = require('./Database');
const { encrypt,decrypt } = require('./EncryptionHandler');
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//configuring app for reading embedded javascript
app.set('view engine','ejs');
app.use(express.static(__dirname+"/public")); 
app.use(cors());

app.use('/club', queryDB.customQuery("club.sql"));
app.use('/league', queryDB.customQuery("league.sql"));
app.use('/player', queryDB.customQuery("player.sql"));
app.use('/wc_awards', queryDB.customQuery("wc_awards.sql"));
app.use('/league_awards', queryDB.customQuery("league_awards.sql"));
app.use('/tournaments', queryDB.customQuery("tournaments.sql"));
app.use('/admin_player', queryDB.customQuery("admin_player.sql"));
app.use('/admin_person', queryDB.customQuery("admin_person.sql"));
app.use('/log', queryDB.customQuery("log.sql"));

app.post('/club/query', (req, res)=> {
      let sql = "";
      let values = [];
      console.log(req.body);
      if ("Clubs" in req.body)
      {
        values = [req.body.Clubs];
        sql = "CALL show_club_players(?)";
      }
      else if ("player_id" in req.body)
      {
        values = [req.body.player_id,req.body.name];
        sql = "CALL show_player_info(?,?)";
      }
        Database.query(sql,values,
                      (err, result) => {
                        if (err) throw err;
                        res.send(result[0]);
                      }
                      )
        });
app.post('/league/query', (req, res)=> {
  let sql = "";
  let values = [];
  console.log(req.body);
  if ("Clubs" in req.body)
  {
    values = [req.body.Clubs];
    sql = "CALL show_club_players(?)";
  }
  else if ("player_id" in req.body)
  {
    values = [req.body.player_id,req.body.name];
    sql = "CALL show_player_info(?,?)";
  }
  else if ("League" in req.body)
  {
    values = [req.body.League];
    sql = "CALL show_league_clubs(?)";
  }
    Database.query(sql,values,
                  (err, result) => {
                    if (err) throw err;
                    res.send(result[0]);
                  }
                  )
    });
app.post('/fixtures/query', (req, res)=> {
  let sql = "CALL show_fixtures(?)";
  let values = [req.body.tournaments];

    Database.query(sql,values,
                  (err, result) => {
                    console.log(result);
                    if (err) throw err;
                    res.send(result[0]);
                  }
                  )
    });
app.post('/standings/query', (req, res)=> {
  let sql = "CALL show_standings(?)";
  let values = [req.body.tournaments];

    Database.query(sql,values,
                  (err, result) => {
                    console.log(result);
                    if (err) throw err;
                    res.send(result[0]);
                  }
                  )
    });
app.post('/admin_player/data', (req, res)=> {
  console.log(req.body);
  let sql = "CALL insert_into_player(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let values = [];
  for (key in req.body)
  {
    values.push(req.body[key]);
  }
    Database.query(sql,values,
                  (err, result) => {
                    if (err) throw err;
                    console.log(result);
                  }
                  )
    });
app.post('/admin_person/data', (req, res)=> {
  console.log(req.body);
  let sql = "INSERT INTO person (first_name,last_name,nationality) VALUES (?,?,?)";
  let values = [];
  for (key in req.body)
  {
    values.push(req.body[key]);
  }
    Database.query(sql,values,
                  (err, result) => {
                    if (err) throw err;
                  }
                  )
    });
app.post('/addModerator', (req,res)=>
{
  console.log(req.body);
  let {username,password} = req.body;
  let encryptedPassword = encrypt(password);

  Database.query(
    "INSERT INTO moderators (password, username, iv) VALUES (?,?,?)",
    [encryptedPassword.password, username, encryptedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});
app.get('/login', (req, res)=> {
  console.log(req.body);
  Database.query("SELECT * from moderators" , (err,results) => 
  {
      let admins = new Array();
      for (let index = 0; index < results.length; index++) {
        let admin = {username:"",password:""}
        admin.username = results[index].username;
        admin.password = decrypt({password : results[index].password , iv : results[index].iv}) 
        console.log(admin);
        admins[index] = admin;
        console.log(admins);
      }
      if (err) throw err;
      res.send(admins);

  })

  });

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`listening on port ${port}`)});
