const {mongoClient} = require("../../config.cjs");

const memberData = mongoClient.db("memberData");

const leaderboards = memberData.collection("leaderboards");
const leaderboardsLTS = memberData.collection("leaderboardsLTS");
const profilePictures = memberData.collection("profilePictures");

async function makeCapped(dbName, colName, capSize) {
    const memberData = await mongoClient.db(dbName);
    let collection = await memberData.collection(colName);
    try {
        const isCapped = await collection.isCapped();
        if (!isCapped) {
            console.log("[OPTIMIZATION] Capping the primary collection.");
            await memberData.command({"convertToCapped": colName, size: 1e15, max: capSize});
            console.log("[OPTIMIZATION] Capping success.");
        }
    } catch (e) {
        console.log("[OPTIMIZATION] Collection not found. Creating a new collection.");
        collection = await memberData.createCollection(colName, {
            capped: true,
            size: 1e15,
            max: capSize,
        });
        console.log("[OPTIMIZATION] Created capped collection.");
    }
    const result = (await collection.stats());
    const resultTrunc = {
        capped: result.capped,
        max: result.max,
        size: result.maxSize,
    }
    console.log(resultTrunc);
}
makeCapped("memberData", "leaderboards", 1);

module.exports = {memberData, leaderboards, profilePictures, leaderboardsLTS};