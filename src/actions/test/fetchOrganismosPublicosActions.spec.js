import * as types from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {fetchOrganismosPublicos} from '../fetchOrganismosPublicosActions'; 


process.env.API_HOST = "http://localhost:3000"
//TODO: add tests for the failure
import localStorageMock from '../../__mocks__/testLocalStorage';

// Mocks localStorage - Since it saves headers info to localStorage
if(!window.localStorage) {
   window.localStorage = localStorageMock();
   localStorage = localStorageMock();
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Fetches Organismos Publicos from the backend', () => {
  
    afterEach(() => {
      nock.cleanAll();
    });

    it('Should successfully fetch a list of organismos publicos from the backend',  () => {
        const initialHeaders = {
            "access-token": "111",
            "uid": "example@examplemail.com",
            "client": "53k1237",
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));

        const expectedResponse = {
            1: "Organismo uno",
            2: "Organismo dos",
            3: "Organismo tres"
        };
        
        const expectedValue = [
            {"*":"Todos"},
            {1: "Organismo uno"},
            {2: "Organismo dos"},
            {3: "Organismo tres"}
        ];

        const expectedActions = [
            {type: types.FETCH_ORGANISMOS_PUBLICOS_SUCCESS, value: expectedValue}
        ];

        const store = mockStore();
        nock("http://localhost:3000")
            .get('/api/chilecompra_misc_data?info=organismos_publicos')
            .reply(200, expectedResponse);

        return store.dispatch(fetchOrganismosPublicos())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });

    });

    it('should unsuccessfully fetch a list of organismos publicos from the backend', () => {
        //TODO: This shouldn't get put into the organismosPublicos store...

        //This assumes that "organismos_publicos becomes an unpermitted param on the backend"
        const expectedResponse = {
                "message":{"errors":"Parametros invalidos"} 
        };
        const expectedValue = [
            {"*": "Todos"},
            expectedResponse
        ];
        
        const expectedActions = [
            {type: types.FETCH_ORGANISMOS_PUBLICOS_SUCCESS, value: expectedValue}
        ];

        const store = mockStore();

        nock("http://localhost:3000")
            .get('/api/chilecompra_misc_data?info=organismos_publicos')
            .reply(200, expectedResponse);

        return store.dispatch(fetchOrganismosPublicos())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });


    });
});
