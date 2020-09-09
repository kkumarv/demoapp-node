const bcrypt = require('bcryptjs');



async function comparePass(plainPassword, hashedPassword) {
    if (typeof plainPassword === 'undefined' || typeof hashedPassword === 'undefined') {
        throw new Error('Arguments are require to compare passwords');
    }
    const result = bcrypt.compare(plainPassword, hashedPassword).then((res) => res);
    return result;
}


async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds).then((saltedSalt) => saltedSalt);
    const hash = await bcrypt.hash(plainPassword, salt).then((hashedPw) => hashedPw);
    return hash;
}





const getBearerToken = (header) => {
    if (header) {
        const token = header.split(' ');
        if (token.length === 2) {
            return token[1];
        }
        throw new Error('Malformed bearer token');
    }
    throw new Error('Missing authorization header');
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomString = (len) => {
    const buf = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charlen = chars.length;

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

module.exports = {
    randomString,
    comparePass,
    hashPassword,
    getBearerToken,
};
