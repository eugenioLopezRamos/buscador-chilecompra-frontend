import React from 'react';
import {shallow} from 'enzyme';
import UserProfile from '../../user/UserProfile';

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
        userNotifications: {
            8: "Cambios en la licitación 1851-3-LE17"
        },
        userSubscriptions: {
            hospital: 46584,
            edificio: 22527
        },
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
        showStoredSearch: jest.fn(),
        executeStoredSearch: jest.fn(),
        getResultHistory: jest.fn(),
        deleteUserSubscription: jest.fn(),
        deleteUserSearches: jest.fn(),     
        showModal: jest.fn(),
        components: {
            InputFieldsContainer: <div></div>,
            SearchResults: <div></div>,
            ResultComparer: <div></div>,
            UpdateSearchMenu: <div></div>         
        }
    }
    const wrapper = shallow(<UserProfile {...props}/>);

    return {
        wrapper,
        props
    }

}

describe('Component', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();
    const state = instance.state;
    describe('UserProfile', () => {

        it('Should render self and subcomponents', () => {
            // root exists
            expect(wrapper.find('div.profile-container').length).toBe(1);
            // stored searches div exists
            expect(wrapper.find('div.profile-stored-searches').length).toBe(1);
            // stored subscriptions div exists
            expect(wrapper.find('div.profile-stored-subscriptions').length).toBe(1);
            // list-group-item is used to render stored searches and stored subscriptions
            // the mock has 2 of each => should find 4
            expect(wrapper.find('li.list-group-item.saved-items').length).toBe(4);
            //h2 elements are correctly displayed
            let h2s = wrapper.find('h2');

            expect(h2s.length).toEqual(2);
            expect(h2s.at(0).text()).toEqual('Búsquedas guardadas');
            expect(h2s.at(1).text()).toEqual('Suscripciones');


            const storedSearches = wrapper.find('li.list-group-item.saved-items').slice(0,1);
            const storedSubscriptions = wrapper.find('li.list-group-item.saved-items').slice(2,3);

            storedSearches.forEach((search, index) => {
                // description is correctly displayed
                expect(search.find('.saved-items-description').length).toEqual(1);
                expect(search.find('.saved-items-description').text()).toEqual(props.userSearches.name[index]);
                // buttons are correctly displayed
                let buttons = search.find('button.btn-primary.pull-right');
                expect(buttons.length).toEqual(3);
                let buttonValues = ["Ejecutar", "Modificar", "Eliminar"];
                
                buttons.forEach((button, buttonIndex) => {
                    expect(button.text()).toEqual(buttonValues[buttonIndex]);
                });
                
            });

            storedSubscriptions.forEach((subscription, index) => {

                expect(subscription.find('.saved-items-description').length).toEqual(1);
                let subscriptionNames = Object.keys(props.userSubscriptions);
                expect(subscription.find('.saved-items-description').text()).toEqual(subscriptionNames[index]);
                
                let buttons = subscription.find('button.btn-primary.pull-right');
                expect(buttons.length).toEqual(3);
                let buttonValues = ["Mostrar", "Modificar", "Eliminar"];

                buttons.forEach((button, buttonIndex) => {
                    expect(button.text()).toEqual(buttonValues[buttonIndex]);
                });
            });



        });

        it('Should invoke functions passed as props successfully', () => {
            
            const searchBtnSelector = 'div.profile-stored-searches li.list-group-item.saved-items button.btn.btn-primary.pull-right';
            const searchButtons = wrapper.find(searchBtnSelector);
            console.log("sercah LEN", searchButtons.length);
            // STORED SEARCHES
            // Ejecutar
            let ejecutarSearchButton = searchButtons.at(0);
            expect(props.executeStoredSearch.mock.calls.length).toEqual(0);
            ejecutarSearchButton.simulate("click");
            expect(props.executeStoredSearch.mock.calls.length).toEqual(1);

            // Modificar
            let modificarSearchButton = searchButtons.at(1);
            expect(props.showStoredSearch.mock.calls.length).toEqual(0);
            modificarSearchButton.simulate("click");
            expect(props.showStoredSearch.mock.calls.length).toEqual(1);
            // Eliminar
            let eliminarSearchButton = searchButtons.at(2);
            expect(props.deleteUserSearches.mock.calls.length).toEqual(0);
            eliminarSearchButton.simulate("click");
            expect(props.deleteUserSearches.mock.calls.length).toEqual(1);
            // STORED SUBSCRIPTIONS
            const subscriptionBtnSelector = 'div.profile-stored-subscriptions li.list-group-item.saved-items button.btn.btn-primary.pull-right';
            const subscriptionButtons = wrapper.find(subscriptionBtnSelector);

            // Mostrar
            let mostrarSubscriptionButton = subscriptionButtons.at(0);
            expect(props.getResultHistory.mock.calls.length).toEqual(0);
            mostrarSubscriptionButton.simulate("click");
            expect(props.getResultHistory.mock.calls.length).toEqual(1);

            // Modificar
            let modificarSubscriptionButton = subscriptionButtons.at(1);
            expect(props.showModal.mock.calls.length).toEqual(0);
            modificarSubscriptionButton.simulate("click");
            expect(props.showModal.mock.calls.length).toEqual(1);

            //Eliminar
            let eliminarSubscriptionButton = subscriptionButtons.at(2);
            expect(props.deleteUserSubscription.mock.calls.length).toEqual(0);
            eliminarSubscriptionButton.simulate("click");
            expect(props.deleteUserSubscription.mock.calls.length).toEqual(1);
        
            //TODO: Make + test the link displayed when a user has no subsctiptions stored

        });
    });
});

