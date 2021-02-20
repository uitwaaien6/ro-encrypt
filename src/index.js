"use strict";

require('dotenv').config();
const ROE = require('./encryption/ROEncrypt');

const key = ROE.createKey(process.env.PASSWORD);

const encrypted = ROE.encrypt(process.env.PASSWORD, key);
const decrypted = ROE.decrypt(encrypted, key);

console.log(key);
console.log(` ~ Encrypted: ${encrypted}`);
console.log(` ~ Decrypted: ${decrypted}`);
