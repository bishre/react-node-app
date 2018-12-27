const express = require('express');
const mysql = require('mysql');

const app = express();

const SELECT_ALL = 'SELECT * FROM person';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'persondatabase'
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

// app.use(bodyParser.json());
app.use(express.json());


app.get('/persons', (req, res) => {
  connection.query(SELECT_ALL, (err, results) => {
    if(err) {
      return res.send(err);
    }
    else {
      return res.json(results);
    }
  });
});

app.post('/persons/add', (req,res)=>{
  const { name, email, phone } = req.body;
  const INSERT_PERSON = `INSERT INTO person (id, name, email, phone) VALUES (${Date.now()}, '${name}', '${email}', ${phone})`;
  connection.query(INSERT_PERSON, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('added persons successfully');
    }
  });

});

app.delete('/persons', (req,res) => {
  const DELETE_PERSON = `DELETE from person WHERE id = ${req.body.id}`;
  connection.query(DELETE_PERSON, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('deleted persons');
    }
  });
});

app.put('/persons', (req,res) => {
  const UPDATE_PERSON = `UPDATE person SET name = '${req.body.name}', email = '${req.body.email}', phone = ${req.body.phone} WHERE id = ${req.body.id}`;
  connection.query(UPDATE_PERSON, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated persons');
    }
  });
});

app.listen(4000, ()=> {
  /*eslint-disable no-console*/
  console.log('Server listening on port 4000');
});
