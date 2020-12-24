"use strict";

require('dotenv').config();
const rde = require('./encryption/representationalDatabaseEncryption');

const rdeObject = rde.createRDEObject();
const rde_encryptedPassword = rde.encryptPassword(rdeObject, 'Basar%Ba#5#LLioz123');
const rde_decryptedPassword = rde.decryptPassword(rdeObject, rde_encryptedPassword);

console.log(rde_encryptedPassword);
console.log(rde_decryptedPassword)