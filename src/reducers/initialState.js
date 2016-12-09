import moment from 'moment';
let initialDate = Object.freeze(moment()); //otherwise redux console.logs a warning due to 
//detecting a change in the object

let initialState = {
    organismosPublicos: [{"*": "Todos"}],
    estadosLicitacion: {"Todos": ""},
    showNavbar: false,
    isAuthenticated: false,
    //should be changed with an action on first load(similar to the orgPublicos one) that checks if a cookie with a valid token exists
    auth_token: null,
    //same name as the rails param
    userData: null,
    signupData: {
                 name: "", 
                 email: "", 
                 password: "", 
                 password_confirmation:""
                },
    //using the same format as the rails params so it's less work
    signupResult: {message: null, result: null},
    searchResults: {
            "Cantidad": "0"
        },
    inputFieldValues: {
        // //organismosPublicosFilter se utiliza en el AutoFillerInput para mostrar solo un subarray de los organismos.
        // o sea, { organismosPublicosFilter: "minister" } solo mostrará => ["ministerio del trabajo", "ministerio de hacienda" .... etc]
        // selectedOrganismoPublico => el organismoPublico seleccionado en el campo <select> (o sea la <option>[0] al cargarse, o la que sea seleccionada por el usuario).
        // y es la que se envia al servidor una vez que se realiza la acción "Submit"
        organismosPublicosFilter: "",
        selectedOrganismoPublico: "*",
        organismosPublicosFilteredSubset: [{"*":"Todos"}],
        codigoLicitacion: "",
        date: initialDate,
        palabrasClave: "",
        selectedEstadoLicitacion: "",
        rutProveedor: ""
    },
    searchType: "listado"
}

export default initialState;