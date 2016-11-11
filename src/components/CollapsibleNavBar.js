import React from 'react';
import Login from './Login';


class CollapsibleNavBar extends React.Component {

constructor() {
    super()
    this.state = {
       collapsed: true
    }
}

render() {return  (<div id="navbar" className="navbar-collapse" >
                        < Login />
                    </div>) 


}  


}

module.exports = CollapsibleNavBar;

