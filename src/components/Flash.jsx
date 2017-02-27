import React from 'react';
import {getObjectPropsWithValues} from '../utils/miscUtils';
import {deleteMessages} from '../actions/messageActions';

const Flash = (props, {store}) =>  {

    const handleClick = () => {
        store.dispatch(deleteMessages());
    }
    const messagesHandler = props.messagesHandler || null;

    let concatMessages = Object.keys(props.messages).reduce((accumulator, currentKey) => {
        //Is there a message in that key or is it just empty?
        if(props.messages[currentKey]) {
            //if there is, add it to the array of messages
            return accumulator.concat(props.messages[currentKey]);
        }
        //else just return
        return accumulator;
    }, []);

    if(concatMessages.length === 0) {
        //did we end up with an empty array ^? return null
        return null;
    }
    else {
        // get only the properties that have values (instead of just containing objects which themselves have more properties.)
        let messages = getObjectPropsWithValues(props.messages);
        return(
                <div className="flash-center" onClick={handleClick}>
                    <div className="message-wrap">
                    {
                        Object.keys(messages).map((e) => {
                            //usar el valor de e para el handler q le voy a pasar a la function!
                            // ej: "errores", "guardado con exito", "repetido"
                            if(!messages[e] || messages[e].length === 0) { return null}
                            return(<div key={`${e}-title`} className="info">
                                        <div className="message-type">{`${e}:`}</div>
                                        <span className="message-body">{messagesHandler ? messagesHandler(messages[e]) : messages[e]}</span>
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