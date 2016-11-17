import React from 'react';

class SearchField extends React.Component {
    constructor(props, state) {
        super(props, state);

        this.state = {
            searchValue: this.props.searchValue,
            searchResults: {}
        }
    }

    handleChange = (e) => {
     //   this.setState({searchValue: e.target.value});
        this.props.onChange(e.target.value);
    
    }

    handleClick = (e) => {

   /*    let licitaciones;
       let self = this;
      fetch('/test', {accept: 'application/json', contentType: 'application/json'})
        .then(function(response) { return response.json()})
            .then(function(response) {
       
           licitaciones = response;
           
           console.log("lic", licitaciones);

            self.props.licitaciones(licitaciones);
        })*/

//    licitaciones = {"Cantidad":31,"FechaCreacion":"2016-11-14T12:42:09.707","Version":"v1","Listado":[{"CodigoExterno":"2105-32-L114","Nombre":"FARMACOS BRONCODILATADOR/CORTICOTERAPIA INHALATORIA","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-48-L114","Nombre":"FARMACOS CONTROLADOS ","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2471-363-L113","Nombre":"UTILES ESCOLARES, ESC. REP. DE MEXICO; SEP","CodigoEstado":8,"FechaCierre":"2014-01-08T19:26:00"},{"CodigoExterno":"2471-364-L113","Nombre":"MAT. MANUALIDADES-ESC.ARTURO MUTIZABAL-SEP","CodigoEstado":8,"FechaCierre":"2014-01-06T15:34:00"},{"CodigoExterno":"4012-1-L114","Nombre":"Compra de estuches de PVC para documentos.","CodigoEstado":7,"FechaCierre":"2014-01-10T19:30:00"},{"CodigoExterno":"1509-5-L114","Nombre":"Insumos Medicos y Medicamentos ","CodigoEstado":8,"FechaCierre":"2014-01-27T15:54:00"},{"CodigoExterno":"2105-38-LE14","Nombre":"ESOMEPRAZOL INYECTABLE","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-41-L114","Nombre":"FARMACOS ANTIBIOTICOS OFTALMICOS","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-49-L114","Nombre":"FARMACOS DIABETES (METFORMINA)","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2471-13-L114","Nombre":"Compra Leccionarios Unidades Educactivas DAEM 2014","CodigoEstado":8,"FechaCierre":"2014-01-27T15:00:00"},{"CodigoExterno":"2756-261-LP13","Nombre":"Propuesta pública Asesoría UTP DAEM","CodigoEstado":7,"FechaCierre":"2013-08-27T14:00:00"},{"CodigoExterno":"2105-1013-L113","Nombre":"INSUMOS MEDICOS ","CodigoEstado":8,"FechaCierre":"2013-10-29T12:00:00"},{"CodigoExterno":"2105-33-L114","Nombre":"FLUTICASONA INHALADOR","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-35-L114","Nombre":"CREMAS/SUPOSITORIOS/JARABES/GOTAS ORALES","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-36-L114","Nombre":"FLUTICASONA INHALADOR","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-40-L114","Nombre":"FARMACOS ANTIBIOTICOS INYECTABLES","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-42-L114","Nombre":"FARMACOS ANTICOAGULANTES","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-43-LE14","Nombre":"FARMACOS ANTIGLAUCOMATOSOS","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-44-LE14","Nombre":"FARMACOS COMPRIMIDOS VARIOS","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-4-L114","Nombre":"ELECTRODOS NEONATALES ","CodigoEstado":8,"FechaCierre":"2014-01-10T12:00:00"},{"CodigoExterno":"2471-287-L113","Nombre":"CURSO TECNOLOGICO APROPIACION DE TIC-P. HARRIS-SEP","CodigoEstado":7,"FechaCierre":"2013-10-04T18:00:00"},{"CodigoExterno":"2471-365-LE13","Nombre":"UNIFORMES INSTITUCIONALES; ESC. LOS HEROES; SEP","CodigoEstado":8,"FechaCierre":"2014-01-10T15:35:00"},{"CodigoExterno":"1509-6-L114","Nombre":"Medicamentos e Insumos No Despacho Cenabast","CodigoEstado":8,"FechaCierre":"2014-01-27T15:25:00"},{"CodigoExterno":"2105-1128-L113","Nombre":"INSUMOS MEDICOS ","CodigoEstado":8,"FechaCierre":"2013-12-10T12:00:00"},{"CodigoExterno":"2105-34-L114","Nombre":"CICLOSPORINAS","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-37-L114","Nombre":"ERITROPOYETINA ","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-39-LE14","Nombre":"FARMACOS ANTIRREUMATICOS ANTIARTRITICOS","CodigoEstado":8,"FechaCierre":"2014-01-28T09:00:00"},{"CodigoExterno":"2105-6-L114","Nombre":"ELEMENTOS DE PROTECCION PERSONAL  ","CodigoEstado":8,"FechaCierre":"2014-01-13T15:00:00"},{"CodigoExterno":"2471-317-L113","Nombre":"ESTUFAS Y KIT DE CAÑONES -ANTONIO MACHADO-SEP","CodigoEstado":7,"FechaCierre":"2013-11-05T16:00:00"},{"CodigoExterno":"2471-346-L113","Nombre":"MAT.LABORATORIO CIENCIA-LICEO NARCISO TONDREAU-SEP","CodigoEstado":8,"FechaCierre":"2013-12-27T23:33:00"},{"CodigoExterno":"608-128-L114","Nombre":"ern ESTERILIZACIÓN - MEMO Nº 4109  Sacos Papel Grado Médico","CodigoEstado":8,"FechaCierre":"2014-01-27T15:01:00"}]}
    
      //  self.props.licitaciones(licitaciones);



      this.props.onSubmit();





    }



    render = () => {
                return (
                <div>
                    <input className="col-xs-10" type="search" onChange={this.handleChange}/>

                    <button className="align-right" type="submit" onClick={this.handleClick} >
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </div>
                )
    }



}

export default SearchField;

