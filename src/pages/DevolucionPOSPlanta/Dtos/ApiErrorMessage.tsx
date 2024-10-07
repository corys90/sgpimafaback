// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {   
    idPos?                  : string[];   
    fechaMovimiento?        : string[];
    solicitante?            : string[]; 
    fresco?                 : string[];  
    congelado?              : string[]; 
    temperaturaVh?          : string[];  
    color?                  : string[];   
    olor?                   : string[];      
    textura?                : string[]; 
    tamano?                 : string[];     
    empaque?                : string[]; 
    observacionOrg?         : string[];     
    observacionSol?         : string[];     
    observacionDes?         : string[];
}

export default ApiErrorMessage;
