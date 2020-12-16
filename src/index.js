require('dotenv').config();

const { createRepresentationEncryptionObject, encryptPassword, decryptPassword } = require('./encryption/representationalDatabaseEncryption');

const representationalEncryptionObject = createRepresentationEncryptionObject(3);

const encryptedPassword = encryptPassword(representationalEncryptionObject, process.env.PASSWORD);

console.log(decryptPassword(representationalEncryptionObject, encryptedPassword));