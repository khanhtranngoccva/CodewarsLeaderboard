const {profilePictures, leaderboards} = require("../database/collections.cjs");
const scanCodewarsPFP = require("./scanCodewarsPFP.cjs");

async function updatePFPURLs() {
    try {
        const currentTime = new Date();
        let threshold = 86400 * 5 * 1000;
        let lookupCounter = 0;
        let maxLookups = 30;

        async function checkID(id) {
            const result = await profilePictures.findOne({id});
            if (!result || currentTime - result.updatedAt >= threshold) {
                lookupCounter++;
                const profilePictureURL = await scanCodewarsPFP(id);
                const result = {
                    id: id,
                    updatedAt: currentTime,
                    profilePictureURL
                };
                await profilePictures.updateOne({
                    id: id,
                }, {
                    $set: result,
                }, {
                    upsert: true,
                });
            }
        }

        const userData = await leaderboards.find().toArray();
        const currentLeaderboard = userData.reverse()[0].userData;

        // 8 max threads.
        const threadPools = [];
        for (let user of currentLeaderboard) {
            threadPools.push(checkID(user.id));
            if (threadPools.length >= 8) {
                await Promise.all(threadPools);
                threadPools.length = 0;
            }
            if (lookupCounter >= maxLookups) {
                console.log("[SITE_QUERY] Scan finished.");
                return;
            }
        }
        console.log("[SITE_QUERY] Scan finished.");
    } catch (e) {
        console.log("[SITE_QUERY] Scan failed. Retrying later.");
    }
}


module.exports = {updatePFPURLs};
