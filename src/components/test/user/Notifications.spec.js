import React from 'react';
import {shallow} from 'enzyme';
import Notifications from '../../user/Notifications';

function setup() {

    const propsWithNotifs = {
        show: true,
        deleteNotification: jest.fn(),
        notifications: {
            "9": "Cambios en licitacion XXX-YYY-ZZZZ",
            "15": "Cambios en la licitacion ZZZ-YYY-XXXX"
        }
    }
    const propsWithoutNotifs = {
        show: true,
        deleteNotification: jest.fn(),
        notifications: {}
    }

    const enzymeWrapperWith = shallow(<Notifications {...propsWithNotifs}/>);
    const enzymeWrapperWithout = shallow(<Notifications {...propsWithoutNotifs}/>);
    return {
        wrapperWithNotifs: enzymeWrapperWith,
        wrapperWithoutNotifs: enzymeWrapperWithout,
        propsWithNotifs,
        propsWithNotifs
    }
}

describe('Component', () => {

    describe('Notifications', () => {

        it('Should render self and all subcomponents', () => {
            const {wrapperWithNotifs, wrapperWithoutNotifs, propsWithNotifs, propsWithoutNotifs} = setup();


            // WITH NOTIFICATIONS
            expect(wrapperWithNotifs.find('div.notifications').length).toBe(1);
            expect(wrapperWithNotifs.find('ul.notifications-list-items-container').length).toBe(1);
            expect(wrapperWithNotifs.find('li.list-group-item.notifications').length).toBe(2);
            expect(wrapperWithNotifs.find('.glyphicon.glyphicon-remove').length).toBe(2);

            const notif1 = wrapperWithNotifs.find('li.list-group-item.notifications').at(0);

            expect(typeof notif1.props().onClick).toEqual("function");
            
            const removeNotifButton1 = wrapperWithNotifs.find('span.glyphicon.glyphicon-remove').at(0);
            expect(typeof removeNotifButton1.props().onClick).toEqual("function")


            const notif2 = wrapperWithNotifs.find('li.list-group-item.notifications').at(1);
            expect(typeof notif2.props().onClick).toEqual("function");

            const removeNotifButton2 = wrapperWithNotifs.find('span.glyphicon.glyphicon-remove').at(1);
            expect(typeof removeNotifButton2.props().onClick).toEqual("function");


            //WITHOUT NOTIFICATIONS
            
            expect(wrapperWithoutNotifs.find('div.notifications').length).toBe(1);
            expect(wrapperWithoutNotifs.find('ul.notifications-list-items-container').length).toBe(1);
            expect(wrapperWithoutNotifs.find('li.list-group-item.notifications').length).toBe(1);
            expect(wrapperWithoutNotifs.find('.glyphicon.glyphicon-remove').length).toBe(0);

            const placeholderNotif = wrapperWithoutNotifs.find('li.list-group-item.notifications').at(0);

            expect(typeof placeholderNotif.props().onClick).toEqual("undefined");
            
        });

        it('Should successfully invoke all functions passed as props', () => {

            //Only if there actually are notifications there are functions
            const {wrapperWithNotifs, propsWithNotifs} = setup();
            
            const notificationListItems = wrapperWithNotifs.find('li.list-group-item.notifications');

            let eventsNotPropagated = [];
            notificationListItems.map(container => {
                eventsNotPropagated.push(container.simulate("click", {stopPropagation: () => {return "Propagation Stopped!"}}));
            });

            expect(eventsNotPropagated.length).toEqual(notificationListItems.length);

            const notif1 = wrapperWithNotifs.find('li.list-group-item.notifications').at(0);
            const notif1remove = wrapperWithNotifs.find('li.list-group-item.notifications span.glyphicon.glyphicon-remove').at(0);

            expect(propsWithNotifs.deleteNotification.mock.calls.length).toEqual(0);
            notif1remove.simulate("click", notif1);
            expect(propsWithNotifs.deleteNotification.mock.calls.length).toEqual(1);

            const notif2 = wrapperWithNotifs.find('li.list-group-item.notifications').at(1);
            const notif2remove = wrapperWithNotifs.find('li.list-group-item.notifications span.glyphicon.glyphicon-remove').at(1);

            expect(propsWithNotifs.deleteNotification.mock.calls.length).toEqual(1);
            notif2remove.simulate("click", notif2);
            expect(propsWithNotifs.deleteNotification.mock.calls.length).toEqual(2);
            
        });

        
    });


});
