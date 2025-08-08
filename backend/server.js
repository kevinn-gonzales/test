//js file to handle server-side logic for the signup and login pages

//express handles routing
const express = require("express");

//connects to the MySQL database
const mysql = require("mysql2");

//cors allows cross-origin requests
const cors = require("cors");

//body-parser parses incoming request bodies
const bodyParser = require("body-parser");

//bcrypt is used for hashing passwords
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database");
});



//SIGNUP
app.post('/signup', async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, password, firstname, lastname) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, firstname, lastname],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username already exists');
          return res.status(500).send('Signup error');
        }
        res.send('Signup successful');
      }
    );
  } catch (err) {
    res.status(500).send('Server error');
  }
});




// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) return res.status(500).send('Login error');
      if (results.length === 0) return res.status(401).send('Invalid credentials');

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) res.send('Login successful');
      else res.status(401).send('Invalid credentials');
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('🚀 Server running on http://localhost:3000'));