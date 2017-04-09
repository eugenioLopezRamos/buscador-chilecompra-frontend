import {notificationMock} from './notificationMock';
import {subscriptionsMock} from './subscriptionsMock';
import {searchesMock} from './searchesMock';
import {userDataMock} from './userDataMock';

export const initialDataLoadMock = {
    user: userDataMock,
    notifications: notificationMock,
    searches: searchesMock,
    subscriptions: subscriptionsMock
};