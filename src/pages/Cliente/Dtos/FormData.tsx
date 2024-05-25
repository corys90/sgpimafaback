// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id              : number,
    idCliente?      : number;
    tipoIdCliente?  : number; 
    tipoId?         : string;      
    dpto?           : string;      
    ciudad?         : string;
    direccion?      : string;
    estado?         : number; 
    nombres?        : string;
    apellidos?      : string;  
    email?          : string;    
    telefono?       : string; 
    user?           : string;    
    createdAt?      : string;
    updatedAt?      : string;        
}

export default FormData;
