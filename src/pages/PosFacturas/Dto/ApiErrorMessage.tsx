// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    idPos?              : string[];   
    tipoCliente?        : string[];
    nit?                : string[];   
    razonSocial?        : string[];   
    dpto?               : string[];
    ciudad?             : string[];  
    direccion?          : string[];
    idVendedor?         : string[];    
}

export default ApiErrorMessage;
