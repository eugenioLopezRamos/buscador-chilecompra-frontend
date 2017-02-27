import React from 'react';
import {shallow} from 'enzyme';
import {CollapsibleNavBar} from '../CollapsibleNavBar';

function authSetup() {
    const mockNotifications = {"8": "Cambios en la licitacion XXX-YYY-ZZZ"};

    const authProps = {
        showNavbar: true,
        showNotifications: true,
        loginData: {
            email: "",
            password: "",
            message: null,
            result: null
        },
        isAuthenticated: true,
        displayActions: {
            toggleNavbarDisplay: jest.fn(),
            toggleNotificationsDisplay: jest.fn()
        },
        notifications: mockNotifications,
        authInfoInputsActions: {
            loginInputEmail: jest.fn(),
            loginInputPassword: jest.fn()
        },
        authInfoResultsActions: {
            submitLoginInfo: jest.fn(),
            sendLogoutInfo: jest.fn()
        },
        deleteNotification: jest.fn()

    }

    const authWrapper = shallow(<CollapsibleNavBar {...authProps}/>);

    return {
        authWrapper,
        authProps
    }
}

function noAuthSetup() {
    const mockNotifications = null;

    const noAuthProps = {
        showNavbar: true,
        showNotifications: true,
        loginData: {
            email: "",
            password: "",
            message: null,
            result: null
        },
        isAuthenticated: false,
        displayActions: {
            toggleNavbarDisplay: jest.fn()
        },
        notifications: mockNotifications,
        authInfoInputsActions: {
            loginInputEmail: jest.fn(),
            loginInputPassword: jest.fn()
        },
        authInfoResultsActions: {
            submitLoginInfo: jest.fn(),
            sendLogoutInfo: jest.fn()
        },
        deleteNotification: jest.fn()

    }

    const noAuthWrapper = shallow(<CollapsibleNavBar {...noAuthProps}/>);

    return {
        noAuthWrapper,
        noAuthProps
    }
}

describe('Components', () => {

    describe('CollapsibleNavbar', () => {
        const {authWrapper, authProps} = authSetup();
        const {noAuthWrapper, noAuthProps} = noAuthSetup();

        function checkPropFunctionCalled(action, fn) {
            expect(fn.mock.calls.length).toEqual(0);
            action();
            expect(fn.mock.calls.length).toEqual(1);


        }

        it('Should render self and subcomponents', () => {
            
            //WHEN NOT AUTHENTICATED
            //renders root
            expect(noAuthWrapper.find('.dropdown-container').length).toBe(1);
            //renders the correct button when not logged in
            expect(noAuthWrapper.find('button.btn.navbar-toggle').length).toBe(1);
            //navbar is shown
            expect(noAuthWrapper.find('.navbar-collapse.no-gutter').length).toEqual(1); 
            //renders correct dropdown menu when not logged in
            expect(noAuthWrapper.find('Login').length).toBe(1);  
            const login = noAuthWrapper.find('Login');
            const loginProps = login.props();
            expect(loginProps.loginData).toEqual(noAuthProps.loginData);
            expect(loginProps.handleChangeEmail).toEqual(noAuthProps.authInfoInputsActions.loginInputEmail);
            expect(loginProps.handleChangePassword).toEqual(noAuthProps.authInfoInputsActions.loginInputPassword);
            expect(loginProps.handleClickSubmit).toEqual(noAuthWrapper.instance().handleLogin);
            expect(noAuthProps.authInfoResultsActions.submitLoginInfo.mock.calls.length).toEqual(0);
            //can't use .simulate, shallow doesn't render <Login/>
            loginProps.handleClickSubmit();
            expect(noAuthProps.authInfoResultsActions.submitLoginInfo.mock.calls.length).toEqual(1);

            // WHEN AUTHENTICATED 

            //renders component root when logged in
            expect(authWrapper.find('.dropdown-container.logged-in').length).toBe(1);
            //renders the correct button when logged in
            expect(authWrapper.find('button.btn.btn-default.dropdown-toggle.user-menu').length).toBe(1);
            const dropdownBtn = authWrapper.find('button.btn.btn-default.dropdown-toggle.user-menu');
            const dropdownBtnProps = dropdownBtn.props();
            expect(dropdownBtnProps.onClick).toEqual(authWrapper.instance().handleClick);
            //toggleNavbarDisplay hasn't been called
            expect(authProps.displayActions.toggleNavbarDisplay.mock.calls.length).toEqual(0);
            // should call it
            dropdownBtn.simulate("click", {stopPropagation: () => "propagation stopped"});
            expect(authProps.displayActions.toggleNavbarDisplay.mock.calls.length).toEqual(1);



            //navbar is shown
            expect(authWrapper.find('.navbar-collapse.no-gutter').length).toEqual(1);            
            //renders the correct dropdown menu when logged in
            expect(authWrapper.find('UserDropdown').length).toBe(1);
            const userDropdown = authWrapper.find('UserDropdown');
            const userDropdownProps = userDropdown.props();
            //check existence of props that are values
            expect(userDropdownProps.visible).toEqual(authProps.showNavbar);
            expect(userDropdownProps.notifications).toEqual(authProps.notifications);
            expect(userDropdownProps.showNotifications).toEqual(authProps.showNotifications);
            
            //check props that are functions
            expect(userDropdownProps.handleLogout).toEqual(authProps.authInfoResultsActions.sendLogoutInfo);
            checkPropFunctionCalled(userDropdownProps.handleLogout, authProps.authInfoResultsActions.sendLogoutInfo);

            expect(userDropdownProps.toggleNotifications).toEqual(authProps.displayActions.toggleNotificationsDisplay);
            checkPropFunctionCalled(userDropdownProps.toggleNotifications, authProps.displayActions.toggleNotificationsDisplay)

            
            expect(userDropdownProps.deleteNotification).toEqual(authProps.deleteNotification);
            checkPropFunctionCalled(userDropdownProps.deleteNotification, authProps.deleteNotification);

        });
    });
});