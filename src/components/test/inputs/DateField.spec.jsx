import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import DateField from '../../inputs/DateField';


function setup() {
  const props = {
    startDate: moment(),
    endDate: moment(),
    setStartDate: jest.fn(),
    setEndDate: jest.fn(),
    toggleDateAlwaysToToday: jest.fn(),
    toggleDateAlwaysFromToday: jest.fn()
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

        expect(enzymeWrapper.find('div.date-field-container').length).toBe(1);


    })



});

describe('Should invoke the functions passed as props correctly', () => {
    
    it('Should invoke functions passed as props correctly', () => {


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
