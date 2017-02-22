import React from 'react'
import { shallow } from 'enzyme'
import AutoFillerInput from '../../inputs/AutoFillerInput.jsx';
//import {helpers} from '../../../helpers/inputFieldsContainerHelper';


function setup() {
  const props = {
    organismosPublicos: [
        {1337: "Ministerio aleatorio"}, {7248: "MOP - Dirección de Vialidad"}
        ],
    organismosPublicosFilteredSubset: [
        {7248: "MOP - Dirección de Vialidad"}
        ],
    organismosPublicosFilter: "vialidad",
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


describe('components', () => {
  describe('AutoFillerInput', () => {
    it('should render self and subcomponents', () => {
      const {enzymeWrapper, props} = setup()
      expect(enzymeWrapper.find('div').hasClass('selection-container')).toBe(true);
      //given mock filter "vialidad" (which produces organismosPublicosFilteredSubset as a prop),
      //there should be only 1 option on the select
      expect(enzymeWrapper.find('option').length).toBe(1);

      const inputElement = enzymeWrapper.find('.selection-container input.col-xs-12.col-md-10.col-lg-4.no-gutter');
      const inputElementProps = inputElement.props();

      expect(inputElementProps.value).toEqual(props.organismosPublicosFilter);
      expect(inputElementProps.placeholder).toEqual("Busca un organismo público (código o nombre)");
  
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
