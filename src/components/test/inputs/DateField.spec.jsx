import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import DateField from '../../inputs/DateField';

function setup() {
  const props = {
    startDate: Object.freeze(moment()),
    endDate: Object.freeze(moment()),
    setStartDate: jest.fn(),
    setEndDate: jest.fn(),
    toggleDateAlwaysToToday: jest.fn(),
    toggleDateAlwaysFromToday: jest.fn(),
    alwaysFromToday: false,
    alwaysToToday: false
  }

  const enzymeWrapper = shallow(<DateField {...props} />)
  //const handleSelectionChange = enzymeWrapper().instance().onSelectionChange;

  return {
    props,
    enzymeWrapper
  }
}

describe('Components', () => {

describe('DateField', () => {
    it('Should render self and subcomponents', () => {
        const {enzymeWrapper, props} = setup();

        const dateFormat = "DD-MM-YYYY";
        const locale = "ES";
        const minDate = moment(props.startDate).subtract(10, "years");
        const maxDate = props.startDate;
        const minuteInMs = 1000*60;

        function getDateDiffMs(date1, date2) {

            const first = moment.unix(date1/1000);
            const second = moment.unix(date2/1000);
            return Math.abs(first - second);
        }
        //outer component div
        expect(enzymeWrapper.find('div.date-field-container').length).toBe(1);
        //To + From
        expect(enzymeWrapper.find(".date-field-checkbox-container").length).toBe(2);
        expect(enzymeWrapper.find('.date-field-container-span').length).toBe(2);
        expect(enzymeWrapper.find('.date-field-container-checkbox').length).toBe(2);
        expect(enzymeWrapper.find('DatePicker').length).toBe(2);


        enzymeWrapper.find('DatePicker').forEach((element) => {
            expect(element.hasClass("col-xs-12 col-md-10 col-lg-8 no-gutter")).toBe(true);
        });

        const datePickerFrom = enzymeWrapper.find('DatePicker').at(0);
        const datePickerFromProps = datePickerFrom.props();

        const datePickerTo = enzymeWrapper.find('DatePicker').at(1);
        const datePickerToProps = datePickerTo.props();

        //datePicker FROM tests
        expect(datePickerFromProps.dateFormat).toEqual(dateFormat);
        expect(datePickerFromProps.selected).toEqual(props.startDate);
        expect(datePickerFromProps.onChange).toEqual(props.setStartDate);
        expect(datePickerFromProps.locale).toEqual(locale);

        //Since moment() is invoked on the component, I'm comparing the difference in unix timestamps
        // (testing that the difference is < a minute in ms, which I consider to be a fair margin of error)
        const fromMinDateDiff = getDateDiffMs(minDate, datePickerFromProps.minDate);
        expect(fromMinDateDiff < minuteInMs).toBe(true);
        const fromMaxDateDiff = getDateDiffMs(maxDate, datePickerFromProps.maxDate);
        expect(fromMaxDateDiff < minuteInMs).toBe(true);
        expect(datePickerFromProps.disabled).toEqual(props.alwaysFromToday);

        //datePicker TO tests
  
        expect(datePickerToProps.dateFormat).toEqual(dateFormat);
        //Ms differences happen when testing the functions, so it's more consistent
        // to test that the differences are irrelevant (sub minute)
        const toSelectedDate = getDateDiffMs(props.startDate, datePickerToProps.selected);
        expect(toSelectedDate < minuteInMs).toBe(true);
        expect(datePickerToProps.onChange).toEqual(props.setEndDate);
        expect(datePickerToProps.locale).toEqual(locale);

        //props.startDate since TO cannot be lower than FROM!
        const toMinDateDiff = getDateDiffMs(props.startDate, datePickerToProps.minDate);
        expect(toMinDateDiff < minuteInMs).toBe(true);
        const toMaxDateDiff = getDateDiffMs(maxDate, datePickerToProps.maxDate);
        expect(toMaxDateDiff < minuteInMs).toBe(true);

        expect(datePickerToProps.disabled).toEqual(props.alwaysToToday);
    })



});

describe('Should invoke the functions passed as props correctly', () => {
    
    it('Should invoke functions passed as props correctly', () => {
        const {enzymeWrapper, props} = setup();

        const datePickerFrom = enzymeWrapper.find('DatePicker').at(0);
        const datePickerFromProps = datePickerFrom.props();

        const datePickerTo = enzymeWrapper.find('DatePicker').at(1);
        const datePickerToProps = datePickerTo.props();

        const checkboxFrom = enzymeWrapper.find('.date-field-container-checkbox').at(0);
        const checkboxTo = enzymeWrapper.find('.date-field-container-checkbox').at(1);

        // expect(props.onSelectionChange.mock.calls.length).toBe(0);
        // selectElement.simulate('change',{target: {value: "7248"}});
        // expect(props.onSelectionChange.mock.calls.length).toBe(1);
        expect(datePickerFromProps.onChange.mock.calls.length).toBe(0);
        datePickerFrom.simulate("change", {target: {value: moment()}});
        expect(datePickerFromProps.onChange.mock.calls.length).toBe(1);

        expect(datePickerToProps.onChange.mock.calls.length).toBe(0);
        datePickerTo.simulate("change", {target: {value: moment()}});
        expect(datePickerToProps.onChange.mock.calls.length).toBe(1);

        //Since toggleDateAlwaysToToday/ToggleDateAlwaysFromToday are called
        //through an anonymous function, we'll test the mocks this way
        expect(props.toggleDateAlwaysFromToday.mock.calls.length).toBe(0);
        checkboxFrom.simulate("change", {target: {value: true}});
        expect(props.toggleDateAlwaysFromToday.mock.calls.length).toBe(1);

        expect(props.toggleDateAlwaysToToday.mock.calls.length).toBe(0);
        checkboxTo.simulate("change", {target: {value: true}});
        expect(props.toggleDateAlwaysToToday.mock.calls.length).toBe(1);

    });


});




})


/*

const DateField = ({startDate, endDate, setStartDate, 
                    setEndDate, toggleDateAlwaysFromToday, 
                    toggleDateAlwaysToToday, alwaysFromToday, alwaysToToday}) => {
    return (
            <div className="date-field-container">
            <span className="date-field-container-span-from">Desde:</span>
                <
                DatePicker 
                    className="col-xs-12 col-md-10 col-lg-8 no-gutter"
                    dateFormat="DD-MM-YYYY"
                    selected={startDate}
                    onChange={setStartDate}
                    locale="ES" 
                    minDate={moment().subtract(10, "years")}
                    maxDate={moment()}
                    disabled={alwaysFromToday}
                />
                <span className="date-field-checkbox-container">
                    <span className="date-field-container-checkbox-span-from">Siempre desde el dia actual:</span>
                    <input type="checkbox"
                            className="date-field-container-checkbox-from"
                            checked={alwaysFromToday}
                            onChange={(event) => {toggleDateAlwaysFromToday(event.target.checked)} }
                           
                    />
                </span>

            <span className="date-field-container-span-to">Hasta:</span>
                <
                DatePicker 
                    className="col-xs-12 col-md-10 col-lg-8 no-gutter"
                    dateFormat="DD-MM-YYYY"
                    selected={endDate}
                    onChange={setEndDate}
                    locale="ES" 
                    minDate={startDate}
                    maxDate={moment()}
                    disabled={alwaysToToday} 
                />
                <span className="date-field-checkbox-container">
                    <span className="date-field-container-checkbox-span-to">Siempre hasta el día actual:</span>
                    <input type="checkbox"
                           className="date-field-container-checkbox-to"
                           checked={alwaysToToday}
                           onChange={(event) => {toggleDateAlwaysToToday(event.target.checked)} }
                           
                     />
                </span>
            </div>)    
}

export default DateField;*/
