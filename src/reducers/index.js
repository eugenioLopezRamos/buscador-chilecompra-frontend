// Set up your root reducer here...
import { combineReducers } from 'redux';
 //import XXXXREDUCER from '.myReducerName';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    //XXXREDUCER,
    routing: routerReducer

})

 export default rootReducer;