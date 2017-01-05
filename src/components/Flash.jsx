import React from 'react';
import {getObjectPropsWithValues} from '../utils/miscUtils';
import {deleteMessages} from '../actions/messageActions';

const Flash = (props, {store}) =>  {

    const handleClick = () => {
        store.dispatch(deleteMessages());
    }
    //needs json stringify because [] == [] => false
    if(JSON.stringify(props.messages.info) === JSON.stringify([]) && 
        JSON.stringify(props.messages.errors) === JSON.stringify([]) ){
        return null;
    }
    else {
        // get only the properties that have values (instead of just containing objects which themselves have more properties.)
        let messages = getObjectPropsWithValues(props.messages)
        return(
                <div className="flash-center" onClick={handleClick}>
                    <div className="message-wrap">
                    {
                        Object.keys(messages).map(e => {
                            return(<div className="info">
                                        <div>{`${e}:`}</div>
                                        <span>{messages[e].length}</span>
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