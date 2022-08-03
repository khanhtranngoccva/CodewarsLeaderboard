import classes from "./LeaderboardTopEntry.module.css"
import {useState} from "react";
import getJSON from "../../../helpers/getJSON.js";
import getCWLevelPercentage from "../../../helpers/getCWRankPercentage.js";
import defaultImage from "../../../helpers/defaultImage.js";
import CSSCrown from "../../CSSIcons/CSSCrown/CSSCrown.jsx";

export default function LeaderboardTopEntry(props) {
    const [imageSRC, loadCardWithImage] = useState();

    const uniqueClass = {
        1: "firstPlace",
        2: "secondPlace",
        3: "thirdPlace",
    };

    if (void 0 === props.userdata.percentage) {
        props.userdata.percentage = getCWLevelPercentage(props.userdata["rank"], props.userdata["score"]);
    }

    async function getPFP(cwUserID) {
        const requestURL = new URL("http://" + location.host + "/api/getUserInfo/" + cwUserID);
        let result;
        try {
            result = (await getJSON(requestURL.toString())).data.profilePictureURL;
        } catch (e) {
            requestURL.protocol = "http:";
            result = (await getJSON(requestURL.toString())).data.profilePictureURL;
        }
        loadCardWithImage(result);
    }

    if (!imageSRC) {
        getPFP(props.userdata.id);
    }

    let toDisplay;
    const displayCriteria = props.criteria;
    if (displayCriteria.criteria1 === "languages") {
        toDisplay = <span className={classes.score}>{props.userdata?.languages?.[displayCriteria.criteria2]?.score ?? 0}</span>
    } else {
        toDisplay = <span className={classes.score}>{props.userdata[displayCriteria.criteria1]}</span>
    }

    return <li className={`${classes.entry} ${classes[uniqueClass[props.standing]]}`}>
        <div className={classes.pfpContainer}>
            <CSSCrown crownType={uniqueClass[props.standing]}></CSSCrown>
            <img className={classes.pfp} alt={props.userdata.username} src={imageSRC || defaultImage}></img>
        </div>
        <div className={classes.userInfo}>
            <span className={classes.username}>{props.userdata.username}</span>
            {toDisplay}
        </div>

    </li>
}