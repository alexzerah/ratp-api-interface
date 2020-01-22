import './sass/index.scss';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NotFoundExceptionScreen from "./screens/Exceptions/NotFoundExceptionScreen";
import HomeScreen from "./screens/HomeScreen";
import TrafficScreen from "./screens/TrafficScreen";
import LinesScreen from "./screens/LinesScreen";
import SchedulesScreen from "./screens/SchedulesScreen";
import TeamScreen from "./screens/TeamScreen";
import ContactScreen from "./screens/ContactScreen";
import AuthRoute from "./utils/AuthRoute";
import LoginScreen from "./screens/LoginScreen";
import FavoriteScreen from "./screens/FavoriteScreen";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/credentials" component={LoginScreen} />
            <AuthRoute exact path="/traffics" component={TrafficScreen} />
            <AuthRoute exact path="/lines" component={LinesScreen} />
            <AuthRoute exact path="/schedules" component={SchedulesScreen} />
            <AuthRoute exact path="/favorites" component={FavoriteScreen} />
            <Route exact path="/team" component={TeamScreen} />
            <Route exact path="/contacts" component={ContactScreen} />

            { /* Last Route is 404 Not Found, if it doesn't find any of these route, show 404 */ }
            <Route component={NotFoundExceptionScreen} />
        </Switch>
    </BrowserRouter>
);

export default App;
