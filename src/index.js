const { createRepresentationEncryptionObject, encryptPassword, decryptPassword } = require('./encryption/representationalDatabaseEncryption');

const representationalEncryptionObject = createRepresentationEncryptionObject(3);

const encryptedPassword = encryptPassword(representationalEncryptionObject, '918273645Uitwaaien?!');

console.log(decryptPassword(representationalEncryptionObject, encryptedPassword));