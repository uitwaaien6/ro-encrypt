"use strict";

require('dotenv').config();

const rde = require('./encryption/representationalDatabaseEncryption');

//sarmaz
const rdeObject = rde.createRDEObject();

const rde_encryptedPassword = rde.encryptPassword(rdeObject, process.env.PASSWORD);

console.log(rde.decryptPassword(rdeObject, rde_encryptedPassword));