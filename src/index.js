'use strict';

function createRepresentationEncryptionObject(complexity) {

    const encryptionLetters = 'qwertyuiopasdfghjklzxcvbnm1234567890?!'.split('');
    const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHKLZXCVBNM'.split('');
    const sections = ['apple', 'lemon', 'banana'];

    const representationEncryptionObject = {};

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

                // in here we are iterating through all the sections index in all the properties of the object to avoid the same encryption in the object
                if (representationEncryptionObject[letter] && representationEncryptionObject[letter][section]) {
                    const representationEncryptionObjectProperties = Object.getOwnPropertyNames(representationEncryptionObject);

                    for (let m = 0; m < representationEncryptionObjectProperties.length; m++) {

                        for (let n = 0; n < sections.length; n++) {

                            for (let sectionsIndex = 0; sectionsIndex < 3; sectionsIndex++) {

                                if (representationEncryptionObject[letters[m]][sections[n]]) {
                                    while (encryption === representationEncryptionObject[letters[m]][sections[n]][sectionsIndex]) {
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
    console.log(representationEncryptionObject);
    return representationEncryptionObject;
}

function encryptPassword(encryptionObject, password) {

    const sections = Object.getOwnPropertyNames(encryptionObject.a); // apple, lemon, or banana section, for now it doesnt matter which property we take from the representationalEncryptionObject because they all have the same sections;

    const randomSectionIndex = Math.floor(Math.random() * sections.length);

    const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption

    const passwordLetters = password.split('');

    let encryptedPassword = [];

    for (let i = 0; i < passwordLetters.length; i++) {

        const passwordLetter = passwordLetters[i];

        if (!isNaN(parseInt(passwordLetter))) {
            encryptedPassword = encryptedPassword.concat(passwordLetter);
        } else {
            if (encryptionObject[passwordLetter]) {
                const choosenSectionLength = encryptionObject[passwordLetter][choosenSection].length;
                const randomEncryptionSectionIndex = Math.floor(Math.random() * choosenSectionLength);
                encryptedPassword = encryptedPassword.concat(encryptionObject[passwordLetter][choosenSection][randomEncryptionSectionIndex]);
            }
        }
    }

    console.log({ encryptedPassword, choosenSection })

    return { encryptedPassword, choosenSection }; 
}

function decryptPassword(encryptionObject, encryptenData) {

    const properytNames = Object.getOwnPropertyNames(encryptenData);
    const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHKLZXCVBNM'.split('');

    let decryptedPassword = '';

    if (properytNames && encryptionObject) {
        const encryptedPassword = encryptenData[properytNames[0]]; // encryptedPassword is an Array contains the number and encrypted parts of the password
        const choosenSection = encryptenData[properytNames[1]]; // choosenSection is the section which represents the array which the encryption is stays in

        for (let i = 0; i < encryptedPassword.length; i++) {

            //if (!isNaN(parseInt(encryptedPassword[i]))) {
            //    console.log(encryptedPassword[i]);
            //}

            if (encryptedPassword[i].length === 1 && !isNaN(parseInt(encryptedPassword[i]))) {
                decryptedPassword = decryptedPassword + encryptedPassword[i];
            } else {
                const representationEncryptionObjectProperties = Object.getOwnPropertyNames(representationEncryptionObject);



                for (let j = 0; j < representationEncryptionObjectProperties.length; j++) {

                    encryptionObject[representationEncryptionObjectProperties[j]][choosenSection].find((item, index) => {
                        if (encryptedPassword[i] === item) {
                            
                            
                            decryptedPassword = decryptedPassword + letters[j];
                        }
                    })
                }
            }
        }
    }

    return decryptedPassword;
}

const representationEncryptionObject = createRepresentationEncryptionObject(3);

const encryptenData = encryptPassword(representationEncryptionObject, '918273645Uitwaaien');

decryptPassword(representationEncryptionObject, encryptenData);


module.exports = { createRepresentationEncryptionObject, encryptPassword, decryptPassword };