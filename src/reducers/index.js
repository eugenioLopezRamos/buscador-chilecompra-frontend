// Set up your root reducer here...
import { combineReducers } from 'redux';
 //import XXXXREDUCER from '.myReducerName';
import {routerReducer} from 'react-router-redux';
import selectPreselectedValue from './selectPreselectedValueReducer';

const rootReducer = combineReducers({
    //XXXREDUCER,
    routing: routerReducer,
    selectPreselectedValue
})

 export default rootReducer;