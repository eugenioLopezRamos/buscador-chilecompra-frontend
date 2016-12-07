import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import SignupForm from './SignupForm.jsx';
//import InputFieldsContainer from './InputFieldsContainer.jsx';

const Introduction = () => {
   
        return (
            <div className="container jumbotron">
                <h2 className="text-center">¿Qué es buscador ChileCompra?</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                <br />
                Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                <p className="text-center">¡Intenta hacer una búsqueda!</p>
              
                <p className="text-center">O regístrate</p>
                <SignupForm />
            </div>
        )
}

export default Introduction;


// import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
 
// const App = ({ children }) =>
//     <div>
//         <h1>Filter table</h1>
//         { children }
//         <footer>
//             <Link to="/">Filterable Table</Link>
//             <Link to="/footer">About</Link>
//         </footer>
//     </div>;
 
// App.PropTypes = {
//     children: PropTypes.object
// }
 
// export default App;