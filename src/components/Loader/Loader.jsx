import classes from "./Loader.module.css"
import CSSSword from "../CSSIcons/CSSSword/CSSSword";

export default function Loader() {
    return <div className={classes.loader}>
        <CSSSword className={classes.slash1}></CSSSword>
        <CSSSword className={classes.slash2}></CSSSword>
    </div>
}