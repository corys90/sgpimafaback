// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?                 : number;
    idFactura           : number;
    idPos?              : number;
    tipoCliente         : number;
    nit                 : string;
    razonSocial         : string;
    dpto                : string;
    ciudad              : string;
    direccion           : string;
    telefono            : string;
    concepto            : string;    
    fechaFactura?       : string;
    fechaVencimiento?   : string;
    formaPago           : number;
    idVendedor          : number;
    user                : string;
    subTotal            : number;
    descuento           : number;
    iva                 : number;
    totalOprecaion      : number;
    retefuente          : number;
    reteIca             : number;
    total               : number;  
    createdAt?          : string;    
    updatedAt?          : string;         
}

export default FormData;
