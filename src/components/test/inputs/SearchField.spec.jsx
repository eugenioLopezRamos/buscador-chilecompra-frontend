import React from 'react';
import {shallow} from 'enzyme';
import SearchField from '../../inputs/SearchField';

function setup() {

    const props = {
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        value: ""
   }

    const enzymeWrapper = shallow(<SearchField {...props}/>);

    return {
        enzymeWrapper,
        props
    }
}


describe('Component', () =>{

    describe('SearchField', () => {
       
        it('Should render self and subcomponents', () => {
            const {enzymeWrapper, props} = setup();
            expect(enzymeWrapper.find("div").length).toBe(1);

            expect(enzymeWrapper.find(".col-xs-10.col-md-10").length).toBe(1);
            const input = enzymeWrapper.find(".col-xs-10.col-md-10").at(0);
            expect(input.props().value).toEqual(props.value);
            expect(input.props().type).toEqual("search");
            expect(typeof input.props().onChange).toEqual("function");
            
            expect(enzymeWrapper.find(".col-xs-2.fullheight-btn.align-right").length).toBe(1);
            const button = enzymeWrapper.find(".col-xs-2.fullheight-btn.align-right").at(0);
            expect(button.props().type).toEqual("submit");
            expect(typeof button.props().onSubmit).toEqual("function");
            expect(typeof button.props().onClick).toEqual("function");


            expect(enzymeWrapper.find(".glyphicon.glyphicon-search").length).toBe(1);
            const icon = enzymeWrapper.find(".glyphicon.glyphicon-search").at(0);


        });

        it('Should calls functions passed as props successfully', () => {
            const {enzymeWrapper, props} = setup();
            const input = enzymeWrapper.find(".col-xs-10.col-md-10").at(0);
            expect(props.onChange.mock.calls.length).toBe(0);
            input.simulate("change", {target: {value: "new value"}});
            expect(props.onChange.mock.calls.length).toBe(1);

            const button = enzymeWrapper.find(".col-xs-2.fullheight-btn.align-right").at(0);
            expect(props.onSubmit.mock.calls.length).toBe(0);
            button.simulate("click", {preventDefault: () => "default prevented"});
            expect(props.onSubmit.mock.calls.length).toBe(1);

            button.simulate("submit", {preventDefault: () => "default prevented"});
            expect(props.onSubmit.mock.calls.length).toBe(1);


        });


    });


});


/*import React from 'react';
import {debouncer} from '../../utils/miscUtils';
const SearchField = (props) => {

    const handleChange = (event) => {
        props.onChange(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        props.onSubmit();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <input className="col-xs-10 col-md-10" value={props.value} type="search" onChange={handleChange}/>
            <button className="col-xs-2 fullheight-btn align-right" type="submit" onSubmit={handleSubmit} onClick={handleClick} >
                <span className="glyphicon glyphicon-search"></span>
            </button>
        </div>
    )
}
export default SearchField;*/