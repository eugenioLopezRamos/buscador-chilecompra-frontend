import * as types from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import {onLoadFetchOrgPub} from '../onLoadFetchOrgPub'; 

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
describe('Fetches Organismos Publicos from the backend', () => {
  
    afterEach(() => {
      nock.cleanAll()
    })

    it('Should successfully fetch a list of organismos publicos from the backend',  () => {
        const expectedResponse = {
            1: "Organismo uno",
            2: "Organismo dos",
            3: "Organismo tres"
        }
        
        const expectedValue = [
            {"*":"Todos"},
            {1: "Organismo uno"},
            {2: "Organismo dos"},
            {3: "Organismo tres"}
        ]

        const expectedActions = [
            {type: types.ONLOAD_FETCH_ORG_PUB_SUCCESS, value: expectedValue}
        ];

        const store = mockStore();
        nock("http://localhost:3000")
            .get('/api/get_misc_info?info=organismos_publicos')
            .reply(200, expectedResponse)

        return store.dispatch(onLoadFetchOrgPub())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          })

    })

    it('should unsuccessfully fetch a list of organismos publicos from the backend', () => {
        


    })
})
