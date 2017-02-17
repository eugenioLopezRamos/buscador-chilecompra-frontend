import fetch from 'isomorphic-fetch'
import * as types from '../../constants/actionTypes';
import * as actions from '../authInfoResultsActions';
import userApi from '../../api/userApi';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import utils from '../../utils/authUtils';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('tests logging in and out', () => {
  
    afterEach(() => {
      nock.cleanAll()
    })


    it("should log the user in", () => {

      let expectedResponse = {
        "data":
          {"id":1,
          "email":"etc@exampleemail.com",
          "provider":"email",
          "uid":"etc@exampleemail.com",
          "name":"test-user",
          "nickname":null,
          "image":"",
          "created_at":"2016-12-13T12:42:17.461-03:00",
          "updated_at":"2017-02-16T23:01:00.980-03:00"
          }
      }


      const expectedActionsLogin = [{type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: expectedResponse }]
      const store = mockStore()

      let responseHeaders = {
        "access-token": "111",
        "uid": "user-test",
        "client": "53k1237",
        "expiry": "1500000000"
      };

      nock("http://localhost:3000/")
        .post('/api/auth/sign_in', {password: "password", email:"etc@etc.com"})
        .reply(200, {data: expectedResponse}, responseHeaders)

        return store.dispatch(actions.submitLoginInfo({password: "password", email: "etc@etc.com"}, "http://localhost:3000"))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsLogin);
          })
    })


    it('should log the user out', () => {

      nock("http://localhost:3000")
        .delete('/api/auth/sign_out') //the server checks which user it is by checking headers. Since we mock the server here, no point in sending headers
        .reply(200, {success: true})

        const expectedActionsLogout = [{type: types.USER_LOGOUT_SUCCESS, response: {success: true}}];
        const store = mockStore();

        return store.dispatch(actions.sendLogoutInfo("http://localhost:3000"))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsLogout)
          })

    })

    it('should successfully validate login tokens', () => {




    })

    it('should unsuccessfully validate login tokens', () => {





    })

})