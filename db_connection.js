const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mumuhotpot',
  password: 'password',
  database: 'employee'
});

connection.query('select * from employee', (err,res) =>{
  return console.log(res)
})

modules.export = connection;