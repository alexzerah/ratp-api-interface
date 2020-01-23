import { combineReducers } from 'redux';
import traffics from './traffics';
import stations from './stations';
import lines from './lines';
import schedules from './schedules';
import auth from "./auth";

export default combineReducers({
    auth,
    traffics,
    stations,
    lines,
    schedules
})
