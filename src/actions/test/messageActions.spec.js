import * as types from '../../constants/actionTypes';
import * as actions from '../messageActions';

describe('Tests messages actions', () => {

    it('should delete messages from a Flash', () => {
        let action = actions.deleteMessages();
        expect({type: types.MESSAGES_DELETE_MESSAGES }).toEqual(action);
    });

});

