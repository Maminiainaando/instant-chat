const { Pool } = require('pg');
const pool = new Pool({
user: 'chat',
host: 'localhost',
database: 'chat_app',
password: '1234',
port: 5432,
});
module.exports = pool;