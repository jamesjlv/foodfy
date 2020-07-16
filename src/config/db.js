const {
  Pool
} = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: "014352",
  host: "localhost",
  port: 5432,
  database: "foodfy"
})