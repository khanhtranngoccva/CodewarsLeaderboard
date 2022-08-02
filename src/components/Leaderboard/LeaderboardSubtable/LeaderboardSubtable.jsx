import LeaderboardCard from "../LeaderboardCard/LeaderboardCard.jsx";
import classes from "./LeaderboardSubtable.module.css";
import InfiniteScroll from 'react-infinite-scroller';
import {useState} from "react";

export default function LeaderboardSubtable(props) {

    const childElements = props.leaderboard.map((entry, index) => {
        return <LeaderboardCard userdata={entry} standing={index + 1} key={entry.id} {...props}></LeaderboardCard>
    })

    return <tbody className={classes.subtable}>
        {childElements}
    </tbody>
}