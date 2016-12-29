import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Header from './components/Header.jsx';
import App from './components/App';
//import Content from './components/Content.jsx';
import Introduction from './components/Introduction.jsx';
import InputFieldsContainer from './components/InputFieldsContainer.jsx';
import SearchResults from './components/SearchResults.jsx';
import UserPage from './components/user/UserPage.jsx';
import UserProfileData from './components/user/UserProfileData.jsx';
//import {getUserResults} from './actions/UserActions';
//import {validateToken} from './actions/authInfoResultsActions';
//import configureStore from './store/configureStore';


//const dispatch = store.dispatch;


//const store = configureStore();
  // const fetchPosts = () => {
  //   console.log("getuser", getUserResults);

  //   dispatch({types: ["GET_USER_RESULTS"], url: "/api/results"});
  // }

  // const authUser = () => {

  //  if(localStorage.getItem("session") && localStorage.getItem("session").length > 1){
  //     dispatch(validateToken());
  //   } 


  // }
//const store = configureStore()
//console.log("STOR", store);

//then in router
//<Route path='/myRoutePath' component={MyRouteHandler} onEnter={()=>store.dispatch(myRouteEnterAction())} />


// const routes = () => {
//   console.log("STOR", store)
//   return(    
//         <Route path="/" component={App} >
//           <IndexRoute component={Introduction}  />
//           <Route path="/busqueda" component={InputFieldsContainer}/>
//           <Route path="/inicio" component={UserPage} onEnter={ (store) => {console.log("insroe", store)}}/>
//           <Route path="/perfil" component={UserProfileData} />
//         </Route>
//   )

// }


export default (    
        <Route path="/" component={App} >
          <IndexRoute component={Introduction}  />
          <Route path="/busqueda" component={InputFieldsContainer}/>
          <Route path="/inicio" component={UserPage} />
          <Route path="/perfil" component={UserProfileData} />
        </Route>
  )



















// export default (
//   <Route path="/" component={App} >
//     <IndexRoute component={Introduction}  />
//     <Route path="/busqueda" component={InputFieldsContainer}/>
//     <Route path="/inicio" component={UserPage} />
//     <Route path="/perfil" component={UserProfileData} />
//   </Route>
// )

