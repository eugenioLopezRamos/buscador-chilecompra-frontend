import React from 'react';
import {getObjectPropsWithValues} from '../../utils/miscUtils';
import {deleteMessages} from '../../actions/messageActions';
import {toJSON} from '../../utils/miscUtils'; // just JSON.stringify, but shorter

const Flash = (props, {store}) =>  {

    const handleClick = () => {
        store.dispatch(deleteMessages());
    }
    const messagesHandler = props.messagesHandler || null;

    //needs json stringify because [] == [] => false
    if(toJSON(props.messages.info) === toJSON([]) && 
        toJSON(props.messages.errors) === toJSON([]) ){
        return null;
    }
    else {
        // get only the properties that have values (instead of just containing objects which themselves have more properties.)
        let messages = getObjectPropsWithValues(props.messages)
        return(
                <div className="flash-center" onClick={handleClick}>
                    <div className="message-wrap">
                    {
                        Object.keys(messages).map((e) => {
                            //usar el valor de e para el handler q le voy a pasar a la function!
                            // ej: "errores", "guardado con exito", "repetido"
                            if(messages[e].length === 0) { return null}
                            return(<div key={`${e}-title`} className="info">
                                        <div>{`${e}:`}</div>
                                        <span>{messagesHandler ? messagesHandler(messages[e]) : messages[e]}</span>
                            </div>) 
                        })
                    }
                    </div>
                </div>
        )


    }

}

Flash.contextTypes = {
    store: React.PropTypes.object
}

export default Flash;