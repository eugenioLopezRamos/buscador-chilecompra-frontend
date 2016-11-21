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
    }


    componentDidMount = () => {
        let initialDate = moment(this.state.startDate).format("DD-MM-YYYY");
        this.props.onChange(initialDate)
    }

    handleChange = (date) => {
        let self = this;
        let newDate = moment(date).format("DD-MM-YYYY");

        this.setState({
            startDate: date
        }, () => self.props.onChange(newDate))
    }

    

    render = () => {

        return (
            <
             DatePicker 
                className="col-xs-12 col-md-10 col-lg-4 no-gutter"
                dateFormat="DD-MM-YYYY"
                selected={this.state.startDate}
                onChange={this.handleChange}
                isClearable={true}
                locale="ES" 
                minDate={moment().subtract(10, "years")}
                maxDate={moment()}

            />
        )

    }
 }

 export default DateField;