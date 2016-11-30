export default {
    organismosPublicos: {"1": "No hay organismos públicos disponibles en este momento"},
    codigosLicitacion: {"1": "No hay códigos disponibles en este momento"},
    login: false,
    user: {name: ""},
    results: {"empty": "emptyval"},
    test: {
            "Cantidad": "0",
            "FechaCreacion": "N/A",
            "Version": "N/A",
            "Listado": ["vacio"]
        },
    inputFieldValues: {
        // //organismosPublicosFilter se utiliza en el AutoFillerInput para mostrar solo un subarray de los organismos.
        // o sea, { organismosPublicosFilter: "minister" } solo mostrará => ["ministerio del trabajo", "ministerio de hacienda" .... etc]
        // selectedOrganismoPublico => el organismoPublico seleccionado en el campo <select> (o sea la <option>[0] al cargarse, o la que sea seleccionada por el usuario).
        // y es la que se envia al servidor una vez que se realiza la acción "Submit"
        organismosPublicosFilter: "",
        selectedOrganismoPublico: "",
        date: "",
        palabrasClave: "",
        seleccionEstadoLicitacion: "",
        rut: ""
    }
    //here goes the initial state
}