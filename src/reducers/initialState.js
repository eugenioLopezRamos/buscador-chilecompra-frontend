import moment from 'moment';
import RESULTS_INITIAL_CHECKBOXES from '../constants/resultsInitialCheckboxes';
const initialDate = Object.freeze(moment()); //otherwise redux console.logs a warning due to 
//detecting a change in the object. I assume passing moment() reinstances the object everytime it's called.

//take only the first
const initialCheckboxes = RESULTS_INITIAL_CHECKBOXES.slice(0, 1);

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
        // //organismosPublicosFilter se utiliza en el AutoFillerInput para mostrar solo un subarray de los organismos.
        // o sea, { organismosPublicosFilter: "minister" } solo mostrará => ["ministerio del trabajo", "ministerio de hacienda" .... etc]
        // selectedOrganismoPublico => el organismoPublico seleccionado en el campo <select> (o sea la <option>[0] al cargarse, o la que sea seleccionada por el usuario).
        // y es la que se envia al servidor una vez que se realiza la acción "Submit"
        organismosPublicosFilter: "",
        selectedOrganismoPublico: "*",
        organismosPublicosFilteredSubset: [{"*":"Todos"}],
        codigoLicitacion: "",
        startDate: initialDate,
        alwaysFromToday: false,
        endDate: initialDate,
        alwaysToToday: false,
        palabrasClave: "",
        selectedEstadoLicitacion: "",
        rutProveedor: "",
        offset: 0,
        order_by: {fields: initialCheckboxes, order: "descending"}
    },
    messages: {errors: [], info: []}
}

export default initialState;