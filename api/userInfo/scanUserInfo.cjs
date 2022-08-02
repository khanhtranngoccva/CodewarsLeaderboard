const {profilePictures} = require("../database/collections.cjs");

async function getUserInfo(req, res) {
    const result = await profilePictures.findOne({id: req.params["userID"]});
    if (result) {
        res.json({
            code: 200,
            success: true,
            default: false,
            data: {
                profilePictureURL: result.profilePictureURL,
            },
        });
    } else {
        res.json({
            code: 200,
            success: true,
            default: true,
            data: {
                profilePictureURL: "https://www.codewars.com/packs/assets/profile-pic.f3a90aca.png",
            }
        })
    }
}

module.exports = getUserInfo;
