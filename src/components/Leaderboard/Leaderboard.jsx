import getJSON from "../../helpers/getJSON.js";
import LeaderboardSubtable from "./LeaderboardSubtable/LeaderboardSubtable.jsx";
import {useState, useRef} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import classes from "./Leaderboard.module.css"
import CSSSword from "../CSSIcons/CSSSword/CSSSword";
import LeaderboardTop3 from "../LeaderboardTop3/LeaderboardTop3";
import {assertDeepStrictEquals} from "../../helpers/testHelpers.js";
import Loader from "../Loader/Loader";

export default function Leaderboard(props) {
    const [curData, changeData] = useState({
        data: [],
        pageToLoad: 1,
        id: undefined,
    });

    function reload() {
        changeData({
            data: [],
            pageToLoad: 1,
            id: undefined,
        })
    }

    function getNewPage() {
        console.log(curData.id);
        getData(Object.assign({page: curData.pageToLoad, id: curData.id}, props.config));
    }

    async function getData(parameters = {}) {
        console.log("Getting data for page", parameters.page);
        const requestURL = new URL("https://" + location.host + "/api/getLeaderboard");

        function setParam(paramName) {
            parameters[paramName] !== undefined && requestURL.searchParams.set(paramName, parameters[paramName]);
        }

        setParam("criteria1");
        setParam("criteria2");
        setParam("page");
        setParam("id");
        setParam("forceReload");

        let json;
        try {
            json = (await getJSON(requestURL.toString()));
        } catch (e) {
            requestURL.protocol = "http:";
            console.log(requestURL.toString());
            json = (await getJSON(requestURL.toString()));
        }
        let result = json.data;
        let endOfList;
        if (!result.length) {
            endOfList = true;
        }
        let id = json.id;
        curData.data.push(...result);
        changeData({
            data: curData.data,
            pageToLoad: curData.pageToLoad + 1,
            id,
            endOfList,
        });
    }

    const prevProps = useRef(null);
    if (!assertDeepStrictEquals(prevProps.config, props.config)) {
        prevProps.config = props.config;
        console.log(props.config)
        reload();
        return <Loader></Loader>;
    }

    // Empty. Starts fetching.
    if (!curData.data.length) {
        getNewPage();
        return <Loader></Loader>;
    } else {
        return <div className={classes.leaderboardContainer}>
            <InfiniteScroll loadMore={getNewPage} hasMore={!(curData.endOfList)} useWindow={false}>
                <LeaderboardTop3 top3entries={curData.data.slice(0, 3)} criteria={props.config}></LeaderboardTop3>
                <table className={classes.leaderboardTable}>
                    <LeaderboardSubtable leaderboard={curData.data} criteria={props.config}></LeaderboardSubtable>
                </table>
                {
                    curData.endOfList ? null :
                    <div className={classes.swordContainer}>
                        <CSSSword></CSSSword>Loading more folx from #100devs!
                    </div>
                }
            </InfiniteScroll>
        </div>
    }
}