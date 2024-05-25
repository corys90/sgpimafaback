// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    idCaja?         : string[];    
    idPos?          : string[];   
    valorEstado?    : string[];
    estado?         : string[];             
}

export default ApiErrorMessage;
