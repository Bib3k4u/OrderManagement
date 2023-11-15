const mysql = require('mysql');

const connection = mysql.createConnection({
    "username": "root",
    "password": "root",
    "database": "postapplication",
    "host": "127.0.0.1",
    "dialect": "mysql"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database');
  }
});

const formPost = (req, res) => {
  const formData = req.body;

  const sql = 'INSERT INTO your_table_name SET ?';

  connection.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error inserting into database: ', err);
      res.status(500).json({ error: 'Error inserting into database' });
    } else {
      console.log('Data inserted into database');
      res.status(200).json({ success: true });
    }
  });
};

module.exports = formPost;
