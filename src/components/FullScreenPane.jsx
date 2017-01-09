import React from 'react';

const FullScreenPane = (props) => {

    //not needed, but React gives a warning if I make these just render null and then call them on the return statement
    // "React.createElement: type should not be null, undefined, boolean, or number."
    //console.log("props", props);
    const component = props.component ? <props.component {...props.componentProps} /> : null;
  //  console.log("COMPONENT", component);
    const menu = props.menu ? <props.menu index={props.index}/> : null ;
    const show = props.show || false;

    let paneBackground = null;

    if(show === false || menu === null ) {
        return null;
    }

    const hide = (event) => {
        if(event.target === paneBackground) {
            props.hide();
        }

    }

    //TODO: .prompt-background-container uses !important to make the first div under it forcefully 100% width
    // See some way to NOT use !important
    return (<div className="prompt-background" onClick={hide} ref={(background) => {paneBackground = background;}}>
                <div className="prompt-background-container">
                    {component}
                    {menu}  
                </div>
            </div>)
}

export default FullScreenPane;