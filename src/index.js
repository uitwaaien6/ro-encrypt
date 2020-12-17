require('dotenv').config();

const rde = require('./encryption/representationalDatabaseEncryption');

const rde_Object = rde.createRepresentationalDatabaseEncryptionObject(3);
const rde_encryptenData = rde.encryptPassword(rde_Object, process.env.PASSWORD);
const rde_decryptedPassword = rde.decryptPassword(rde_Object, rde_encryptenData);

console.log(rde_decryptedPassword);