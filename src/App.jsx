import { useState } from 'react'
import {Switch, Route} from "react-router-dom";
import './App.css'
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
    const [config, setConfig] = useState({
        criteria1: "honor",
        criteria2: "javascript",
    });

    function SortConfig(key, options, extraOptions={}) {
        Object.assign(this, extraOptions);
        this.key = key;
        this.options = options;
        this.onChange = function (value) {
            updateConfig({[this.key]: value.value});
        }.bind(this);
    }

    const sortConfigs = [
        new SortConfig("criteria1", [
            {value: "honor", label: "By honor"},
            {value: "score", label: "By rank and overall score"},
            {value: "languages", label: "By language score"},
        ], {
            placeholder: "Sorting method (default by honor)",
        }),
        new SortConfig("criteria2", [
            {value: "javascript", label: "JavaScript"},
            {value: "python", label: "Python"},
            {value: "c", label: "C"},
            {value: "cpp", label: "C++"},
        ], {
            enableCondition: function () {
                return config.criteria1 === "languages"
            },
            placeholder: "Select language (default JavaScript)",
        }),
    ]

    function updateConfig(properties) {
        setConfig(Object.assign({}, config, properties));
    }

    return <Switch>
        <Route path="/" exact={true}>
            <Navbar curState={config} selectElementConfigs={sortConfigs}></Navbar>
            <Leaderboard config={config}></Leaderboard>
        </Route>
    </Switch>
}

export default App;