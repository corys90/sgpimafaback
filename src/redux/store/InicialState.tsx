export interface data {
    first_name: string;
    id_user: number;
    last_name: string;
    profile: string;
    token: string;
    user: string;
    sede: number;
    tipologia: {
        cumpleSiNoStatic: object[];
        motivoInventarioStatic: object[];
        sedes: object[];
        tipoEmbalaje: object[];
        tipoEstadoCaja: object[];    
        tipoEstadoPosCaja: object[];        
        tipoIdCliente: object[];  
        tipoPagosAFavor: object[];     
        tipoPrdCompuesto: object[];      
        tipoProducto: object[];    
        unidadMedida: object[];   
        vendedores:object [];         
        cajas: object[];                                                                 
    };
}

export default interface inicialState {
    emp: data
}