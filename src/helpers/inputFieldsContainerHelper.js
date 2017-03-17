import moment from 'moment';

export const helpers = {

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
                return {alwaysFromToday: !value, alwaysToToday: !value, startDate: moment(), endDate: moment()};
            },
            setEndDate: (value) => {
                return {endDate: value};
            },
            toggleDateAlwaysToToday: (value) => {
                return {alwaysToToday: !value, endDate: moment()};
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
            
