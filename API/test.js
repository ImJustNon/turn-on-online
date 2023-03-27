const path = require("path");
const sqlite3 = require('better-sqlite3');
const db = sqlite3(path.join(__dirname + '/database.sqlite'));

// Create a table
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');

// Insert data into the table
const insert = db.prepare('INSERT INTO users (name) VALUES (?)');
insert.run('John');
insert.run('Jane');

// Retrieve data from the table
const rows = db.prepare('SELECT * FROM users').all();
console.log(rows);

// Close the connection
db.close();