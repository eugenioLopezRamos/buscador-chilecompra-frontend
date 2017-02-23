import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


const DateField = ({startDate, endDate, setStartDate, 
                    setEndDate, toggleDateAlwaysFromToday, 
                    toggleDateAlwaysToToday, alwaysFromToday, alwaysToToday}) => {
    return (
            <div className="date-field-container">
            <span className="date-field-container-span">Desde:</span>
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
                    <span className="date-field-container-checkbox-span">Siempre desde el dia actual:</span>
                    <input type="checkbox"
                            className="date-field-container-checkbox"
                            checked={alwaysFromToday}
                            onChange={(event) => {toggleDateAlwaysFromToday(event.target.checked)} }
                           
                    />
                </span>

            <span className="date-field-container-span">Hasta:</span>
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
                    <span className="date-field-container-checkbox-span">Siempre hasta el día actual:</span>
                    <input type="checkbox"
                           className="date-field-container-checkbox"
                           checked={alwaysToToday}
                           onChange={(event) => {toggleDateAlwaysToToday(event.target.checked)} }
                           
                     />
                </span>
            </div>)    
}

export default DateField;
