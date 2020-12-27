"use strict";

const chalk = require('chalk');

function createKey(complexity = 3) {

    console.log(` ~ Initalizing KEY OBJECT...`);

    const encryptionLetters = '12345678901234567890qwertyuiopasdfghjklzxcvbnm'.toUpperCase().split('');

    const sectionNameEncryptionLetters = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase().split('');

    let letters = '';

    for (let i = 0; i < 400; i++) {
        letters += String.fromCharCode(i);
    }

    letters = letters.split('');

    let createdSections = [];

    for (let i = 0; i < complexity * 3; i++) {

        let sectionNameEncryption = '';
        
        for (let j = 0; j < complexity * 4; j++) {
            
            const randomSectionNameEncryptionIndex = Math.floor(Math.random() * sectionNameEncryptionLetters.length);
            sectionNameEncryption += sectionNameEncryptionLetters[randomSectionNameEncryptionIndex];
            
        }

        for (let j = 0; j < complexity; j++) { 

            while (sectionNameEncryption === createdSections[j]) {
                sectionNameEncryption = '';

                for (let k = 0; k < complexity * 4; k++) {
                    const randomSectionNameEncryptionIndex = Math.floor(Math.random() * sectionNameEncryptionLetters.length);
                    sectionNameEncryption += sectionNameEncryptionLetters[randomSectionNameEncryptionIndex];
                }
            }
            
        }

        createdSections = createdSections.concat(sectionNameEncryption);
    }

    const sections = [...createdSections];

    const keyObject = {};

    if (complexity <= 2 || complexity >= 5) {
        for (let i = 0; i < letters.length; i++) {
            keyObject[letters[i]] = {};

            for (let j = 0; j < sections.length; j++) {

                keyObject[letters[i]][sections[j]] = [];
            }
        }

        console.error(chalk.red(' ! Complexity argument of the createKey cannot be belov 2 or above 4'));
        console.log(' ~ Creating an empty Key Object...');
        console.log(chalk.yellow(' ! Recommended complexity number is 4 or above, default complexity number is set to 3'));
        return null;
    }

    for (let i = 0; i < letters.length; i++) {

        const letter = letters[i];
        keyObject[letter] = {};

        for (let j = 0; j < sections.length; j++) { // j represents the section configuration, configure a specific section in the belove code.


            const section = sections[j];
            keyObject[letter][section] = [];

            for (let k = 0; k < complexity * 2; k++) { // k represents how many elements should a section have, example: sectionName: ['SDF', 'SDF', 'SDFD'];

                let encryption = '';

                for (let l = 0; l < complexity * 2; l++) {
                    const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                    encryption = encryption + encryptionLetters[randomEncryptionLetter];
                }

                // in here we are iterating through all the sections index in all the properties of the object to avoid the same encryption in the object properties, doesnt matter if we get same encryption in the same properties array but we change it due to syntax
                // but if we get same encryption in different properties of the representationObject password will be decrypted wrongly.
                // because it will take the first property letter of the representaionObject when it is matched with the encryptedPassword so
                // all the properties has to have unique encryptions in it.
                if (keyObject[letter] && keyObject[letter][section]) {
                    const keyObjectProperties = Object.getOwnPropertyNames(keyObject);

                    for (let m = 0; m < keyObjectProperties.length; m++) {

                        for (let n = 0; n < sections.length; n++) {

                            for (let sectionsIndex = 0; sectionsIndex < 4; sectionsIndex++) {

                                if (keyObject[letters[m]][sections[n]]) {
                                    while (encryption === keyObject[letters[m]][sections[n]][sectionsIndex]) {
                                        // development purposes
                                        console.log(` ~ Same Encryption Found in: `, chalk.yellow(letters[m]));
                                        console.log(` ~ Section: `, chalk.yellow(sections[n]));
                                        console.log(` ~ Array:`, keyObject[letters[m]][sections[0]], ` Index:`, chalk.yellow(sectionsIndex));
                                        
                                        encryption = '';
                                        for (let l = 0; l < complexity; l++) {
                                            const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                                            encryption = encryption + encryptionLetters[randomEncryptionLetter];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                keyObject[letter][section] = keyObject[letter][section].concat(encryption);
                encryption = '';
            }
        }
    }

    return Object.freeze({ ...keyObject });
}

function encrypt(password, keyObject) {

    if (keyObject && password) {

        password = password.toString();

        //console.log(` ~ Encrypting password...`);

        const keyObjectProperties = Object.getOwnPropertyNames(keyObject);

        const sections = Object.getOwnPropertyNames(keyObject[keyObjectProperties[0]]); // apple, lemon, or banana section, for now it doesnt matter which property we take from the representationalkeyObject because they all have the same sections;

        const randomSectionIndex = Math.floor(Math.random() * sections.length);
        const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption

        const complexity = keyObject[keyObjectProperties[0]][choosenSection][0].length;

        let encryptedPassword = ''; 
    
        for (let i = 0; i < keyObjectProperties.length; i++) {
            for (let j = 0; j < sections.length; j++) {
                
                if (keyObject[keyObjectProperties[i]][sections[j]].length === 0) {
                    console.error(chalk.red(' ! One or more array in sections of the keyObject is empty'));
                    console.error(chalk.red(' ! Returning null...'));
                    return null;
                }
            }
        }
    
        for (let i = 0; i < password.length; i++) {

            const passwordLetter = password[i]; 

            for (let j = 0; j < keyObjectProperties.length; j++) {

                const keyObjectProperty = keyObjectProperties[j];

                if (passwordLetter === keyObjectProperty) {

                    // here we are choosing a random encryption from the choosenSection array of the passwordLetter of the keyObject
                    // the length of the choosen section
                    const choosenSectionLength = keyObject[`${keyObjectProperty}`][choosenSection].length;
                    const randomIndex = Math.floor(Math.random() * choosenSectionLength);
                    encryptedPassword = encryptedPassword + keyObject[`${keyObjectProperty}`][choosenSection][randomIndex];

                } 

            }
        }

        //console.log(` ~ Encrypting password is done...`);
    
        return `rde${complexity}.${encryptedPassword}`; 
    } else {
        console.error(chalk.red(' ! keyObject or password couldnt be found'));
        return null;
    }

}

function decrypt(encryptedPassword, keyObject) {

    if (keyObject && encryptedPassword) {

        //console.log(` ~ Decrypting password...`);

        let decryptedPassword = '';
        const keyObjectProperties = Object.getOwnPropertyNames(keyObject);
        const sectionProperties = Object.getOwnPropertyNames(keyObject[keyObjectProperties[0]]);
        const encryptedPasswordSections = encryptedPassword.split('.');
        const complexity = parseInt(encryptedPasswordSections[0].match(/\d+/)[0]);
        encryptedPassword = encryptedPasswordSections[1];
        // const choosenSection = encryptedPasswordSections[2]; removed

        for (let i = 0; i <= encryptedPassword.length ; i++) {

            if (i % complexity === 0) {

                // extract the encryption from the encryptedPassword by seeking through with the coefficients of the complexity

                const extractedEncryption = encryptedPassword.substr(i, complexity);

                for (let j = 0; j < keyObjectProperties.length; j++) {

                    for (let k = 0; k < sectionProperties.length; k++) {
                        
                        keyObject[keyObjectProperties[j]][sectionProperties[k]].find((item, index) => {

                            if (extractedEncryption === item) {
    
                                decryptedPassword += keyObjectProperties[j];
                            }
                        });
                    }
                }
            }
        }

        //console.log(` ~ Decrypting password is done...`);

        return decryptedPassword;
    } else {
        console.error(chalk.red(' ! keyObject or encrypted password couldnt be found'));
        return null;
    }

}

module.exports = { createKey, encrypt, decrypt };

