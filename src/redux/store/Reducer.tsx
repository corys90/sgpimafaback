import inicialState from "./InicialState";

const initialState: inicialState = {
    emp : {
        first_name : "",
        id_user: 0,
        last_name: "",
        profile: "",
        token: "",
        user: "",
        tipologia: {
            cumpleSiNoStatic: [],
            motivoInventarioStatic: [],
            sedes: [],
            tipoEmbalaje: [],
            tipoEstadoCaja: [],    
            tipoEstadoPosCaja: [],        
            tipoIdCliente: [],  
            tipoPagosAFavor: [],      
            tipoPrdCompuesto: [],       
            tipoProducto: [],     
            unidadMedida: [],  
            vendedores: [],
            cajas: []
        }
    }
};

const Reducer = (state: inicialState = initialState, action: any) => {

    switch(action.type){
        case "SetEntornoEmp" : {
            return {...state, emp: action.emp};
        }
        case "GetEntornoEmp" : {
            return {...state};
        }                      
        default: return state;
    }
}

export default Reducer;