import {FETCH_CHILECOMPRA_DATA, FETCH_ESTADOS_LICITACION, FETCH_ORGANISMOS_PUBLICOS} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';


const fetchReducer = (state = initialState, action) =>  {

    let newState = objectAssign({}, state);

    switch(action.type) {

        case 'estadosLicitacion':
            let getEstadosLicitacion = FETCH_ESTADOS_LICITACION();

            //etc etc para ajustar el estado y dejar newState.estadosLicitacion = resultado del fetch...
            return newState;


        case 'organismosPublicos':
        
            
            FETCH_ORGANISMOS_PUBLICOS();
            return newState;


        case 'chilecompraData':

            FETCH_CHILECOMPRA_DATA();
            return newState;


        default:
            return newState;

    }



}

export default fetchReducer;

