import classes from "./LeaderboardTop3.module.css";
import LeaderboardTopEntry from "./LeaderboardTopEntry/LeaderboardTopEntry.jsx";

export default function LeaderboardTop3(props) {
    let childElements = [];
    for (let i = 0; i < 3; i++) {
        const entry = props.top3entries[i];
        childElements.push(<LeaderboardTopEntry standing={i + 1} key={entry.id} userdata={entry} {...props}></LeaderboardTopEntry>)
    }
    return <div className={classes.parentContainer}>
        <div className={classes.top3Container}>
            <div className={classes.top3SubContainer}>
                <ul className={classes.top3}>
                    {childElements}
                </ul>
            </div>
        </div>
    </div>
}