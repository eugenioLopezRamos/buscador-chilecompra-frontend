let initialState = {
    organismosPublicos: [{"*": "Todos"}],
    estadosLicitacion: {},
    login: false,
    user: {name: ""},
    results: {"empty": "emptyval"},
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
        date: "",
        palabrasClave: "",
        selectedEstadoLicitacion: "",
        rutProveedor: ""
    }
    //here goes the initial state
}

export default initialState;