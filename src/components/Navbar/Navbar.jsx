import classes from "./Navbar.module.css"
import Select from "react-select";

const selectStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: "20em",
        color: "var(--primary)",
        background: "var(--background)",
        marginTop: 0,
    }),
    control: (provided, state) => ({
        ...provided,
        width: "20em",
        fontSize: "1rem",
        minHeight: "0",
        background: "var(--background)",
        outline: "none",
        border: "none",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        width: "20em",
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? "var(--accent2)" : "var(--background)",
        color: "var(--primary)",
    }),
    valueIndicator: (provided, state) => ({
        ...provided,
        background: "var(--accent1)",
    }),
    valueContainer: (provided, state) => {
        return {
            ...provided,
        };
    },
    dropdownIndicator(provided, state) {
        return {
            ...provided,
            paddingBlock: "0em",
        }
    }
}

export default function Navbar(props) {
    const selectComponents = (props.selectElementConfigs || []).map(selectElementConfig => {
        selectElementConfig.enableCondition ??= () => true;
        return <Select {...selectElementConfig} styles={selectStyles} isDisabled={!selectElementConfig.enableCondition()}></Select>;
    });

    return <nav className={classes.navbar}>
        <span className={classes.logo}>{"</>100Devs"}</span>
        <form className={classes.sortSelector}>
            {selectComponents}
        </form>
    </nav>
}