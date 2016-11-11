import React, {PropTypes} from 'react';
import CollapsibleNavBar from './CollapsibleNavBar.jsx';
import ToggleNavBarButton from './ToggleNavBarButton.jsx';

class Header extends React.Component {
    

    constructor(props) {
      super(props);
      this.state = {
        showNavBar: false
      }
    }

    handleClick = (e) => {this.setState({showNavBar: !this.state.showNavBar})}

    render() {
      return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">

          <div className="navbar-header">

          <ToggleNavBarButton onClick={this.handleClick} />
            
            <a className="navbar-brand" href="#">{this.props.appName}</a>
          </div>

          <CollapsibleNavBar showNavBar={this.state.showNavBar} />

        </div>
      </nav>
      );
    }

}

    Header.propTypes = {
      appName: PropTypes.string.isRequired
    }

module.exports = Header;