import React from 'react';
import {shallow} from 'enzyme';
import Modal from '../../inputs/Modal';


function setup() {

    const props = {
        handler: jest.fn(),
        hideModal: jest.fn(),
        isModalShown: true,
        onInput: jest.fn(),
        modalValue: "",
        defaultName: "Mi nombre por defecto"
    }

    const enzymeWrapper = shallow(<Modal {...props}/>);

    return {
        props,
        enzymeWrapper
    }
}

describe('Components', () => {

    describe('Modal', () => {

        it('Should render self and subcomponents', () => {
            const {enzymeWrapper, props} = setup();

            expect(enzymeWrapper.find('.prompt-background').length).toBe(1);
            expect(enzymeWrapper.find(".prompt").length).toBe(1);
            expect(enzymeWrapper.find('.modal-header').length).toBe(1);
            expect(enzymeWrapper.find(".modal-header .modal-title").length).toBe(1);
            const modalTitle = enzymeWrapper.find(".modal-header .modal-title");
            expect(modalTitle.text()).toEqual(`Ingresa un nombre (Por defecto: ${props.defaultName})`)

            expect(enzymeWrapper.find("input").length).toBe(1);

            const input = enzymeWrapper.find("input").at(0);
            expect(input.props().placeholder).toEqual("Nombre");
            expect(input.props().type).toEqual("input");
            expect(input.props().onChange).toEqual(props.onInput);
            expect(input.props().value).toEqual(props.modalValue);

            const cancelBtn = enzymeWrapper.find(".btn.btn-primary.col-xs-6.col-md-4.col-md-offset-2").at(0);
            expect(cancelBtn.props().type).toEqual("button");
            expect(typeof cancelBtn.props().onClick).toEqual("function");
            //cancelButton counts as the zero since saveButton's classes are a subset of cancelBtn's
            const saveBtn = enzymeWrapper.find(".btn.btn-primary.col-xs-6.col-md-4").at(1);
            expect(saveBtn.props().type).toEqual("button");
            expect(typeof saveBtn.props().onClick).toEqual("function");
        });

        it('Should successfully call functions passed as props', () => {
            const {enzymeWrapper, props} = setup();

            const input = enzymeWrapper.find("input").at(0);
            const cancelBtn = enzymeWrapper.find(".btn.btn-primary.col-xs-6.col-md-4.col-md-offset-2").at(0);
            const saveBtn = enzymeWrapper.find(".btn.btn-primary.col-xs-6.col-md-4").at(1);

            expect(input.props().onChange.mock.calls.length).toBe(0);
            input.simulate("change", {target: {value: "otro valor"}});
            expect(input.props().onChange.mock.calls.length).toBe(1);

            expect(props.hideModal.mock.calls.length).toBe(0);
            cancelBtn.simulate("click");
            expect(props.hideModal.mock.calls.length).toBe(1);

            expect(props.handler.mock.calls.length).toBe(0);
            saveBtn.simulate("click");
            expect(props.handler.mock.calls.length).toBe(1);




        });
    });
});





/*import React from 'react';


const Modal = (props) => {

    const confirmAction = () => {
        props.handler();
    }

    const hideModal = () => {
        props.hideModal();

    }

    const isHidden = () => {
        let className = "prompt-background";

        if(!props.isModalShown) {
            className = className + " no-display";
        }
        
        return className;
    }

    return (
   <div className={isHidden()}>           
         <div className="prompt">
                <div className="modal-header">
                    <span className="modal-title">Ingresa un nombre {props.defaultName ? `(Por defecto: ${props.defaultName})` : null}</span>
                </div>
                <input type="input" placeholder="Nombre" onChange={props.onInput} value={props.modalValue}/>

                <button type="button" className="btn btn-primary col-xs-6 col-md-4 col-md-offset-2" onClick={hideModal}>Cancelar</button>
                <button type="button" className="btn btn-primary col-xs-6 col-md-4 " onClick={confirmAction}>Guardar</button>

            </div>
    </div>)
}

export default Modal;*/