import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const messagesReducer = (state = initialState.messages, action) => {
    let newState = objectAssign({}, state);
    let newMessages;

    switch(action.type) {

        case types.MESSAGES_ADD_MESSAGES:
            newMessages = action.error.errors.full_messages;
            return objectAssign({}, state, {info: newMessages});

        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
            return objectAssign({}, state, {info: "Datos actualizados exitosamente"});

        case types.USER_MODIFY_PROFILE_DATA_FAILURE:
           // newMessages = action.error.errors.full_messages;
            return objectAssign({}, state, {errors: newMessages});
            
        case types.MESSAGES_DELETE_MESSAGES:
            return objectAssign({}, state, { errors: [""], info: [""] });

        default:
            return state;

    }
}

export default messagesReducer;




