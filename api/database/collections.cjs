const {mongoClient} = require("../../config.cjs");
const mongodb = require("mongodb")

const memberData = mongoClient.db("memberData");
const leaderboards = memberData.collection("leaderboards");
const profilePictures = memberData.collection("profilePictures");

module.exports = {memberData, leaderboards, profilePictures};