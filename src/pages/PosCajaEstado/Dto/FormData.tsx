// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?             : number;
    idCaja?         : number;    
    idPos?          : number;
    valorEstado?    : number;
    fechaOperacion? : string;
    estado?         : number;
    userAccion?     : string;    
    createdAt?      : string;    
    updatedAt?       : string; 
    nmCaja          : string;
    nmPos           : string;
    nmEstado        : string;
}

export default FormData;
