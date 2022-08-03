const CLAN_NAME = '#100Devs - leonnoel.com/twitch';

const getJSON = require("./getJSON.cjs");
const {leaderboards, leaderboardsLTS, memberData} = require("./collections.cjs");

async function synchronize() {
    let result = [];

    console.log("[SYNC] Synchronizing with Codewars.");

    // Page 1.
    const firstPageURL = `https://www.codewars.com/api/v1/clans/${encodeURIComponent(CLAN_NAME)}/members`;
    const firstPage = await getJSON(firstPageURL);
    const totalPages = firstPage["totalPages"];
    result.push(...firstPage.data);

    console.log("[SYNC] First response received.");

    // Subsequent pages.
    let requests = [];
    for (let i = 2; i <= totalPages; i++) {
        const currentPageURL = `https://www.codewars.com/api/v1/clans/${encodeURIComponent(CLAN_NAME)}/members?page=${i}`;
        requests.push(getJSON(currentPageURL));
    }

    // Responses for subsequent pages.
    const subsequentPagesData = (await Promise.all(requests)).map(json => json.data);
    subsequentPagesData.forEach(jsonData => {
        result.push(...jsonData);
    });

    console.log("[SYNC] All responses received.");

    const leaderboard = {
        updatedAt: new Date().getTime(),
        userData: result,
    };

    await leaderboards.insertOne(leaderboard);
    await leaderboardsLTS.insertOne(leaderboard);

    console.log("[SYNC] Synchronization success.");
}

module.exports = {synchronize};