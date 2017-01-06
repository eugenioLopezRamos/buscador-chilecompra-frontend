import React from 'react';

const FullScreenPane = (props) => {
    
    const component = props.component || null;
    const menu = props.menu || null;

    const panel = () => {
        if(component || menu) {
            return (<div className="prompt-background">
                        {component ? component : null}
                        {menu ? menu : null}
                    </div>)
        }
    }

    return panel;
}

export default FullScreenPane;