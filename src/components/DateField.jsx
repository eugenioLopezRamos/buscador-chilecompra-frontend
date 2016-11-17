import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class DateField extends React.Component {

    constructor(state, props) {
        super(state, props);

        this.state = {
        
            startDate: moment(),
            
        }
        console.log("STARTING DATE", this.state.startDate)
    }

    handleChange = (date) => {
        let self = this;
        console.log("EVENT DATE", date);
        console.log("EVENT DATE TGT VLA", date);
        let newDate = moment(date).format("DD/MM/YYYY");

        this.setState({
            startDate: date
        }, () => self.props.onChange(newDate))
    }

    render = () => {

        return (
            <
             DatePicker dateFormat="DD-MM-YYYY"
             selected={this.state.startDate}
             onChange={this.handleChange}
             isClearable={true}
             locale="ES" 

            />
        )

    }
 }

 export default DateField;