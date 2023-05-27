require('dotenv').config();

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const { PORT = 'https://api.agurchkova.mesto15.nomoredomains.monster' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
};
