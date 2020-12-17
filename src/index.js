require('dotenv').config();

const { createRepresentationEncryptionObject, encryptPassword, decryptPassword } = require('./encryption/representationalDatabaseEncryption');

const representationalEncryptionObject = createRepresentationEncryptionObject();

const encryptedPassword = encryptPassword(representationalEncryptionObject, process.env.PASSWORD);

decryptPassword(representationalEncryptionObject, encryptedPassword);