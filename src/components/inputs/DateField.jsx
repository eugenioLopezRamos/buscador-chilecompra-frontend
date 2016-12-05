import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


const DateField = ({startDate, setDate}) => {

    return <
             DatePicker 
                className="col-xs-12 col-md-10 col-lg-8 no-gutter"
                dateFormat="DD-MM-YYYY"
                selected={startDate}
                onChange={setDate}
                locale="ES" 
                minDate={moment().subtract(10, "years")}
                maxDate={moment()}
            />    
}

export default DateField;
