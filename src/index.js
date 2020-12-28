"use strict";

require('dotenv').config();
const RDE = require('./encryption/representationalDatabaseEncryption');

const key = RDE.createKey(process.env.PASSWORD);
const encryptedPassword = RDE.encrypt(process.env.PASSWORD, key);
const decryptedPassword = RDE.decrypt(encryptedPassword, key);

console.log(encryptedPassword);
console.log(decryptedPassword);
