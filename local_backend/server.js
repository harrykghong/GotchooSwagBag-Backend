
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'mytestuser',
  password: 'My6$Password',
  database: 'Sponsor_info'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});


// Fetch sponsors
app.get('/sponsors', (req, res) => {
  const query = 'SELECT * FROM sponsors';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Fetch physical gifts
app.get('/physicalgifts', (req, res) => {
  const query = `
  SELECT 
    gifts.id, 
    gifts.gift_name, 
    gifts.description, 
    gifts.logo, 
    gifts.redeem_link,
    gifts.gift_type,
    sponsors.name AS sponsor_name,
    sponsors.logo AS sponsor_logo
  FROM 
    gifts
  INNER JOIN 
    swag_bag ON gifts.id = swag_bag.gift_id
  INNER JOIN 
    events ON swag_bag.event_id = events.id
  LEFT JOIN 
    sponsors ON gifts.sponsor_id = sponsors.id
  WHERE 
    gifts.gift_type = 'physical' AND 
    events.id = 1 AND 
    swag_bag.id = 1;
 `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Fetch digitalgifts
app.get('/digitalgifts', (req, res) => {
  const query = `
  SELECT 
    gifts.id, 
    gifts.gift_name, 
    gifts.description, 
    gifts.logo, 
    gifts.redeem_link,
    gifts.gift_type,
    sponsors.name AS sponsor_name,
    sponsors.logo AS sponsor_logo
  FROM 
    gifts
  INNER JOIN 
    swag_bag ON gifts.id = swag_bag.gift_id
  INNER JOIN 
    events ON swag_bag.event_id = events.id
  LEFT JOIN 
    sponsors ON gifts.sponsor_id = sponsors.id
  WHERE 
    gifts.gift_type = 'digital' AND 
    events.id = 1 AND 
    swag_bag.id = 1;
 `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Fetch conference
app.get('/host', (req, res) => {
  const query = `
 SELECT events.Event_Name, events.picture_link
 From events  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// insert shipping info to database
app.post('/shipping-info', (req, res) => {
  const { first_name, last_name, address1, address2, city, state, zip, country } = req.body;
  const query = 'INSERT INTO shipping_information (first_name, last_name, address1, address2, city, which_state, zip, country) VALUES (?,?,?,?,?,?,?,?)';
  db.query(query, [first_name, last_name, address1, address2, city, state, zip, country], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }

    if (results.affectedRows === 1) {
      res.status(201).json({ message: 'Shipping information saved successfully' });
    } else {
      res.status(400).json({ message: 'Insert failed, no rows affected.' });
    }
  });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));