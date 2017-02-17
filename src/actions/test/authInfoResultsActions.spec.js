import fetch from 'isomorphic-fetch'
import * as types from '../../constants/actionTypes';
import * as actions from '../authInfoResultsActions';
import userApi from '../../api/userApi';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import utils from '../../utils/authUtils';

import fetchApi from '../../api/fetchApi';
import {onLoadFetchEstLic} from '../onLoadFetchEstLic'; 

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('test', () => {
  
    afterEach(() => {
      nock.cleanAll()
    })
    it('should work', () => {
    const expectedAction = [{type: types.ONLOAD_FETCH_EST_LIC_SUCCESS, value: {"1": "Hello world!"} }]

    const store = mockStore({isAuthenticated: false, userData: null})
    nock("http://localhost:3000/")
        .get('/api/get_misc_info?info=estados_licitacion')
        .reply(200, {"1": "Hello world!"})
   
    return store.dispatch(onLoadFetchEstLic())
                .then(() => {
              
                  // utils.saveToStorage(response.headers, storageMock); 
                  expect(store.getActions()).toEqual(expectedAction)
                })
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


      const expectedAction = [{type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: expectedResponse }]
      const store = mockStore({isAuthenticated: false, userData: null})

      let responseHeaders = new Headers();

      responseHeaders.append("access-token", "111");
      responseHeaders.append("uid", "user-test");
      responseHeaders.append("client", "53k1237");
      responseHeaders.append("expiry", "1500000000"); 

      nock("http://localhost:3000/")
        .post('/api/auth/sign_in', {password: "password", email:"etc@etc.com"}, {"access-token": "111", "uid": "user-1", "client": "53k1237", "expiry": "1500000000"})
        .reply(200, {data: expectedResponse}, responseHeaders)

        return store.dispatch(actions.submitLoginInfo({password: "password", email: "etc@etc.com"}, "http://localhost:3000"))
          .then(() => {

            expect(store.getActions()).toEqual(expectedAction);

          })
    })

})