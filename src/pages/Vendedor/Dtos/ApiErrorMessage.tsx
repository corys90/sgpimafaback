// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    idVendedor?     : string[];
    TipoIdVendedor? : string[];
    dpto?           : string[];        
    ciudad?         : string[];
    direccion?      : string[];
    nombres?        : string[];
    apellidos?      : string[];        
}

export default ApiErrorMessage;
