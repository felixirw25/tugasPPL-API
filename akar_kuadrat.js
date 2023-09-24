// Import necessary libraries
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the CORS library

const app = express();
const port = 3306;

// Enable CORS for all routes
app.use(cors());

// Database configuration
const dbConfig = {
  host: 'sql12.freesqldatabase.com',
  user: 'sql12647777',
  password: 'EFPDG6CIrK',
  database: 'sql12647777',
};

// Create a database connection pool
const pool = mysql.createPool(dbConfig);

// API endpoint to receive numbers from the URL, calculate the square root, and insert into the database
app.get('/api/calculateSquareRoot', (req, res) => {
  const numbers = parseFloat(req.query.numbers);

  if (isNaN(numbers)) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const squareRoot = Math.sqrt(numbers);

  // Insert the calculated square root into the database
  pool.query('INSERT INTO tb_sqnumbers (numbers, sqnumber) VALUES (?, ?)', [numbers, squareRoot], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({ result: squareRoot });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
