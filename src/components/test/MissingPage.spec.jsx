import React from 'react';
import {shallow} from 'enzyme';
import MissingPage from '../MissingPage';


function setup() {
    const props = {};
    const wrapper = shallow(<MissingPage {...props}/>);

    return {wrapper};
};


describe('Components', () => {
    const {wrapper} = setup();

    describe('MissingPage', () => {
        it('Should render the component', () => {

            expect(wrapper.find('.jumbotron.missing-page-jumbotron').length).toEqual(1);
            expect(wrapper.find('.missing-page-root').length).toEqual(1);
            expect(wrapper.find('.missing-page-text').length).toEqual(1);
            expect(wrapper.find('.missing-page-text').text()).toEqual("Oops, esa página no existe :(");
        });
    });
});