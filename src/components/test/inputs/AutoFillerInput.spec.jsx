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
        expect(inputElementProps.value).toEqual(props.selectedOrganismoPublico);
        
        expect(inputElementProps.placeholder).toEqual("Busca un organismo público (código o nombre)");

        //there should be only 1 option on the select
        expect(inputElementProps.options.length).toEqual(props.organismosPublicosFilteredSubset.length);


    });

    it('Should successfully use the functions passed as props', () => {

        const {enzymeWrapper, props} = setup();

        const inputElement = enzymeWrapper.find('.selection-container Select');
        //Input is handled by react-select, so we don't test that.

        //tests selecting something on the select
        expect(props.onSelectionChange.mock.calls.length).toBe(0);
        inputElement.simulate('change', "7248");
        expect(props.onSelectionChange.mock.calls.length).toBe(1);

    });


  });
  
});
