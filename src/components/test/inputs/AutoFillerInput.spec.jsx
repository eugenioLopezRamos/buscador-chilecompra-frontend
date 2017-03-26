import React from 'react'
import { shallow } from 'enzyme'
import AutoFillerInput from '../../inputs/AutoFillerInput.jsx';


function setup() {
  const props = {
    organismosPublicos: [
        {1337: "Ministerio aleatorio"}, {7248: "MOP - Dirección de Vialidad"}
        ],
    organismosPublicosFilteredSubset: [
        {7248: "MOP - Dirección de Vialidad"}
        ],
    organismosPublicosFilter: "vialidad",
    selectedOrganismoPublico: {7248: "MOP - Dirección de Vialidad"},
    onSelectionChange: jest.fn(),
    onInputChange: jest.fn()
  }

  const enzymeWrapper = shallow(<AutoFillerInput {...props} />)
  //const handleSelectionChange = enzymeWrapper().instance().onSelectionChange;

  return {
    props,
    enzymeWrapper
  }
}

describe('Components', () => {
  describe('AutoFillerInput', () => {
    it('should render self and subcomponents', () => {
        const {enzymeWrapper, props} = setup();

        //Component container should exist
        expect(enzymeWrapper.find('div').hasClass('selection-container')).toBe(true);

        const inputElement = enzymeWrapper.find('.selection-container Select');
        const inputElementProps = inputElement.props();

      //  console.log("INPUT ELEMENT", inputElement);
     //   console.log("ELEMENT PROPS", inputElementProps);
        //There should be one input element
        expect(inputElement.length).toBe(1)
        
        //Values for the input element should be the filter that was input
        expect(inputElementProps.value).toEqual(props.organismosPublicosFilter);
        
        expect(inputElementProps.placeholder).toEqual("Busca un organismo público (código o nombre)");


        const selectElement = enzymeWrapper.find('select');
        const selectElementProps = selectElement.props();

        //select element should exist and should be 1
        expect(selectElement.length).toBe(1);
        //given mock filter "vialidad" (which produces organismosPublicosFilteredSubset as a prop),
        //there should be only 1 option on the select
        expect(enzymeWrapper.find('option').length).toBe(1);


    });

    it('Should successfully use the functions passed as props', () => {

        const {enzymeWrapper, props} = setup();

        const inputElement = enzymeWrapper.find('.selection-container Select');
        const inputElementProps = inputElement.props();
        //tests inputting text into the <input/>
        expect(props.onInputChange.mock.calls.length).toBe(0);
        inputElement.simulate('change', {target: {value: ""}});
        expect(props.onInputChange.mock.calls.length).toBe(1);

        const selectElement = enzymeWrapper.find('select');
        const selectElementProps = selectElement.props();

        //tests selecting something on the select
        expect(props.onSelectionChange.mock.calls.length).toBe(0);
        selectElement.simulate('change',{target: {value: "7248"}});
        expect(props.onSelectionChange.mock.calls.length).toBe(1);

    });


  });
  
});
