const express = require('express')
const port = 8999
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'travel'
})

app.get('/api', (req,res) => res.json('You are the world'))

app.get('/api/locations', (req,res) => {
  connection.query('SELECT * FROM newLocation', (err, rows, filds) => {
    if(err) throw err
    res.json(rows)
  })
})

app.delete('/api/dellocations/:id', (req,res) => {
  const id = req.params.id
  connection.query('DELETE FROM newLocation WHERE id=?', [id], (err, rows, filds) => {
    if(err) throw err
    console.log('here')
    res.json(rows)
  })
})


app.post('/api/addlocations', (req,res) => {
  console.log(req.body)
  connection.query('INSERT INTO newLocation (Name, Lat, Lng) VALUES(?,?,?)', [req.body.name, req.body.location.lat, req.body.location.lng], (err, rows, filds) => {
    if(err) throw err
    res.json(rows)
  })
})

app.listen(port)

