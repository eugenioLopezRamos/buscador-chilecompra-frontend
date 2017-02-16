import * as types from '../../constants/actionTypes';
import * as actions from '../authInfoResultsActions';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [thunk];



describe('submit login info', () => {

    it('should log the user in', () => {
       
        const initialAppState = states.defaultStore;
        const expectedAppState = states.defaultLoggedIn;
        


        const expectedAction = {
            type: types.USER_SEND_LOGIN_INFO_SUCCESS,
            response: {
                        success: "success!",
                        userData: {name: "test",
                                    id: "1"}
                      }
        }
        const store = mockStore({isAuthenticated: false, userData: null})


        expect(actions.submitLoginInfo()).toEqual(expectedAction)
    })

})

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: { todos: ['do something'] }})

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

