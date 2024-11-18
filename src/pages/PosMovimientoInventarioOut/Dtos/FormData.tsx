// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id                 : number;
    idCodigo           : number;    
    nombre             : string;    
    idPos              : number;
    nmPos              : string;
    cantidad           : number;
    motivo             : number;
    descripcion        : string;     
    fechaMovimiento    : string;
    user               : string;    
    createdAt          : string;    
    updatedAt          : string;     
}

export default FormData;
