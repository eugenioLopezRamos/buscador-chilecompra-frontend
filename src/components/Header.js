import React from 'react';
import CollapsibleNavBar from './CollapsibleNavBar'


class Header extends React.Component {
    
    handleClick() {

     document.querySelector("#navbar").classList.toggle("collapse");

    }
    render() {
      return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">

          <div className="navbar-header">

            <button type="button" className="navbar-toggle" onClick={this.handleClick} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            
              <span className="sr-only">Toggle navigation</span>

            </button>
            
            <a className="navbar-brand" href="#">Buscador ChileCompra</a>
          </div>

          < CollapsibleNavBar />
        </div>
      </nav>
      );
    }

}

module.exports = Header;