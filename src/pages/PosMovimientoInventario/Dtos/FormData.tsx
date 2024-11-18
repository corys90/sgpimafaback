// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id                 : number;
    idCodigo           : number;    
    idPos              : number;
    cantidad           : number;
    lote               : string;    
    fechaVencimiento   : string;
    fechaMovimiento    : string;
    user               : string;    
    createdAt          : string;    
    updatedAt          : string;     
}

export default FormData;
