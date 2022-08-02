const Nightmare = require("nightmare");

async function scanCodewarsPFP(cwUserID) {
    return await new Nightmare().goto(`https://www.codewars.com/users/${cwUserID}`)
        .wait("figure.profile-pic > a > img[alt]")
        .evaluate(() => document.querySelector("figure.profile-pic > a > img[alt]").src)
        .end();
}

module.exports = scanCodewarsPFP;