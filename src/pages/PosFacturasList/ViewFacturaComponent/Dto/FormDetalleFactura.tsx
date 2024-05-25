// Create interface FormDataDetalleFactura

interface FormDetalleFactura {
    id?                 : number;
    idFactura           : number;
    idPos?              : number;
    codigoProducto      : number;
    descripcion         : string;
    cantidad            : number;
    unidadMedidaName    : string;
    unidadMedida        : number;
    valUnitario         : number;
    descuento           : number;
    valUnitarioDescuento: number;
    iva                 : number;    
    valIva?             : number;
    subTotal?           : number;
    total               : number;
    createdAt?          : string;    
    updatedAt?          : string;         
}

export default FormDetalleFactura;