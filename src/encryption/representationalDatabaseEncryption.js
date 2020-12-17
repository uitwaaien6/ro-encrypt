'use strict';

const chalk = require('chalk');

function createRDEObject(complexity = 4) {

    const encryptionLetters = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split('');
    const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
    const sections = ['apple', 'lemon', 'banana'];

    const representationEncryptionObject = {};

    if (complexity <= 2) {
        for (let i = 0; i < letters.length; i++) {
            representationEncryptionObject[letters[i]] = {};

            for (let j = 0; j < sections.length; j++) {

                representationEncryptionObject[letters[i]][sections[j]] = [];
            }
        }

        console.error(chalk.red(' ! Complexity argument of the createEncryptionObject cannot be belov or equal to 2'));
        console.log(' ~ Creating an empty Encryption Object...');
        console.log(chalk.yellow(' ! Recommended complexity number is 4 or above'));
        return representationEncryptionObject;
    }

    for (let i = 0; i < letters.length; i++) {

        const letter = letters[i];
        representationEncryptionObject[letter] = {};

        for (let j = 0; j < sections.length; j++) { // j represents the section configuration, configure a specific section in the belove code.


            const section = sections[j];
            representationEncryptionObject[letter][section] = [];

            for (let k = 0; k < 3; k++) { // k represents how many elements should a section have, example ['example1', 'example2', 'example3'];

                let encryption = '';

                for (let l = 0; l < complexity; l++) {
                    const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                    encryption = encryption + encryptionLetters[randomEncryptionLetter];
                }

                // in here we are iterating through all the sections index in all the properties of the object to avoid the same encryption in the object properties, doesnt matter if we get same encryption in the same properties array but we change it due to syntax
                // but if we get same encryption in different properties of the representationObject password will be decrypted wrongly.
                // because it will take the first property letter of the representaionObject when it is matched with the encryptedPassword so
                // all the properties has to have unique encryptions in it, doesnt matter if we get same in sections though.
                if (representationEncryptionObject[letter] && representationEncryptionObject[letter][section]) {
                    const representationEncryptionObjectProperties = Object.getOwnPropertyNames(representationEncryptionObject);

                    for (let m = 0; m < representationEncryptionObjectProperties.length; m++) {

                        for (let n = 0; n < sections.length; n++) {

                            for (let sectionsIndex = 0; sectionsIndex < 3; sectionsIndex++) {

                                if (representationEncryptionObject[letters[m]][sections[n]]) {
                                    while (encryption === representationEncryptionObject[letters[m]][sections[n]][sectionsIndex]) {
                                        /*
                                        console.log(` ~ Same Encryption Found in: `, chalk.yellow(letters[m]));
                                        console.log(` ~ Section: `, chalk.yellow(sections[n]));
                                        console.log(` ~ Array:`, representationEncryptionObject[letters[m]][sections[0]], ` Index:`, chalk.yellow(sectionsIndex));
                                        */
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

                representationEncryptionObject[letter][section] = representationEncryptionObject[letter][section].concat(encryption);
                encryption = '';
            }
        }
    }

    return representationEncryptionObject;
}



function encryptPassword(encryptionObject, password) {

    if (encryptionObject && password) {
        const encryptionObjectProperties = Object.getOwnPropertyNames(encryptionObject);

        const sections = Object.getOwnPropertyNames(encryptionObject.a); // apple, lemon, or banana section, for now it doesnt matter which property we take from the representationalEncryptionObject because they all have the same sections;
    
        const randomSectionIndex = Math.floor(Math.random() * sections.length);
    
        const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption
    
        const passwordLetters = password.split('');
    
        let encryptedPassword = [];
    
        for (let i = 0; i < encryptionObjectProperties.length; i++) {
            for (let j = 0; j < sections.length; j++) {
                
                if (encryptionObject[encryptionObjectProperties[i]][sections[j]].length === 0) {
                    console.error(chalk.red(' ! One or more array in sections of the encryptionObject is empty'));
                    console.error(chalk.red(' ! Returning null...'));
                    return null;
                }
            }
        }
    
        for (let i = 0; i < passwordLetters.length; i++) {
    
            const passwordLetter = passwordLetters[i];

            // if passwordLetter is number or question mark or exclamation mark put it to the encryptedPassword as is, will improve in the future
            // ! Security vulnerability because if a person has a password that contains only numbers it will not be encrypted.
            if (!isNaN(parseInt(passwordLetter)) || passwordLetter === '?' || passwordLetter === '!') {
                encryptedPassword = encryptedPassword.concat(passwordLetter);
            } else {
                if (encryptionObject[passwordLetter]) {
                    // here we are choosing a random encryption from the choosenSection array of the passwordLetter of the encryptionObject
                    const choosenSectionLength = encryptionObject[passwordLetter][choosenSection].length;
                    const randomEncryptionSectionIndex = Math.floor(Math.random() * choosenSectionLength);
                    encryptedPassword = encryptedPassword.concat(encryptionObject[passwordLetter][choosenSection][randomEncryptionSectionIndex]);
                } else {
                    
                    console.error(chalk.red(` ! password Letter couldnt be found while encrypting password in encryptPassword`));
                    console.error(chalk.red(` ! The letter couldnt be found is ${passwordLetter}`));
                }
            }
        }
    
        return { encryptedPassword, choosenSection }; 
    } else {
        console.error(chalk.red(' ! encryptionObject or password couldnt be found'));
        return null;
    }

}



function decryptPassword(encryptionObject, encryptenData) {

    if (encryptionObject && encryptenData) {

        const sections = ['apple', 'lemon', 'banana'];

        let decryptedPassword = '';

        const encryptenDataProperties = Object.getOwnPropertyNames(encryptenData);

        const encryptedPassword = encryptenData[encryptenDataProperties[0]]; // encryptedPassword is an Array contains the number and encrypted parts of the password
        const choosenSection = encryptenData[encryptenDataProperties[1]]; // choosenSection is the section which represents the array which the encryption is stays in

        for (let i = 0; i < encryptedPassword.length; i++) {     
            // TODO checking every element of the encryptedPassword which is an array, if it is number or question mark or exclamation mark put it as is. fix later

            //if (!isNaN(parseInt(encryptedPassword[i]))) {
            //    console.log(encryptedPassword[i]);
            //}


            // iterating through all the elements of the encryptedPassword array, if the element we iterate through has 1 length and if it is number
            // when we conver it to int with parseInt, it means that it is a number so we put the element as is into to decryptedPassword.
            if (encryptedPassword[i].length === 1 && !isNaN(parseInt(encryptedPassword[i])) || encryptedPassword[i] === '?' || encryptedPassword[i] === '!') {
                decryptedPassword = decryptedPassword + encryptedPassword[i];
            } else { // if it is encrypted which means random characters that is more than 1 caharacter usually
                const encryptionObjectProperties = Object.getOwnPropertyNames(encryptionObject);

                for (let j = 0; j < encryptionObjectProperties.length; j++) {

                    if (choosenSection) {

                        // search through the choosenSections to find the representational encryptions
                        encryptionObject[encryptionObjectProperties[j]][choosenSection].find((item, index) => {
                            if (encryptedPassword[i] === item) {
                                
                                // iterating through every single properties of the encryptionObject which are letters like a, b, b
                                // if item in the choosenSection is match with the encryptedPasswords elements it means that is the letter
                                // so it is the same thing we cane take that property from the encryptionObjectProperties array becasue we already
                                // iterating through it in order to look all the letters of the encryptionObject.
                                decryptedPassword = decryptedPassword + encryptionObjectProperties[j];
                            }
                        });

                    } else {
                        // if the encryptenData has no choosenSection iterate through every sections of the encryptenObject to find the encryptions
                        // it doesnt make sense I know, because why whould we include the choosenSection in the encryptenData.
                        // well I believe it makes the program more secure.
                        for (let k = 0; k < sections.length; k++) {

                            
                            encryptionObject[encryptionObjectProperties[j]][sections[k]].find((item, index) => {
                                if (encryptedPassword[i] === item) {
                                    
                                    decryptedPassword = decryptedPassword + encryptionObjectProperties[j];
                                }
                            });
                            
                        }

                    }
                }
            }
        }

        return decryptedPassword;
    } else {
        console.error(chalk.red(' ! encryptionObject or encryptenData couldnt be found'));
        return null;
    }

}

module.exports = { createRDEObject, encryptPassword, decryptPassword };
