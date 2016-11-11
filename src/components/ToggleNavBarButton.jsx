import React from 'react'

 
class ToggleNavBarButton extends React.Component {

render() {return(

    <button type="button" className="navbar-toggle" onClick={this.props.onClick} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">        
        <span className="sr-only">Toggle navigation</span>
    </button>
    
)}


}

export default ToggleNavBarButton;
 
