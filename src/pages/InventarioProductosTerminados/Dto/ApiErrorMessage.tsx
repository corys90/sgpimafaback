// Create interface ApiErrorMessage
// contine la estructura de datos de menajes de respeustas 
// de la Api con mensajes de error

interface ApiErrorMessage {
    id                  : string[],
    idCodigo            : string[],
    tipoProducto        : string[],
    idProductoCompuesto : string[],
    nombre              : string[],
    descripcion         : string[],   
    cantidad            : string[],
    valorUnitario       : string[],            
}

export default ApiErrorMessage;
