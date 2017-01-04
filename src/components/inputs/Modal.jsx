import React from 'react';


const Modal = (props) => {

    const confirmAction = () => {
        console.log("props", props);
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
                    <span className="modal-title">Ingresa un nombre (vacío: Fecha actual: ({`${new Date()}`})</span>
                </div>
                <input type="input" placeholder="Nombre" onChange={props.onInput}></input>

                <button type="button" className="btn btn-primary col-xs-6 col-md-4 col-md-offset-2" onClick={hideModal}>Cancelar</button>
                <button type="button" className="btn btn-primary col-xs-6 col-md-4 " onClick={confirmAction}>Guardar</button>

            </div>
    </div>)
}

export default Modal;