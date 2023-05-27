/* eslint no-useless-escape: "error" */
const RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const OK = 200;
const STATUS_BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const STATUS_NOT_FOUND = 404;
const STATUS_ETERNAL_SERVER_ERROR = 404;
const CONFLICT = 409;

const allowedCors = [
  'http://agurchkova.mesto15.nomoredomains.monster',
  'https://agurchkova.mesto15.nomoredomains.monster',
  'http://158.160.101.12',
  'https://158.160.101.12',
  'http://localhost:3000',
  'https://localhost:3000',
];

// allowed methods
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  OK,
  RegExp,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_ETERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
