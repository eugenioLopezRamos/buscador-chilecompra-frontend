import React from 'react'
import { shallow } from 'enzyme'
import AutoFillerInput from '../../inputs/AutoFillerInput.jsx';



function setup() {
  const props = {
    addTodo: jest.fn()
  }

  const enzymeWrapper = shallow(<AutoFillerInput {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  describe('AutoFillerInput', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('div').hasClass('selection-container')).toBe(true);

      expect(enzymeWrapper.find('input').hasClass("col-xs-12 col-md-10 col-lg-4 no-gutter" )).toBe(true);
      expect(enzymeWrapper.find('select')).toBe(true);

      const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      expect(todoInputProps.newTodo).toBe(true)
      expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    })

    it('should call addTodo if length of text is greater than 0', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('TodoTextInput')
      input.props().onSave('')
      expect(props.addTodo.mock.calls.length).toBe(0)
      input.props().onSave('Use Redux')
      expect(props.addTodo.mock.calls.length).toBe(1)
    })
  })
})







/*import React from 'react';

const AutoFillerInput = (props) => {

    const handleSelectionChange = (event) => {
        props.onSelectionChange(event);
    }

    const handleInputChange = (event) => {

        props.onInputChange(props.organismosPublicos, event.target.value);
    }

       
        return(
        
                <div className="selection-container">
                    <input 
                        value={props.organismosPublicosFilter}
                
                        className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                        placeholder="Busca un organismo público (código o nombre)" 
                        id="opinput" 
                        onChange={handleInputChange}
                        />
                    <select value={props.selectedOrganismoPublico} onChange={handleSelectionChange} key="autofiller-select">
                        {   
                    
                            props.organismosPublicosFilteredSubset.map((e,i) => {
                        
                                let key = Object.keys(e)[0]
                                return <option value={key} key={key}>{e[key]} ({key})</option>

                                })
                        }
                    </select>
                </div>  
              
        )
}
export default AutoFillerInput;
*/

