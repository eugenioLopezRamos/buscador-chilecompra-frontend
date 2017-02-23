import React from 'react';
import {shallow} from 'enzyme';
import {UserPage} from '../../user/UserPage.jsx';
import objectAssign from 'object-assign';

function setup() {
    const props = {
        user: {
            id: 1,
            provider: "email",
            uid: "email@example.com",
            name: "test-user",
            nickname: null,
            image: "",
            email: "email@example.com",
            created_at: "2016-12-22T12:42:17.461-03:00",
            updated_at: "2017-02-23T17:14:03.002-03:00"
        },
        userSubscriptions: {
            hospital: 46584,
            edificio: 22527
        },
        //TODO: See if its possible to refactor this into an array of hashes instead
        // userSearches = [{id: 1, value: {...}, name: "..."}, ...]
        userSearches: {
            name:["busqueda1", "busqueda2"],
            value: [{
                offset: 0,
                endDate: "2017-02-21T22:41:27.957Z",
                order_by: { order: "descending", fields: [] },
                startDate: "2017-02-21T22:41:27.957Z",
                rutProveedor: "",
                alwaysToToday: false,
                palabrasClave: "",
                alwaysFromToday: false,
                codigoLicitacion: "",
                organismosPublicosFilter: "",
                selectedEstadoLicitacion: "",
                selectedOrganismoPublico: "*",
            },
            {
                offset: 0,
                endDate: "2017-01-30T13:58:36.000Z",
                order_by: { order: "descending", fields: [] },
                startDate: "2017-01-30T13:58:36.000Z",
                rutProveedor: "11111111",
                alwaysToToday: false,
                palabrasClave: "",
                alwaysFromToday: false,
                codigoLicitacion: "",
                organismosPublicosFilter: "va",
                selectedEstadoLicitacion: "",
                selectedOrganismoPublico: "7016"
            }],
            id: [112, 113]
        },
        userNotifications: {
            8: "Cambios en la licitación 1851-3-LE17"
        },
        messages: {
            Info: [], 
            Errores: []
        },
        updateSubscription: jest.fn(),
        deleteSubscriptino: jest.fn(),
        updateUserSearches: jest.fn(),
        deleteUserSearches: jest.fn(),
        getResultHistory: jest.fn(),
        loadChilecompraData: jest.fn(() => {mock: "mockValue"}),
        userApi: {
            getResultHistory: jest.fn(() => "getResultHistory")
        }
    }

    const wrapper = shallow(<UserPage {...props}/>);

    return {
        props,
        wrapper
    }
}



        // this.state = {
        //     showFullScreenPane: false,
        //     FullScreenPaneComponent: null,
        //     componentProps: {},
        //     menu: null,
        //     menuProps: {},
        //     showModal: false,
        //     enteredNewSubscriptionName: "",
        //     modalDefaultName: null
        // }

describe('Container', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();
    const state = instance.state;
    describe('UserPage', () => {

        it('Should render self and subcomponents', () => {
            //should render root div
            expect(wrapper.find('div.jumbotron').length).toBe(1);
            
            //renders FullscreenPane
            expect(wrapper.find('FullScreenPane').length).toBe(1);

            const fullscreenPane = wrapper.find('FullScreenPane').at(0);
            expect(fullscreenPane.props().show).toEqual(state.showFullScreenPane);
            expect(fullscreenPane.props().hide).toEqual(instance.hideFullScreenPane);
            expect(fullscreenPane.props().component).toEqual(state.FullScreenPaneComponent);
            expect(fullscreenPane.props().componentProps).toEqual(state.componentProps);
            expect(fullscreenPane.props().menu).toEqual(state.menu);

            //renders Modal
            expect(wrapper.find('Modal').length).toBe(1);
            const modal = wrapper.find('Modal').at(0);
            expect(modal.props().isModalShown).toEqual(state.showModal);
            expect(modal.props().modalValue).toEqual(state.enteredNewSubscriptionName);
            expect(modal.props().handler).toEqual(instance.updateSubscription);
            expect(modal.props().hideModal).toEqual(instance.hideModal);
            expect(modal.props().defaultName).toEqual(state.modalDefaultName);
            expect(modal.props().onInput).toEqual(instance.onSubscriptionNewNameInput);

            //renders Flash
            expect(wrapper.find('Flash').length).toBe(1);
            const flash = wrapper.find('Flash').at(0);
            expect(flash.props().type).toEqual("info");
            expect(flash.props().messages).toEqual(props.messages);

            //renders h2 welcome
            expect(wrapper.find('h2.text-center').length).toBe(1);
            const h2 = wrapper.find('h2.text-center').at(0);
            expect(h2.text()).toEqual(`Bienvenido ${props.user.name}`);

            //renders UserProfile
            expect(wrapper.find('UserProfile').length).toBe(1);
            const userProfile = wrapper.find('UserProfile').at(0);
            expect(userProfile.props().user).toEqual(props.user);
            expect(userProfile.props().userNotifications).toEqual(props.userNotifications);
            expect(userProfile.props().userSubscriptions).toEqual(props.userSubscriptions);
            expect(userProfile.props().userSearches).toEqual(props.userSearches);
            expect(userProfile.props().actions).toEqual(instance.actions);
            expect(userProfile.props().showStoredSearch).toEqual(instance.showStoredSearch);
            expect(userProfile.props().executeStoredSearch).toEqual(instance.executeStoredSearch);
            expect(userProfile.props().getResultHistory).toEqual(instance.getResultHistory);
            expect(userProfile.props().showModal).toEqual(instance.showModal);
            expect(userProfile.props().components).toEqual(instance.components);
            
        });

        it('Should correctly call functions passed as props', () => {

            const testPropsFunctionWorks = (fn, target, action, actionArgs) => {
                expect(fn.mock.calls.length).toBe(0);
                target.simulate(action, actionArgs);
                expect(fn.mock.calls.length).toBe(1);
            }

            const testFunctionChangesState = (fn, args, expectedValue) => {
                //clone the state before calling the state changing function
                let initialState = objectAssign({}, state);
                //Invoke the function
                fn(args);
                //Is the new state (instance.state) equal to the expected new state?
                // (objectAssign initialState << expectedValue);
                expect(instance.state).toEqual(objectAssign(initialState, expectedValue));
            }

            //Fullscreen pane functions: 


            //hide
            const fullScreenPane = wrapper.find('FullScreenPane').at(0);
            let expectedValue = {
                showFullScreenPane: false
            }
            testFunctionChangesState(fullScreenPane.props().hide, null, expectedValue);

            //Modal functions:
    
            const modal = wrapper.find('Modal').at(0);
            //handler - this.updateSubscription}
            expectedValue = {showModal: false, enteredNewSubscriptionName: "", modalDefaultName: null}
            testFunctionChangesState(modal.props().handler, null, expectedValue);

            //hideModal - this.hideModal
            expectedValue = {showModal: false, modalDefaultName: null, enteredNewSubscriptionName: ""}
            testFunctionChangesState(modal.props().hideModal, null, expectedValue);

            //onInput (instance) this.onSubscriptionNewNameInput
            let newSubscriptionName = "new name";
            expectedValue = {enteredNewSubscriptionName: newSubscriptionName};
            let argument = {target: {value: newSubscriptionName}};
            testFunctionChangesState(modal.props().onInput, argument, expectedValue);

            //Flash functions - NONE

            //userProfile functions
            const userProfile = wrapper.find('UserProfile').at(0);


            // this.showStoredSearch
            // this.executeStoredSearch
            // this.getResultHistory
            // this.showModal
            

            // actions (vienen de props): 
                        // getUserSubscriptions: props.getUserSubscriptions,
                        // updateSubscription: props.updateSubscription,
                        // deleteSubscription: props.deleteSubscription,
                        // getUserSearches: props.getUserSearches,
                        // updateUserSearches: props.updateUserSearches,
                        // deleteUserSearches: props.deleteUserSearches,

            //showStoredSearch - Sets state: 

                // { 
                //     showFullScreenPane: true, 
                //     FullScreenPaneComponent: component,
                //     componentProps: {
                //         defaultValues: {
                //             defaultState: this.props.userSearches.value[index]                    
                //         },
                //         saveMenu: this.components.UpdateSearchMenu,
                //         createSearches: this.props.updateUserSearches,
                //         defaultSearchId: searchId,
                //         defaultSearchName: searchName
                //     },
                // }
            
            // executeStoredSearch - Sets state:

                //  {
                //   showFullScreenPane: true, 
                //   FullScreenPaneComponent: component, 
                //   componentProps: {results: response },
                //   menu: this.getMenu(component)
                //  }    

            // getResultHistory - Sets state: 

                // {
                // showFullScreenPane: true, 
                // FullScreenPaneComponent: component, 
                // componentProps: {results: response},
                // menu: this.getMenu(component)
                // }           
                        

            //showModal - Sets state:
              
              // 
            let name = "default name"
            expectedValue = {showModal: true, modalDefaultName: name, enteredNewSubscriptionName: ""};
            testFunctionChangesState(userProfile.props().showModal, name, expectedValue);   




        });
    });
});