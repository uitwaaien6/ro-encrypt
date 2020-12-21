require('dotenv').config();

const rde = require('./encryption/representationalDatabaseEncryption');

//sarmaz
const rde_object = rde.createRDEObject();
const rde_encryptenData = rde.encryptPassword(rde_object, process.env.PASSWORD);
const rde_decryptedPassword = rde.decryptPassword(rde_object, rde_encryptenData);

console.log(rde_decryptedPassword);
