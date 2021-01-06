"use strict";

require('dotenv').config();
const RDE = require('./encryption/representationalDatabaseEncryption');

const key = RDE.createKey(process.env.PASSWORD);

const encrypted = RDE.encrypt(process.env.PASSWORD, key);
const decrypted = RDE.decrypt(encrypted, key);

console.log(` ~ Encrypted: ${encrypted}`);
console.log(` ~ Decrypted: ${decrypted}`);
