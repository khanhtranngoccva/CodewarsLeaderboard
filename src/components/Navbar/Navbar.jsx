import classes from "./Navbar.module.css"
import Select from "react-select";

export default function Navbar(props) {
    const selectComponents = (props.selectElementConfigs || []).map(selectElementConfig => {
        selectElementConfig.enableCondition ??= () => true;
        if (selectElementConfig.enableCondition()) {
            return <Select {...selectElementConfig}></Select>;
        }
    });

    return <nav className={classes.navbar}>
        <form>
            {selectComponents}
        </form>
    </nav>
}