// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    idCaja?         : string[];    
    idPos?          : string[];   
    valor?          : string[];
    fechaArqueo?    : string[];       
    revisorId?      : string[]; 
    estadoArqueo?   : string[];            
}

export default ApiErrorMessage;
