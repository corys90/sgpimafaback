// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    idCaja?         : string[];    
    idPos?          : string[]; 
    idFactura?      : string[]; 
    formaPago?      : string[];           
    valorRecibido?  : string[];       
    valorPagado?    : string[]; 
    fechaPago?      : string[];            
}

export default ApiErrorMessage;
