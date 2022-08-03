const {mongoClient} = require("../../config.cjs");

const memberData = mongoClient.db("memberData");

const leaderboards = memberData.collection("leaderboards");
const leaderboardsLTS = memberData.collection("leaderboardsLTS");
const profilePictures = memberData.collection("profilePictures");

module.exports = {memberData, leaderboards, profilePictures, leaderboardsLTS};