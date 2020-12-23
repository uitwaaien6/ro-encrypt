"use strict";

const chalk = require('chalk');

function createRDEObject(complexity = 4) {

    const encryptionLetters = '1234567890qwertyuiopasdfghjklzxcvbnm1234567890'.split('');

    const letters = 'chr_q,chr_w,chr_e,chr_r,chr_t,chr_y,chr_u,chr_i,chr_o,chr_p,chr_a,chr_s,chr_d,chr_f,chr_g,chr_h,chr_j,chr_k,chr_l,chr_z,chr_x,chr_c,chr_v,chr_b,chr_n,chr_m,chr_Q,chr_W,chr_E,chr_R,chr_T,chr_Y,chr_U,chr_I,chr_O,chr_P,chr_A,chr_S,chr_D,chr_F,chr_G,chr_H,chr_J,chr_K,chr_L,chr_Z,chr_X,chr_C,chr_V,chr_B,chr_N,chr_M,chr_1,chr_2,chr_3,chr_4,chr_5,chr_6,chr_7,chr_8,chr_9,chr_0,chr_questionMark,chr_exclamationMark,chr_atSign,chr_dollarSign,chr_percentSign,chr_numberSign,chr_ampersand,chr_multiplicationSign,chr_divisionSign,chr_plusSign,chr_minusSign,chr_underscore'.split(',');

    const sections = ['apple', 'lemon', 'banana'];

    const rdeObject = {};

    if (complexity <= 2) {
        for (let i = 0; i < letters.length; i++) {
            rdeObject[letters[i]] = {};

            for (let j = 0; j < sections.length; j++) {

                rdeObject[letters[i]][sections[j]] = [];
            }
        }

        console.error(chalk.red(' ! Complexity argument of the createrdeObject cannot be belov or equal to 2'));
        console.log(' ~ Creating an empty Encryption Object...');
        console.log(chalk.yellow(' ! Recommended complexity number is 4 or above'));
        return rdeObject;
    }

    for (let i = 0; i < letters.length; i++) {

        const letter = letters[i];
        rdeObject[letter] = {};

        for (let j = 0; j < sections.length; j++) { // j represents the section configuration, configure a specific section in the belove code.


            const section = sections[j];
            rdeObject[letter][section] = [];

            for (let k = 0; k < 3; k++) { // k represents how many elements should a section have, example ['example1', 'example2', 'example3'];

                let encryption = '';

                for (let l = 0; l < complexity; l++) {
                    const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                    encryption = encryption + encryptionLetters[randomEncryptionLetter];
                }

                // in here we are iterating through all the sections index in all the properties of the object to avoid the same encryption in the object properties, doesnt matter if we get same encryption in the same properties array but we change it due to syntax
                // but if we get same encryption in different properties of the representationObject password will be decrypted wrongly.
                // because it will take the first property letter of the representaionObject when it is matched with the encryptedPassword so
                // all the properties has to have unique encryptions in it.
                if (rdeObject[letter] && rdeObject[letter][section]) {
                    const rdeObjectProperties = Object.getOwnPropertyNames(rdeObject);

                    for (let m = 0; m < rdeObjectProperties.length; m++) {

                        for (let n = 0; n < sections.length; n++) {

                            for (let sectionsIndex = 0; sectionsIndex < 4; sectionsIndex++) {

                                if (rdeObject[letters[m]][sections[n]]) {
                                    while (encryption === rdeObject[letters[m]][sections[n]][sectionsIndex]) {
                                        // development purposes
                                        console.log(` ~ Same Encryption Found in: `, chalk.yellow(letters[m]));
                                        console.log(` ~ Section: `, chalk.yellow(sections[n]));
                                        console.log(` ~ Array:`, rdeObject[letters[m]][sections[0]], ` Index:`, chalk.yellow(sectionsIndex));
                                        
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

                rdeObject[letter][section] = rdeObject[letter][section].concat(encryption);
                encryption = '';
            }
        }
    }

    return rdeObject;
}



function encryptPassword(rdeObject, password) {

    if (rdeObject && password) {

        const rdeObjectProperties = Object.getOwnPropertyNames(rdeObject);

        const sections = Object.getOwnPropertyNames(rdeObject[rdeObjectProperties[0]]); // apple, lemon, or banana section, for now it doesnt matter which property we take from the representationalrdeObject because they all have the same sections;

        const randomSectionIndex = Math.floor(Math.random() * sections.length);
        const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption

        const complexity = rdeObject[rdeObjectProperties[0]][choosenSection][0].length;
    
        const specialChars = '!@#$%&*+_?';

        let encryptedPassword = '';
    
        for (let i = 0; i < rdeObjectProperties.length; i++) {
            for (let j = 0; j < sections.length; j++) {
                
                if (rdeObject[rdeObjectProperties[i]][sections[j]].length === 0) {
                    console.error(chalk.red(' ! One or more array in sections of the rdeObject is empty'));
                    console.error(chalk.red(' ! Returning null...'));
                    return null;
                }
            }
        }
    
        for (let i = 0; i < password.length; i++) {
    

            const passwordLetter = password[i]; 
            
            for (let j = 0; j < specialChars.length; j++) {

                if (passwordLetter === specialChars[j]) {

                    const rdeObjectPropertyDivision = rdeObjectProperties[0].split('_');

                    const rdeObjectPropertySymbol = rdeObjectPropertyDivision[0];
                    const rdeObjectPropertyLetter = rdeObjectPropertyDivision[1];

                    // here we are filterin which special character is represents its name and we are encrypting that specific property of the rdeObject because we cannot specical character as a property name of the javascript object (rdeObject)

                    switch (passwordLetter) {
                        case '?':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_questionMark`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_questionMark`][choosenSection].length)];
                            break;
                        case '!':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_exclamationMark`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_exclamationMark`][choosenSection].length)];
                            break;
                        case '@':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_atSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_atSign`][choosenSection].length)];
                            break;
                        case '$':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_dollarSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_dollarSign`][choosenSection].length)];
                            break;
                        case '%':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_percentSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_percentSign`][choosenSection].length)];
                            break;
                        case '#':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_numberSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_numberSign`][choosenSection].length)];
                            break;
                        case '&':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_ampersand`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_ampersand`][choosenSection].length)];
                            break;
                        case '*':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_multiplicationSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_multiplicationSign`][choosenSection].length)];
                            break;
                        case '/':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_divisionSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_divisionSign`][choosenSection].length)];
                            break;
                        case '+':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_plusSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_plusSign`][choosenSection].length)];
                            break;
                        case '-':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_minusSign`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_minusSign`][choosenSection].length)];
                            break;
                        case '_':
                            encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_underscore`][choosenSection][Math.floor(Math.random() * rdeObject[`${rdeObjectPropertySymbol}_underscore`][choosenSection].length)];
                            break;
                        default:
                            break;
                    }
                }
                
            }

            for (let j = 0; j < rdeObjectProperties.length; j++) {

                // here we are iterating through all the properties of the rdeObject and dividing their sections to two part
                // for example rdeObjectPropertyDivision is possible to look like:
                //                      ['chr', 'a']  
                const rdeObjectPropertyDivision = rdeObjectProperties[j].split('_');

                const rdeObjectPropertySymbol = rdeObjectPropertyDivision[0];
                const rdeObjectPropertyLetter = rdeObjectPropertyDivision[1];

                if (passwordLetter === rdeObjectPropertyLetter) {

                    // here we are choosing a random encryption from the choosenSection array of the passwordLetter of the rdeObject
                    // the length of the choosen section
                    const choosenSectionLength = rdeObject[`${rdeObjectPropertySymbol}_${passwordLetter}`][choosenSection].length;
                    const randomIndex = Math.floor(Math.random() * choosenSectionLength);
                    encryptedPassword = encryptedPassword + rdeObject[`${rdeObjectPropertySymbol}_${passwordLetter}`][choosenSection][randomIndex];

                } 


            }
        }
    
        return `rde${complexity}.${encryptedPassword}`; 
    } else {
        console.error(chalk.red(' ! rdeObject or password couldnt be found'));
        return null;
    }

}



function decryptPassword(rdeObject, encryptedPassword) {

    if (rdeObject && encryptedPassword) {

        let decryptedPassword = '';

        const rdeObjectProperties = Object.getOwnPropertyNames(rdeObject);

        const sections = Object.getOwnPropertyNames(rdeObject[rdeObjectProperties[0]])

        const encryptedPasswordSections = encryptedPassword.split('.');

        const complexity = parseInt(encryptedPasswordSections[0].match(/\d+/)[0]);

        encryptedPassword = encryptedPasswordSections[1];

        console.log(encryptedPassword);

        for (let i = 0; i <= encryptedPassword.length ; i++) {

            if (i % complexity === 0) {

                // extract the encryption from the encryptedPassword by seeking through with the coefficients of the complexity

                const extractedEncryption = encryptedPassword.substr(i, complexity);

                for (let j = 0; j < rdeObjectProperties.length; j++) {
                    
                    for (let l = 0; l < sections.length; l++) {

                        rdeObject[rdeObjectProperties[j]][sections[l]].find((item, index) => {
                            if (extractedEncryption === item) {

                                const decryptedChar = rdeObjectProperties[j].split('_')[1];

                                switch (decryptedChar) {
                                    case 'questionMark':
                                        decryptedPassword += '?';
                                        break;
                                    case 'exclamationMark':
                                        decryptedPassword += '!';
                                        break;
                                    case 'atSign':
                                        decryptedPassword += '@';
                                        break;
                                    case 'dollarSign':
                                        decryptedPassword += '$';
                                        break;
                                    case 'percentSign':
                                        decryptedPassword += '%';
                                        break;
                                    case 'numberSign':
                                        decryptedPassword += '#';
                                        break;
                                    case 'ampersand':
                                        decryptedPassword += '&';
                                        break;
                                    case 'multiplicationSign':
                                        decryptedPassword += '*';
                                        break;
                                    case 'divisionSign':
                                        decryptedPassword += '/';
                                        break;
                                    case 'plusSign':
                                        decryptedPassword += '+';
                                        break;
                                    case 'minus':
                                        decryptedPassword += '-';
                                        break;
                                    default:
                                        decryptedPassword += decryptedChar;
                                        break;
                                }
                                
                            }
                        });

                    }

                }

            }

        }

        return decryptedPassword;
    } else {
        console.error(chalk.red(' ! rdeObject or encryptedPassword couldnt be found'));
        return null;
    }

}


module.exports = { createRDEObject, encryptPassword, decryptPassword };
