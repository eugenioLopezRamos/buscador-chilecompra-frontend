import React, {Component, PropTypes} from 'react';
import {getObjectPropsWithValues} from '../utils/miscUtils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteMessages} from '../actions/messageActions';

export class Flash extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
       return this.props.deleteMessages();
    }


    concatMessages = () => {
            return Object.keys(this.props.messages).reduce((accumulator, currentKey) => {
                        //Is there a message in that key or is it just empty?
                        if(this.props.messages[currentKey]) {
                            //if there is, add it to the array of messages
                            return accumulator.concat(this.props.messages[currentKey]);
                        }
                        //else just return
                        return accumulator;
                    }, []);
    }
    
    messages = () => getObjectPropsWithValues(this.props.messages);
    
    render = () => {
        let messages = this.concatMessages().length === 0 ? null : this.messages(); 
        return messages === null ? 
            null
            :
            (<div className="flash-center" onClick={this.handleClick}>
                <div className="message-wrap">
                {
                    Object.keys(messages).map((e) => {
                        //usar el valor de e para el handler q le voy a pasar a la function!
                        // ej: "errores", "guardado con exito", "repetido"
                        if(!messages[e] || messages[e].length === 0) { return null}
                        return(<div key={`${e}-title`} className="info">
                                    <div className="message-type">{`${e}:`}</div>
                                    <div className="message-body">{messages[e]}</div>
                        </div>) 
                    })
                }
                </div>
             </div>)

    }
}
Flash.propTypes = {
    messages: PropTypes.object
}

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteMessages: bindActionCreators(deleteMessages, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);