require('dotenv').config();

const { createRepresentationalDatabaseEncryptionObject, encryptPassword, decryptPassword } = require('./encryption/representationalDatabaseEncryption');

const representationalDatabaseEncryptionObject = createRepresentationalDatabaseEncryptionObject();

const encryptedPassword = encryptPassword(representationalDatabaseEncryptionObject, process.env.PASSWORD);

decryptPassword(representationalDatabaseEncryptionObject, encryptedPassword);