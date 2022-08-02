import classes from "./CSSCrown.module.css";

export default function CSSCrown(props) {
    return <div className={`${classes.crown} ${classes[props.crownType]}`}>
        <div className={classes.triangle}></div>
        <div className={classes.triangle}></div>
        <div className={classes.triangle}></div>
        <div className={classes.base}></div>
        <div className={`${classes.circle} ${classes.left}`}></div>
        <div className={`${classes.circle} ${classes.center}`}></div>
        <div className={`${classes.circle} ${classes.right}`}></div>
    </div>
}
