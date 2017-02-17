import fetch from 'isomorphic-fetch'
import * as types from '../../constants/actionTypes';
import * as actions from '../authInfoResultsActions';
import userApi from '../../api/userApi';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import utils from '../../utils/authUtils';

//http://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests
  function storageMock() {
    let storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        let keys = Object.keys(storage);
        return keys[i] || null;
      },
      clear: function(){
        Object.keys(storage).map((key) => {
            delete(storage[key]);
        }) 
      }
    };
  }
// Mocks localStorage
if(!window.localStorage) {
   window.localStorage = storageMock();
}
// Mocks dev env process.env.API_HOST
process.env.API_HOST = "http://localhost:3000";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('tests logging in and out successfully', () => {
  
    afterEach(() => {
      nock.cleanAll()
    })

    it("should log the user in successfully", () => {

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

      const expectedActionsLogin = [{type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: expectedResponse}]
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

        return store.dispatch(actions.submitLoginInfo({password: "password", email: "etc@etc.com"}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsLogin);
          })
    })


    it('should log the user out successfully', () => {

      nock("http://localhost:3000")
        .delete('/api/auth/sign_out') //the server checks which user it is by checking headers. Since we mock the server here, no point in sending headers
        .reply(200, {success: true})

        const expectedActionsLogout = [{type: types.USER_LOGOUT_SUCCESS, response: {success: true}}];
        const store = mockStore();

        return store.dispatch(actions.sendLogoutInfo())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsLogout)
          })

    })

    it('should validate login tokens successfully', () => {

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
        let responseHeaders = {
          "access-token": "111",
          "uid": "user-test",
          "client": "53k1237",
          "expiry": "1500000000",
          "content-type": "application/json"
        };
        let expectedHeaders = {
          "access-token":"111",
          "uid":"user-test",
          "client":"53k1237",
          "content-type": "application/json",
          "expiry":"1500000000"
        }

        const expectedActionsValidateToken = [
          {
            type: types.USER_VALIDATE_TOKEN_SUCCESS,
            response:{
              headers: responseHeaders,
              body: expectedResponse,
              result: "success"
            }
          }
        ];
        nock("http://localhost:3000")
          .get('/api/auth/validate_token?access-token=111&uid=user-test&client=53k1237') //the server checks which user it is by checking headers. Since we mock the server here, no point in sending headers
          .reply(200, expectedResponse, expectedHeaders)

        const store = mockStore();
        //mock token mocks the localStorage token
        const mockToken = {
          "access-token": "111",
          "uid": "user-test",
          "client": "53k1237",
          "expiry": "1500000000"
        }

        window.localStorage.setItem("session", JSON.stringify(mockToken));

        return store.dispatch(actions.validateToken())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsValidateToken)
          })
        window.localStorage.clear();
    })

});


describe('Tests logging in and out unsuccessfully', () => {
    afterEach(() => {
      nock.cleanAll()
    })

  it('should log the user in unsuccessfully', () => {

      nock("http://localhost:3000/")
        .post('/api/auth/sign_in', {password: "passwordx", email:"etc@etc.com"})
        .reply(401,{"errors":["Invalid login credentials. Please try again."]})

      const store = mockStore();
      const expectedActionsLogin = [
        {
          type: types.USER_SEND_LOGIN_INFO_FAILURE,
          response: {
            body: {"errors":["Invalid login credentials. Please try again."]},
            headers: {"content-type": "application/json"},
            result: "failure"
          }
        }
      ];

      return store.dispatch(actions.submitLoginInfo({password: "passwordx", email: "etc@etc.com"}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActionsLogin);
        })
      
  })

  it('should log the user out unsuccessfully', () => {

      //TODO: translate the error message
      nock("http://localhost:3000")
        .delete('/api/auth/sign_out') //the server checks which user it is by checking headers. Since we mock the server here, no point in sending headers
        .reply(404, {errors: ["User was not found or was not logged in."]})


      const store = mockStore();
      const expectedActionsLogout = [
        {
          type: types.USER_LOGOUT_FAILURE,
          response: {errors: ["User was not found or was not logged in."]}
        }
      ];

      const mockToken = {
          "access-token": "111",
          "uid": "user-test",
          "client": "53k1237",
          "expiry": "1500000000"
      }     

      window.localStorage.setItem("session", JSON.stringify(mockToken));
        return store.dispatch(actions.sendLogoutInfo())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActionsLogout)
          })


  })

  it('should validate user tokens unsuccessfully', () => {
      const mockHeader = {
          "access-token": "111",
          "uid": "user-test",
          "client": "53k1237",
          "expiry": "1500000000"
      }    

    nock("http://localhost:3000")
      .get('/api/auth/validate_token?access-token=111&uid=user-test&client=53k1237') //the server checks which user it is by checking headers. Since we mock the server here, no point in sending headers
      .reply(401, {error: "failure"}, mockHeader)

    const store = mockStore();
    const expectedActions = [{type: types.USER_VALIDATE_TOKEN_FAILURE, response: {error: "failure"}}]

        return store.dispatch(actions.validateToken())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          })

  })








});