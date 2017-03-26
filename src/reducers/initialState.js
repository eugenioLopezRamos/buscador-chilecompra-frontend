import moment from 'moment';
import {RESULTS_INITIAL_CHECKBOXES_ORDER_BY} from '../constants/resultsInitialCheckboxes';
const initialDate = Object.freeze(moment()); //otherwise redux console.logs a warning due to 
//detecting a change in the object. I assume passing moment() reinstances the object everytime it's called.

//take only the first
const initialFieldsOrderBy = RESULTS_INITIAL_CHECKBOXES_ORDER_BY;

const initialState = {
    organismosPublicos: [{"*": "Todos"}],
    estadosLicitacion: {"Todos": ""},
    display: {
                showNavbar: false,
                showNotifications: false
             },
    isAuthenticated: false,
    //same name as the rails param
    userData: null,
    userSearches: {},
    userSubscriptions: {},
    userNotifications: {},
    modifiedUserData: {name: "", email:"", currentPassword: "", password:"", passwordConfirmation: "", image: ""},
    //used when inputting data to login.
    loginData: {email: "", password: "", message: null, result: null},
    signup: {   
             info: {
                    name: "", 
                    email: "", 
                    password: "", 
                    password_confirmation:""
                },
             result: {
                    message: null, 
                    result: null
                }
            },
    searchResults: null,
    searchQueryValues: {
        selectedOrganismoPublico: "*",
        organismosPublicosFilteredSubset: [{"*":"Todos"}],
        codigoLicitacion: "",
        startDate: initialDate,
        alwaysFromToday: false,
        endDate: initialDate,
        alwaysToToday: false,
        palabrasClave: "",
        selectedEstadoLicitacion: "*",
        rutProveedor: "",
        offset: 0,
        order_by: {fields: initialFieldsOrderBy, order: "descending"}
    },
    messages: {Errores: [], Info: []}
}

export default initialState;