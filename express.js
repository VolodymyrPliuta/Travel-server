const express = require('express')
const port = 8999

const app = express();
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'travel'
})

app.get('/api', (req,res) => res.json('You are the world'))

app.get('/api/locations', (req,res) => {
  connection.connect()
  connection.query('SELECT * FROM newLocation', (err, rows, filds) => {
    if(err) throw err
    res.json(rows)
    connection.end()
  })
})


app.listen(port)

