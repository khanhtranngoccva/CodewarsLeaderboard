import classes from "./CSSSword.module.css";

export default function CSSSword() {
    return <div className={classes.sword}>
        <div className={classes.blade}></div>
        <div className={classes.handleTop}></div>
        <div className={classes.handle}></div>
        <div className={classes.handleBottom}></div>
    </div>
}