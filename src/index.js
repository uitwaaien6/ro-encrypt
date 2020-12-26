"use strict";

require('dotenv').config();

const rde = require('./encryption/representationalDatabaseEncryption');

const rdeKey = rde.createKey();
const rdeEncryptedPassword = rde.encrypt(process.env.PASSWORD, rdeKey);
const rdeDecryptedPassword = rde.decrypt(rdeEncryptedPassword, rdeKey);


