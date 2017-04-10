import * as types from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {fetchEstadosLicitacion} from '../fetchEstadosLicitacionActions'; 
//TODO: add test with headers since they  now require auth?
import localStorageMock from '../../__mocks__/testLocalStorage';

process.env.API_HOST = "http://localhost:3000"
// Mocks localStorage - Since it saves headers info to localStorage
if(!window.localStorage) {
   window.localStorage = localStorageMock();
   localStorage = localStorageMock();
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('it gets the Estados Licitacion from the server', () => {
  
    afterEach(() => {
      nock.cleanAll();
    });

    it('Should get the response from the serverw with the estados licitacion', () => {
      const initialHeaders = {
          "access-token": "111",
          "uid": "example@examplemail.com",
          "client": "53k1237",
      };

      localStorage.setItem("session", JSON.stringify(initialHeaders));


    const expectedAction = [{type: types.FETCH_ESTADOS_LICITACION_SUCCESS, value: {"1": "Estado Licitacion ejemplo"} }];
    const store = mockStore({});

    nock("http://localhost:3000/")
        .get('/api/chilecompra_misc_data?info=estados_licitacion')
        .reply(200, {"1": "Estado Licitacion ejemplo"});
   
    return store.dispatch(fetchEstadosLicitacion())
                .then(() => {
                  expect(store.getActions()).toEqual(expectedAction);
                });
    });
});