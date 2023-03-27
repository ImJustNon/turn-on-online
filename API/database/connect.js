const path = require("path");
const sqlite3 = require('better-sqlite3');
const db = sqlite3(path.join(__dirname + '/../database.sqlite'));

module.exports = db;