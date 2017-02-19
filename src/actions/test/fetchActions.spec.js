//import fetchApi from '../../api/fetchApi';
import * as types from '../../constants/actionTypes';
import moment from 'moment';
import * as actions from '../fetchActions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import utils from '../../utils/authUtils';


// Mocks dev env process.env.API_HOST
process.env.API_HOST = "http://localhost:3000";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests chilecompra result fetcher', () => {
    
    it('should get chilecompra data from the backend successfully', () => {
        
        const requestBody = {
            codigoLicitacion: "",
            startDate: "2017-02-19T22:26:09.832Z",
            alwaysFromToday: false,
            endDate: "2017-02-19T22:26:09.832Z",
            alwaysToToday: false,
            palabrasClave: "",
            selectedEstadoLicitacion:"",
            rutProveedor: "",
            offset: 0,
            order_by: {
                fields: ["FechaCreacion"],
                order:"descending"
            }
        }
        //Yes, the data from the API is huge.
        const expectedResponse = {"values":[{"id":100972,"value":{"Listado":[{"Tipo":"L1","Items":{"Listado":[{"Cantidad":1.0,"Categoria":"Maquinaria para generación y distribución de energía / Generación de energía / Accesorios y componentes para motores","Correlativo":1,"Descripcion":"INSPECCION Y REPARACION MOTOR ELECTRICO.( ADJUNTO ESPECIFICACIONES TECNICAS)","Adjudicacion":null,"UnidadMedida":"Unidad","CodigoProducto":26101751,"NombreProducto":"Controles electrónicos de motor","CodigoCategoria":"26101700"}],"Cantidad":1},"Obras":"0","Estado":"Desierta (o art. 3 ó 9 Ley 19.886)","Etapas":1,"Fechas":{"FechaFinal":"2016-06-28T14:03:00","FechaCierre":"2016-07-04T15:03:00","FechaInicio":"2016-06-24T12:35:00","FechaCreacion":"2016-06-20T00:00:00","FechasUsuario":null,"FechaPublicacion":"2016-06-24T12:27:41.973","FechaAdjudicacion":"2017-02-19T11:18:57.94","FechaEstimadaFirma":null,"FechaPubRespuestas":"2016-06-28T14:05:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2016-07-04T15:04:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2016-07-15T10:04:00","FechaActoAperturaEconomica":"2016-07-04T15:04:00"},"Moneda":"CLP","Nombre":"INSPECCIÓN Y REPARACIÓN MOTOR ELECTRICO","Tiempo":null,"Contrato":"0","TipoPago":"4","Comprador":{"RutUnidad":"61.102.022-8","RutUsuario":"11.443.040-4","CargoUsuario":"SUPERVISOR","CodigoUnidad":"5775","ComunaUnidad":"","NombreUnidad":"CENTRO DE ABASTECIMIENTO (T) DEPTO. AB.","RegionUnidad":"Región del Biobío ","CodigoUsuario":"224424","NombreUsuario":"DOMINGO RIVAS DURAN","CodigoOrganismo":"111875","DireccionUnidad":"","NombreOrganismo":"ARMADA DE CHILE"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":1,"Descripcion":"INSPECCIÓN Y REPARACIÓN MOTOR ELÉCTRICO MARCA ELECTRICAL MOTOR","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2016-07-06T00:00:00","Numero":"42016","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=pKobVD5Bv2tXMPTzwNnPa9RDuUAsKeoSrg5Lz/VseeE=","NumeroOferentes":2},"CodigoEstado":7,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"4861-3-L116","MontoEstimado":2500000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":589,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"arivas@armada.cl","FuenteFinanciamiento":"AFL","TipoDuracionContrato":" ","NombreResponsablePago":"ARTURO RIVAS DURAN","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-41-2746813-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"","EmailResponsableContrato":"arivas@armada.cl","NombreResponsableContrato":"ARTURO RIVAS DURAN","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-19T15:00:08.903"},"created_at":"2017-02-19 15:00:13 -0300","updated_at":"2017-02-19 15:00:13 -0300"},{"id":100971,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":1.0,"Categoria":"Servicios profesionales, administrativos y consultorías de gestión empresarial / Servicios de recursos humanos / Servicios de personal temporal","Correlativo":1,"Descripcion":"TOTAL SERVICIOS SOLICITADOS ANEXO 4","Adjudicacion":null,"UnidadMedida":"Unidad","CodigoProducto":80111604,"NombreProducto":"Personal técnico temporal","CodigoCategoria":"80111600"},{"Cantidad":1.0,"Categoria":"Servicios profesionales, administrativos y consultorías de gestión empresarial / Servicios de recursos humanos / Servicios de personal temporal","Correlativo":2,"Descripcion":"TOTAL SERVICIOS SOLICITADOS ANEXO 5","Adjudicacion":null,"UnidadMedida":"Unidad","CodigoProducto":80111604,"NombreProducto":"Personal técnico temporal","CodigoCategoria":"80111600"}],"Cantidad":2},"Obras":"0","Estado":"Publicada","Etapas":1,"Fechas":{"FechaFinal":"2017-02-23T16:59:00","FechaCierre":"2017-02-28T11:08:00","FechaInicio":"2017-02-20T10:59:00","FechaCreacion":"2017-02-18T20:29:23.143","FechasUsuario":null,"FechaPublicacion":"2017-02-19T11:41:04.89","FechaAdjudicacion":"2017-03-23T11:09:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-02-24T15:59:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-02-28T11:09:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-03-23T11:09:00","FechaActoAperturaEconomica":"2017-02-28T11:09:00"},"Moneda":"CLP","Nombre":"MANTENCION O  REPARACION EQUIPOS DENTALES","Tiempo":"18","Contrato":"1","TipoPago":"2","Comprador":{"RutUnidad":"65.321.890-7","RutUsuario":"14.346.823-2","CargoUsuario":"SECRETARIA ADQUISICIONES","CodigoUnidad":"4428","ComunaUnidad":"Calbuco","NombreUnidad":"Departamento de Salud","RegionUnidad":"Región de los Lagos ","CodigoUsuario":"1030431","NombreUsuario":"CLAUDIA URIBE LONCON","CodigoOrganismo":"115011","DireccionUnidad":"Galvarino Riveros N°10","NombreOrganismo":"Ilustre Municipalidad de Calbuco"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"CONTAR CON SERVICIO DE SUMINISTRO PARA REALIZAR MANTENCIONES O REPARACIONES DE EQUIPOS DENTALES, COMO TAMBIEN PARA HABILITACION DE BOX DENTALES","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":5,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"3507-5-LE17","MontoEstimado":null,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"0","CantidadReclamos":17,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":0,"ObservacionContract":null,"DiasCierreLicitacion":"9","EmailResponsablePago":"nadia.almonacid@desamcalbuco.cl","FuenteFinanciamiento":"PRESUPUESTO DESAM","TipoDuracionContrato":" ","NombreResponsablePago":"NADIA ALMONACID","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"18","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-65-2462100-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"","EmailResponsableContrato":"director@desamcalbuco.cl","NombreResponsableContrato":"HERNAN SCHOLZ","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":4,"UnidadTiempoContratoLicitacion":"2"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-19T15:00:06.63"},"created_at":"2017-02-19 15:00:12 -0300","updated_at":"2017-02-19 15:00:12 -0300"}],"count":2,"limit":200,"offset":0}
        

        nock("http://localhost:3000")
            .post('/api/get_info')
            .reply(200, {data: expectedResponse});

        let expectedActions = [{
            type: types.FETCH_CHILECOMPRA_DATA_SUCCESS,
            data: {data: expectedResponse},
            query: requestBody
        }]

        const store = mockStore();

        return store.dispatch(actions.loadChilecompraData(requestBody))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          })

    })

    // it('should get chilecompra data from the backend unsuccessfully', () => {




    // })


})
// export const fetchChilecompraDataSuccess = (state, data) => {
//     return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data, query: state};
// }; 
// export const fetchChilecompraDataFailure = (state, data) => {
//     return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, data, query: state}
// }

// export const loadChilecompraData = (state) => {

//     return function(dispatch) {

//         return fetchApi.getChileCompraData(state)
//             .then(data => {dispatch(fetchChilecompraDataSuccess(state, data));})
//             .catch( error => {dispatch(fetchChilecompraDataFailure(state, error));} );
//     };  
// };

// export const shortLoadChilecompraData = (data) => {
//       return function(dispatch) {
//         return fetchApi.getChileCompraData(data);
//     };  
// }
