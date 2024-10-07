// Create interface FormData
// contine la estructura de datos de formulario de envío

interface product {
    idCodigo        : number;
    especificaciones: string;
    SolCantidad     : number;
    SolUnidadMedida : number;
    temperatura     : number;
    lote            : string;
    fechaVencimiento: string;
}


interface FormData {
    idPos?               : number;
    fechaDevolucion?     : string;
    solicitante?         : string;
    fresco?              : boolean;
    congelado?           : boolean;    
    temperaturaVh?       : string;
    color?               : string;
    olor?                : string;    
    textura?             : string;    
    tamano?              : string;    
    empaque?             : string;
    observacionOrg       : string; 
    observacionSol       : string; 
    observacionDes       : string;     
    listProducts?        : product [];
    user?                : string;    
    createdAt?           : string;    
    updatedAt?           : string;     
}

export default FormData;
