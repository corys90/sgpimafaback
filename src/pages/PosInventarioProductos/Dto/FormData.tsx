// Create interface FormData
// contine la estructura de datos de formulario de envío

interface FormData {
    id?                 : number;   
    idPos?              : number;   
    idCodigo?           : number;
    tipoProducto?       : number;
    idProductoCompuesto : number;
    nombre              : string;
    descripcion         : string;
    cantidad            : number;
    valorUnitario       : number;
    unidadMedida        : number;
    lote                : string;
    color               : string;
    olor                : string;
    textura             : string;
    tamano              : string;
    peso                : number;
    embalaje            : number;
    temperatura         : number;
    stockMinimo         : number;
    descuento           : number;
    impuesto            : number;
    valorIva            : number;
    fechaCreacion       : string;
    diasVencimiento     : number;
    fechaVencimiento    : string;
    createdAt?          : string;    
    updatedAt?           : string;      
    nmPos               : string;
    nmPrdCmp            : string;     
}

export default FormData;
