import { useState } from 'react'
import {Switch, Route} from "react-router-dom";
import './App.css'
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";

function App() {
    return <Switch>
        <Route path="/" exact={true}>
            <Leaderboard></Leaderboard>
        </Route>
    </Switch>
}

export default App;
