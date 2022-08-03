const fetch = require("node-fetch-commonjs");

async function getJSON(url, init) {
    return (await fetch(url, init)).json();
}

module.exports = getJSON;