function createRepresentationEncryptionObject(complexity) {

    const encryptionLetters = 'qwertyuiopasdfghjklzxcvbnm1234567890?!'.split('');
    const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    const sections = ['apple', 'lemon', 'banana'];

    const representationEncryptionObject = {};

    for (let i = 0; i < letters.length; i++) {

        const letter = letters[i];
        representationEncryptionObject[letter] = {};

        for (let j = 0; j < sections.length; j++) { // j represents the section configuration, configure a specific section in the belove code

            const section = sections[j];
            representationEncryptionObject[letter][section] = [];

            for (let k = 0; k < 3; k++) { // k represents how many elements should a section have, example ['example1', 'example2', 'example3'];

                let encryption = '';

                for (let l = 0; l < complexity; l++) {
                    const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                    encryption = encryption + encryptionLetters[randomEncryptionLetter];
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

    const sections = Object.getOwnPropertyNames(encryptionObject.a); // apple, lemon, or banana section

    const randomSectionIndex = Math.floor(Math.random() * sections.length);

    const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption

    const passwordLetters = password.split('');

    let encryptedPassword = [];

    for (let i = 0; i < passwordLetters.length; i++) {

        const passwordLetter = passwordLetters[i];


        if (!isNaN(parseInt(passwordLetter))) {
            encryptedPassword = encryptedPassword.concat(passwordLetter);
        }
        

        if (encryptionObject[passwordLetter]) {
            encryptionObject[passwordLetter];
            const choosenSectionLength = encryptionObject[passwordLetter][choosenSection].length;
            const randomEncryptionSectionIndex = Math.floor(Math.random() * choosenSectionLength);
            encryptedPassword = encryptedPassword.concat(encryptionObject[passwordLetter][choosenSection][randomEncryptionSectionIndex]);
        }
    }

    return { encryptedPassword, choosenSection }; 
}


const representationEncryptionObject = createRepresentationEncryptionObject(3);

const encryptenData = encryptPassword(representationEncryptionObject, '1a2b3c');


function decryptPassword(encryptionObject, encryptenData) {
    const properytNames = Object.getOwnPropertyNames(encryptenData);

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
                
            }
        }
    }
}

decryptPassword(representationEncryptionObject, encryptenData);
