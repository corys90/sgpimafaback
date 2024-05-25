// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?             : number;
    idCaja?         : number;    
    idPos?          : number;
    idFactura?      : number;
    formaPago?      : number;    
    valorRecibido?  : number;
    valorDevuelto?  : number;
    valorPagado?    : number; 
    fechaPago?      : string;
    user?           : string;    
    createdAt?      : string;    
    updatedAt?      : string; 
    nmPos           : string;
    nmCja           : string;   
}

export default FormData;
