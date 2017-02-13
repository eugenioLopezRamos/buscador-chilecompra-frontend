export const helpers = {
            autoFillerInputChange: (organismosPublicos, value) => {

                let selectionResults = [];
                let defaultSelectedValue = "";
                let testRegex = new RegExp(value.toLowerCase());
                selectionResults = organismosPublicos.filter((e, i) => {

                    let key = Object.keys(e)[0]; // O sea que en el objeto {"1337": "Ministerio del interior"}, key === "1337"

                    if(testRegex.test(e[key].toLowerCase())) {
                        return e[key]; // Y aqui retorna el nombre ("Ministerio del interior")
                    }
                })

                if(selectionResults[0]) {
                    defaultSelectedValue = Object.keys(selectionResults[0])[0];
                }

                return {
                    organismosPublicosFilter: value,
                    selectedOrganismoPublico: defaultSelectedValue,
                    organismosPublicosFilteredSubset: selectionResults
                }
            },//when typing the name of the org publico in the input
            pickOrganismoPublico: (value) => { 
                return {selectedOrganismoPublico: value};
            }, //when <select>'ing the org publico

            estadoLicitacionSelect: (value) => {
                return {selectedEstadoLicitacion: value};
            },
            setStartDate: (value) => {
                return {startDate: value};
            },
            
            toggleDateAlwaysFromToday: (value) => {

                return {alwaysFromToday: !value, alwaysToToday: !value};
            },
            setEndDate: (value) => {
                return {endDate: value};
            },
            toggleDateAlwaysToToday: (value) => {
                return {alwaysToToday: !value};
            },
            rutInput: (value) => {
                return {rutProveedor: value};
            },
            codigoLicitacionInputChange: (value) => {
                return {codigoLicitacion: value};
            }, //typing the codigoLicitacion
            palabrasClaveInput: (value) => {
                return {palabrasClave: value};
            } //typing the palabrasClave
}
            
