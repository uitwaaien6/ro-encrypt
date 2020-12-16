const { createRepresentationEncryptionObject, encryptPassword, decryptPassword } = require('./encryption/representationalDatabaseEncryption');

const representationalEncryptionObject = createRepresentationEncryptionObject(3);

const encryptedPassword = encryptPassword(representationalEncryptionObject, 'erw342');

console.log(decryptPassword(representationalEncryptionObject, encryptedPassword));