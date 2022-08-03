import classes from "./LeaderboardCard.module.css";
import getJSON from "../../../helpers/getJSON.js";
import {useState} from "react";
import getCWLevelPercentage from "../../../helpers/getCWRankPercentage.js";
import defaultImage from "../../../helpers/defaultImage.js";


export default function LeaderboardCard(props) {
    const [imageSRC, loadCardWithImage] = useState();

    if (void 0 === props.userdata.percentage) {
        props.userdata.percentage = getCWLevelPercentage(props.userdata["rank"], props.userdata["score"]);
    }

    async function getPFP(cwUserID) {
        const requestURL = new URL("https://" + location.host + "/api/getUserInfo/" + cwUserID);
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
        toDisplay = <td className={classes.score}>{props.userdata?.languages?.[displayCriteria.criteria2]?.score ?? 0}</td>
    } else {
        toDisplay = <td className={classes.score}>{props.userdata[displayCriteria.criteria1]}</td>
    }

    const standingText = "#" + props.standing;

    return <tr className={classes.card}>
        <td className={classes.rankContainer}><span className={classes.rank} style={{fontSize: `${4 / standingText.length}em`}}>{standingText}</span></td>
        <td className={classes.imageContainer}>
            <div className={`${classes.progressBar} ${classes["l" + props.userdata.rank]}`} style={{"--percentage": `${props.userdata.percentage * 100}%`}}></div>
            <img className={classes.userImage} src={imageSRC || defaultImage} alt={props.userdata.username}></img>
        </td>
        <td className={classes.username}>{props.userdata.username}</td>
        {toDisplay}
    </tr>
}