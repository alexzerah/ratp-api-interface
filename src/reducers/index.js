import { combineReducers } from 'redux';
import traffics from './traffics';
import stations from './stations';
import lines from './lines';
import schedules from './schedules';

export default combineReducers({
    traffics,
    stations,
    lines,
    schedules
})