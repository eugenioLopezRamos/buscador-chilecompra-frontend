import * as types from '../../constants/actionTypes';
import * as actions from '../signupResultsActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

// Mocks dev env process.env.API_HOST
process.env.API_HOST = "http://localhost:3000";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests response to sending signup data to the backend', () => {

    it('Should sign the user up successfully', () => {
        const userData = {
            name: "Pedro Perez",
            email: "example@examplemail.com",
            password: "password",
            password_confirmation: "password"
        };

        const expectedResponse = {
            data: {
                created_at: "2017-02-20T13:52:54.412-03:00",
                email: userData.email,
                id: 1,
                image: null,
                name: userData.name,
                nickname: null,
                provider: "email",
                uid: userData.email,
                updated_at: "2017-02-20T13:52:54.412-03:00"
            },
            status:"success"
        };

        nock("http://localhost:3000/")
            .post("/api/auth/", JSON.stringify(userData))
            .reply(200, expectedResponse);

        const expectedActions = [
            {type: types.USER_SEND_SIGNUP_INFO},
            {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: "success", value: "success"}
        ];

        const store = mockStore();

        return store.dispatch(actions.sendSignupData(userData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });

    });

    it('should sign the user up unsuccessfully', () => {
        const userData = {
            name: "Pablo Perez",
            email: "example2@example2mail.com",
            password: "password",
            password_confirmation: "drowssap"
        };

        const expectedResponse  = {
            
            data:{
                "id":null,
                "provider":"email",
                "uid":"",
                "name":"eug2",
                "nickname":null,
                "image":null,
                "email":"exq@fail.com",
                "created_at":null,
                "updated_at":null
                },
            errors:{
                "password_confirmation":["doesn't match Password"],
                "full_messages":["Password confirmation doesn't match Password"]
            },
            status:"error"
        };

        nock("http://localhost:3000/")
            .post("/api/auth/", JSON.stringify(userData))
            .reply(422, expectedResponse);

        const expectedActions = [
            {type: types.USER_SEND_SIGNUP_INFO},
            {type: types.USER_SEND_SIGNUP_INFO_FAILURE,
             message: "Password confirmation doesn\'t match Password",
             value: "error"
            }
        ];

        const store = mockStore();

        return store.dispatch(actions.sendSignupData(userData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });

    });
});
