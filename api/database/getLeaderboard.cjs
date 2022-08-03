const {leaderboards} = require("./collections.cjs");
const {performance} = require("perf_hooks");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectId;

async function getCurrentLeaderboard(req, res) {
    // Can be "honor", "score" and "languages";
    const criteria1 = req.query["criteria1"] ?? "honor";
    const criteria2 = req.query["criteria2"] ?? "javascript";
    const forceReload = req.query["forceReload"] ?? false;
    let page = req.query["page"] ?? 0;
    const leaderboardID = req.query["leaderboardID"];
    page = +page;

    let sliceArgs;
    if (!page) sliceArgs = [undefined];
    else sliceArgs = [(page - 1) * 100, page * 100];

    const startTime = performance.now();
    const latestLeaderboard = await leaderboards.findOne(leaderboardID ? {
        _id: new ObjectID(leaderboardID)
    } : undefined, {
        sort: {
            updatedAt: -1
        }
    });
    const endTime = performance.now();

    console.log("[PERF] Time taken for database querying:", (endTime - startTime) / 1000 + "s");

    const latestLeaderboardID = latestLeaderboard._id;

    // Naive sorting in JS and I don't like it.
    // Contributors welcome to help me sort this thing in MongoDB instead because this blocks the event loop badly (or maybe not).
    if (criteria1 === "honor" || criteria1 === "score") {
        // I'm not going to sort thousands of records twice.
        if (!latestLeaderboard[criteria1] || forceReload) {
            const startTime = performance.now();
            latestLeaderboard.userData.sort((record1, record2) => {
                return record2[criteria1] - record1[criteria1];
            });
            const endTime = performance.now();
            leaderboards.updateOne({_id: new ObjectID(latestLeaderboardID)}, {
                $set: {
                    [criteria1]: latestLeaderboard.userData,
                }
            });
            latestLeaderboard[criteria1] = latestLeaderboard.userData;
        }
        res.json({
            code: 200,
            success: true,
            timeTakenInMS: 0,
            data: latestLeaderboard[criteria1].slice(...sliceArgs),
            id: latestLeaderboardID,
        });
    } else if (criteria1 === "languages") {
        if (!latestLeaderboard[criteria1]) {
            await leaderboards.updateOne({_id: new ObjectID(latestLeaderboardID)}, {
                $set: {
                    [criteria1]: {},
                }
            });
            latestLeaderboard[criteria1] = {};
        }
        if (!latestLeaderboard[criteria1][criteria2] || forceReload) {
            const startTime = performance.now();
            latestLeaderboard.userData.sort((record1, record2) => {
                return (record2?.[criteria1]?.[criteria2]?.["score"] ?? 0) - (record1?.[criteria1]?.[criteria2]?.["score"] ?? 0);
            });
            const endTime = performance.now();
            leaderboards.updateOne({_id: new ObjectID(latestLeaderboardID)}, {
                $set: {
                    [`${criteria1}.${criteria2}`]: latestLeaderboard.userData,
                }
            });
            latestLeaderboard[criteria1][criteria2] = latestLeaderboard.userData;
        }
        res.json({
            code: 200,
            success: true,
            timeTakenInMS: 0,
            data: latestLeaderboard[criteria1][criteria2].slice(...sliceArgs),
            id: latestLeaderboardID,
        });
    } else {
        res.status(404).json({
            code: 404, success: false,
        });
    }
}

module.exports = {getCurrentLeaderboard};