import React from 'react';
import {shallow} from 'enzyme';
import UserDropdown from '../../user/UserDropdown';


function setup() {
    const props = {
        handleLogout: jest.fn(),
        toggleNotifications: jest.fn(),
        deleteNotification: jest.fn(),
        handleNotificationsClick: jest.fn(),
        notifications: {
            "9": "Cambios en licitacion XXX-YYY-ZZZZ",
            "15": "Cambios en la licitacion ZZZ-YYY-XXXX"
        },
        showNotifications: true,
        visible: true
    }

    const wrapper = shallow(<UserDropdown {...props}/>);

    return {
        props,
        wrapper
    }


}

describe('Component', () => {

    describe('UserDropdown', () => {
        const {wrapper, props} = setup();

        it('Should render self and subcomponents', () => {

            expect(wrapper.find('div.dropdown').length).toEqual(1);
            expect(wrapper.find('ul.dropdown-menu.dropdown-menu-right.dropdown-visible').length).toBe(1);
            expect(wrapper.find('li').length).toEqual(6);
            expect(wrapper.find('Link').length).toEqual(4);
            expect(wrapper.find('Notifications').length).toEqual(1);

            const notificationsComponent = wrapper.find('Notifications');
            expect(notificationsComponent.props().notifications).toEqual(props.notifications);
            expect(notificationsComponent.props().show).toEqual(props.showNotifications);
            expect(notificationsComponent.props().toggleNotifications).toEqual(props.toggleNotifications);
            expect(notificationsComponent.props().deleteNotification).toEqual(props.deleteNotification);



        });

        it('Should invoke functions from props correctly', () => {
        
            const logoutLi = wrapper.find('li').at(wrapper.find('li').length - 1);
            expect(props.handleLogout.mock.calls.length).toEqual(0);
            logoutLi.simulate("click");
            expect(props.handleLogout.mock.calls.length).toEqual(1);

            const notificationsComponent = wrapper.find('Notifications');
            expect(props.toggleNotifications.mock.calls.length).toEqual(0);
            notificationsComponent.props().toggleNotifications()
            expect(props.toggleNotifications.mock.calls.length).toEqual(1);

            expect(props.deleteNotification.mock.calls.length).toEqual(0);
            notificationsComponent.props().deleteNotification(<div></div>);
            expect(props.deleteNotification.mock.calls.length).toEqual(1);
        });

    });
});
