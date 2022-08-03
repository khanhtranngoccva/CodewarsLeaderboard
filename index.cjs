const {app} = require("./config.cjs");
const {synchronize} = require("./api/database/synchronize.cjs");
const {getCurrentLeaderboard} = require("./api/database/getLeaderboard.cjs");
const getUserInfo = require("./api/userInfo/scanUserInfo.cjs");
const {updatePFPURLs} = require("./api/userInfo/updatePFPFiles.cjs");

synchronize();
updatePFPURLs();
setInterval(synchronize, 300 * 1000);
setInterval(updatePFPURLs, 60 * 1000);

app.get("/api/getLeaderboard", getCurrentLeaderboard);
app.get("/api/getUserInfo/:userID", getUserInfo);