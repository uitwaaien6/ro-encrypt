function createRepresentationEncryptionObject(complexity) {

    const encryptionLetters = 'qwertyuiopasdfghjklzxcvbnm1234567890?!'.split('');
    const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    const sections = ['apple', 'lemon', 'banana'];

    const representationEncryptionObject = {};

    for (let i = 0; i < letters.length; i++) {

        const letter = letters[i];
        representationEncryptionObject[letter] = {};

        for (let j = 0; j < sections.length; j++) {

            const section = sections[j];
            representationEncryptionObject[letter][section] = [];

            for (let k = 0; k < 3; k++) {
                let encryption = '';

                for (let l = 0; l < complexity; l++) {
                    const randomEncryptionLetter = Math.floor(Math.random() * encryptionLetters.length);
                    encryption = encryption + encryptionLetters[randomEncryptionLetter];
                }

                representationEncryptionObject[letter][section] = representationEncryptionObject[letter][section].concat(encryption);
            }

        }

    }

    return representationEncryptionObject;
}

function encrypPassword(encryptionObject, password) {

    const sections = Object.getOwnPropertyNames(encryptionObject.a);

    const randomSectionIndex = Math.floor(Math.random() * sections.length);
    const choosenSection = sections[randomSectionIndex];

    console.log(choosenSection);

    const passwordLetters = password.split('');

    for (let i = 0; i < passwordLetters.length; i++) {

        const passwordLetter = passwordLetters[i];

        if (encryptionObject[passwordLetter]) {
            console.log(encryptionObject[passwordLetter]);
        }

    }

}


const representationEncryptionObject = createRepresentationEncryptionObject(3);


encrypPassword(representationEncryptionObject, 'abc123');

