"use strict";

require('dotenv').config();

const rde = require('./encryption/representationalDatabaseEncryption');

const rdeObject = rde.createRDEObject();

const rdeEncryptedPassword = rde.encryptPassword(rdeObject, process.env.PASSWORD);

console.log(rdeEncryptedPassword);

console.log(rde.decryptPassword(rdeObject, rdeEncryptedPassword));