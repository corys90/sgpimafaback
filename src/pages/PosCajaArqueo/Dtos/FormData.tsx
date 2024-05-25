// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?             : number;
    idCaja?         : number;    
    idPos?          : number;
    valor?          : number;
    fechaArqueo?    : string;
    estadoArqueo?   : number;
    revisorId?      : number; 
    user?           : string;    
    createdAt?      : string;    
    updateAt?       : string; 
    nmPos           : string;       
    nmCja           : string;  
    nmRev           : string;     
}

export default FormData;
