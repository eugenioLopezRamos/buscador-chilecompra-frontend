import React, {PropTypes} from 'react';
//import CollapsibleNavBar from './CollapsibleNavBar.jsx';
//import ToggleNavBarButton from './ToggleNavBarButton.jsx';

// class Header extends React.Component {
    

//     constructor(props) {
//       super(props);
//       this.state = {
//         showNavBar: false
//       }
//     }

//   //   handleClick = (e) => {this.setState({showNavBar: !this.state.showNavBar})} //should be an action!
//   handleClick = (e) => { console.log("handleClick should call an action") }

//     render() {
//       return (
//       <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
//         <div className="container">

//           <div className="navbar-header">

//           <ToggleNavBarButton onClick={this.handleClick} />
            
//             <a className="navbar-brand" href="#">Placeholder</a>
//           </div>

//           <CollapsibleNavBar  />

//         </div>
//       </nav>
//       );
//     }

// }

    // Header.propTypes = {
    //   appName: PropTypes.string.isRequired
    // }
const Header = () => {
return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">

          <div className="navbar-header">

     
            
            <a className="navbar-brand" href="#">Placeholder</a>
          </div>

        </div>
      </nav>
)


}

export default Header;