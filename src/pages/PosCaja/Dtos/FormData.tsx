// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?             : number;
    idPos?          : number;
    tipoId?         : string;      
    nombre?         : string;
    descripcion?    : string;
    user?           : string;    
    estado?         : number;
    createdAt?      : string;    
    updateAt?       : string;         
}

export default FormData;
