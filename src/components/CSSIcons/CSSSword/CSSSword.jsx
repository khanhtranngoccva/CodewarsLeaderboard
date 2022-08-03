import classes from "./CSSSword.module.css";

export default function CSSSword(props) {
    return <div {...props} className={`${classes.sword} ${props.className}`}>
        <div className={classes.blade}></div>
        <div className={classes.handleTop}></div>
        <div className={classes.handle}></div>
        <div className={classes.handleBottom}></div>
    </div>
}