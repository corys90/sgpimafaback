// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id          : number,
    idPos       : number;
    nombre?     : string; 
    direccion?  : string;       
    latitud?    : number;
    longitud?   : number;
    estado?     : number;
    user        : string;    
    descripcion?: string;
    createdAt?  : string;
    updatedAt?  : string;
}

export default FormData;
