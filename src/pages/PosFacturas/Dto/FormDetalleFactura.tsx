// Create interface FormDataDetalleFactura

interface FormDetalleFactura {
    id?                 : number;
    idFactura           : number;
    idPos?              : number;
    CodigoProducto      : number;
    Descripcion         : string;
    Cantidad            : number;
    UnidadMedidaName    : string;
    UnidadMedida        : number;
    ValUnitario         : number;
    Descuento           : number;
    ValUnitarioDescuento: number;
    Iva                 : number;    
    ValIva?             : number;
    SubTotal?           : number;
    Total               : number;
    createdAt?          : string;    
    updatedAt?          : string;         
}

export default FormDetalleFactura;