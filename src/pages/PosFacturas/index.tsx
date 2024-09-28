import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, OverlayTrigger, ToggleButton, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaCartPlus, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "./Dto/ApiErrorMessage";
import FormData from "./Dto/FormData";
import logoEmp from '../../assets/logoPpal2.png';
import { formatDate, httpApiGet, httpApiPPPD } from "../../lib";
import FormDetalleFactura from "./Dto/FormDetalleFactura";
import MsgFacturaDialog from "../../component/MsgFacturaDialog";
import ModalPago from "../../component/ModalPago";
import MsgDialog from "../../component/MsgDialog";
import BarraMenu from "../../component/BarraMenu";

const pagOptions = {
    rowsPerPageText: "Filas por páginas",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
};

const customStyles = {
    header: {
        style: {
            color: "#2A3482",
            fontSize: "32px",
        },
    },
    headRow:{
        style: {
            color: "#2A3482",
            background:"#F5F5F5",
            fontSize: "14px",
        },
    },
}; 

const conditionalRowStyles =[ {
    when: (row: { estado: number; }) => row.estado === 1,
    style:{
        color: "#E8E8E8",
        backgroundColor: "white",
    }
}];

const loader = ()=> {
    return (
        <div className="spinner-border m-3" role="status"  style={{"color": "#2A3482"}}></div>
    );
}

const form: FormData = {
    id                  : 0,
    idFactura           : 0,
    idPos               : 0,
    tipoCliente         : 0,
    nit                 : "",
    razonSocial         : "",
    dpto                : "",
    ciudad              : "",
    direccion           : "",
    telefono            : "",
    concepto            : "",    
    fechaFactura        : "",
    fechaVencimiento    : "",
    formaPago           : 0,
    idVendedor          : 0,
    user                : "",
    subTotal            : 0,
    descuento           : 0,
    iva                 : 0,
    totalOprecaion      : 0,
    retefuente          : 0,
    reteIca             : 0,
    total               : 0,  
    createdAt           : "",    
    updatedAt           : ""  
};

const ApiErrMsg: ApiErrorMessage = {
    idPos               : [],
    tipoCliente         : [],
    nit                 : [],  
    razonSocial         : [], 
    dpto                : [],
    ciudad              : [], 
    direccion           : [],
    idVendedor          : []
};

const frmDetailType: FormDetalleFactura = {
    id: 0,
    idFactura: 0,
    idPos:0,
    CodigoProducto: 0, 
    Descripcion: "", 
    ValUnitario: 0, 
    Iva: 0, 
    Descuento: 0, 
    Cantidad: 0, 
    UnidadMedida: 0,
    UnidadMedidaName: "", 
    ValIva: 0, 
    ValUnitarioDescuento: 0, 
    SubTotal: 0,  
    Total: 0,
    createdAt: "",    
    updatedAt: "" 
};

const apiErrorDetail = {CodigoProducto: [], Cantidad: []};

const PosFacturas = () => {
    
    let [frmData, setFormData] = useState(form);    
    let [frmDetalle, setFormDetalle] = useState(frmDetailType);        
    const [frmDetalles, setFormDetalles] = useState([]);        
    const [pending, setPending] = useState(false); 
    // eslint-disable-next-line prefer-const
    let [apiError, setApiError] = useState(ApiErrMsg); 
    const [detralleApiError, setDetalleApiError] = useState(apiErrorDetail);     
    const [showInfo, setShowInfo] = useState(false);  
    const [showMsg, setShowMsg] = useState(false);    
    const [showPago, setShoPago] = useState(false);          
    let [tipoModal, setTipoModal] = useState(true);   
    let [mensajeModal, setMensajeModal] = useState([]);  
    const [sizeModal, setSizeModal] = useState("lg");           
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltPos, setSltPos] = useState([]);     
    let [idFactura, setIdFactura] = useState(""); 
    let [tipoDoc, setTipoDoc] = useState([]);   
    let [vendedores, setVendedores] = useState([]);                      
    const [fechaFactura, setFechFactura] = useState(formatDate(new Date()));                 
    const diasVencimiento = useRef(0);
    const [btnSearch, setBtnSearch] = useState(true); 
    const [btnSearchDetail, setBtnSearchDetail] = useState(true);  
    const [btnAddCar, setBtnAddCar] = useState(true);         
    let [existClient, setExistClient] = useState(true);     
    let [existProduct, setExistProduct] = useState(true);  
    let [maxCant, setMaxCant] = useState(0);      
    let [idVnd, setIdVnd] = useState(0);         
    const [width, setWidth] = useState(window.innerWidth);

    // Obtiene la fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
    const hh = (new Date().getHours()) < 10 ? `0${new Date().getHours()}`:`${new Date().getHours()}`;
    const mm = (new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}`:`${new Date().getMinutes()}`; 
    const fechaYhora = `${formatDate(new Date())}T${hh}:${mm}:00`; 

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [   
        {
            name: '',
            selector: (row: FormData, idx: number) => 
                <div className='d-flex gap-3 justify-center align-items-center' key={idx}>
                        <div><a href='#!' className=' text-danger'  title="Borra item" onClick={()=>borraItem(idx)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "80px",
            right: "true", 
            omit: (width > 1657)             
        },      
        {
            name: 'Código',
            selector: (row: FormDetalleFactura) => row.CodigoProducto,
            width: "100px",
            sortable: true,
            right:"true"
        },  
        {
            name: 'Descripción',
            selector: (row: FormDetalleFactura) => row.Descripcion,
            width: "150px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Precio ($)',
            selector: (row: FormDetalleFactura) => row.ValUnitario,
            width: "110px",
            right: "true",            
            sortable: true,  
            format: (row: FormDetalleFactura) => row.ValUnitario.toLocaleString()          
        },        
        {
            name: 'Cant.',
            selector: (row: FormDetalleFactura) => row.Cantidad,
            width: "100px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.Cantidad.toLocaleString()                  
        },  
        {
            name: 'U.M.',
            selector: (row: FormDetalleFactura) => row.UnidadMedidaName,
            width: "80px",
            wrap: true,
            sortable: true,          
        },         
        {
            name: 'Desc. (%)',
            selector: (row: FormDetalleFactura) => row.Descuento,
            width: "130px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.Descuento.toLocaleString(),
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
                color: 'red'
            },                         
        },   
        {
            name: 'Valor Desc. ($)',
            selector: (row: FormDetalleFactura) => row.ValUnitarioDescuento,
            width: "140px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.ValUnitarioDescuento.toLocaleString(),
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
                color: 'red'
            },              
        }, 
        {
            name: 'Sub Total ($)',
            selector: (row: FormDetalleFactura) => row.SubTotal,
            width: "130px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.SubTotal.toLocaleString(),
            style: {
                backgroundColor: '#8ABD93',
                color: 'black',
                fontWeight: 900
            },             
        },         
        {
            name: 'IVA (%)',
            selector: (row: FormDetalleFactura) => row.Iva,
            width: "100px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.Iva.toLocaleString()             
        },          
        {
            name: 'Valor IVA ($)',
            selector: (row: FormDetalleFactura) => row.ValIva,
            width: "130px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.ValIva.toLocaleString()              
        }, 
        {
            name: 'Total',
            selector: (row: FormDetalleFactura) => row.Total,
            width: "130px",
            right: "true",    
            sortable: true,
            format: (row: FormDetalleFactura) => row.Total.toLocaleString(),
            style: {
                backgroundColor: '#8ABD93',
                color: 'black',
                fontWeight: 900
            },                 
        },  
        {
            name: '',
            selector: (row: FormData, idx: number) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div><a href='#!' className=' text-danger'  title="Borra ítem" onClick={()=>borraItem(idx)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "80px",
            right: "true",  
            omit: (width <= 1656)                
        },                                                                               
    ];

    const Mensajes = (tipo: boolean, msjs: any, size: string) => {

        setShowMsg(true);
        tipoModal = tipo;
        setTipoModal(tipoModal);
        setMensajeModal(msjs);
        setSizeModal(size);

    }
    
    const handler = (e: any) => {

        const id: string = e.target.id;
        const value = e.target.value;
        frmData = {...frmData, [id]: value };
        setFormData({ ...frmData});
        apiError = {
            ...apiError,
            [id]: [],
        }
        setApiError({...apiError});

        // valida si tipocliente y nit contienen valores valido para habilitar el botón de busqueda
        setBtnSearch( !((parseInt(`${frmData.tipoCliente}`) !== 0) && (frmData.nit !== "")) );
    }

    const handlerProductoId = (e: any) =>{
        // valida si escribió un código de producto
        const id: string = e.target.id;
        const value = e.target.value;
        frmDetalle = {...frmDetalle, [id]: value };
        if (id === "cantidad"){
            if (parseInt(value) > maxCant ){
               frmDetalle = {...frmDetalle, [id]: 0 };     
            }
        }
        setFormDetalle({...frmDetalle});
        setBtnSearchDetail( !(frmDetalle.idCodigo !== "") );
        setBtnAddCar( (parseInt(`${frmDetalle.cantidad}`) <= 0) );
        if (id === "idCodigo"){
            frmDetalle.descripcion = "";
            frmDetalle.precio = 0;
            frmDetalle.iva = 0;
            frmDetalle.descuento = 0; 
            frmDetalle.cantidad = 0;
            setFormDetalle({...frmDetalle});  
            existProduct = true;
            setBtnAddCar(existProduct);    
            setExistProduct(true);         
        }
    }

    const handlerDiasVencimiento = () => {

        const ff: Date = new Date(`${fechaFactura}`);
        ff.setDate(ff.getDate() + parseInt(diasVencimiento.current.value) + 1);
        const ffactual = formatDate(ff);
        frmData.fechaFactura = formatDate(new Date());
        frmData.fechaVencimiento = ffactual;
        setFormData({...frmData, fechaVencimiento: ffactual});      

    }    
    
    const OnbtnGuardar = async () => {
        
        mensajeModal =  [];

        if ((frmData.idPos <= 0)){
            apiError = {
                ...apiError,            
                idPos:["Debe seleccionar un POS"],
            }      
        }

        if (frmData.tipoCliente <= 0){
            apiError = {
                ...apiError,            
                tipoCliente:["Se requiere un tipo de documento"],
            }               
        }
        
        if (frmData.nit.trim() === ""){
            apiError = {
                ...apiError,            
                nit:["Se requiere una identificación"],
            }               
        }

        if (frmData.razonSocial.trim() === ""){
            apiError = {
                ...apiError,            
                razonSocial:["Se requiere nombre o razón social"],
            }               
        }

        if (frmData.dpto.trim() === ""){
            apiError = {
                ...apiError,            
                dpto:["Se requiere el estado o dpto"],
            }               
        }

        if (frmData.ciudad.trim() === ""){
            apiError = {
                ...apiError,            
                ciudad:["Se requiere una ciudad"],
            }               
        }

        if (frmData.direccion.trim() === ""){
            apiError = {
                ...apiError,            
                direccion:["Se requiere una dirección"],
            }               
        }        
        
        if (frmData.idVendedor <= 0){
            apiError = {
                ...apiError,            
                idVendedor:["Debe seleccionar un vendedor"],
            }               
        }    

        if ((frmDetalles.length <= 0) 
            || (apiError.idPos && (apiError.idPos?.length > 0))
            || (apiError.nit && (apiError.nit?.length > 0))
            || (apiError.razonSocial && (apiError.razonSocial?.length > 0))       
            || (apiError.dpto && (apiError.dpto?.length > 0)
            || (apiError.ciudad && (apiError.ciudad?.length > 0))
            || (apiError.direccion && (apiError.direccion?.length > 0))            
            || (apiError.idVendedor && (apiError.idVendedor?.length > 0))))
            {

                setApiError({...apiError});  
            }else{
                frmData.createdAt = fechaYhora;
                frmData.updatedAt = fechaYhora;
       
                const fact = {
                    factHeader: {...frmData},
                    lista: frmDetalles
                };

                const response = await httpApiPPPD(`Posfactura`, "POST", {"Content-Type" : "application/json"}, fact);
                if (response.statusCode >= 400){
                    mensajeModal = ["Se presentó un problema al generar la factura"];
                    Mensajes(false, mensajeModal, "md");
                }else{

                    idFactura = response.data[0].idFactura;
                    setIdFactura(idFactura);
                    frmData.idFactura = parseInt(idFactura);
                    setFormData({...frmData});
                    setShowInfo(true);                      
                }
            }  
    }

    const borraItem = (idx: number) => {

        frmDetalles.splice(idx, 1);
        setFormDetalles([...frmDetalles]);
        calcularFactura();        
    }

    const buscaCliente = async () =>{
        const response = await httpApiGet(`Cliente/GetByIdentification/${frmData.tipoCliente}/${frmData.nit}`);

        if (response.statusCode >= 400){
            mensajeModal = response.statusCode === 404 ? ["Cliente no registrado"]: [];
            Mensajes(false, mensajeModal, "md");
            existClient = false;
            frmData.razonSocial = "";
            frmData.dpto = "";
            frmData.ciudad = "";
            frmData.direccion = "";
            frmData.telefono = "";
            setFormData({...frmData});
        }else{
            frmData.razonSocial = response.data[0].nombres + " " + response.data[0].apellidos;
            frmData.dpto = response.data[0].dpto;
            frmData.ciudad = response.data[0].ciudad;
            frmData.direccion = response.data[0].direccion;
            frmData.telefono = response.data[0].telefono;
            setFormData({...frmData});
            existClient = true;
            // Quita las alertas si están visibles
            apiError = {
                ...apiError,
                tipoCliente: [],
                nit        : [],  
                razonSocial: [], 
                dpto       : [],
                ciudad     : [], 
                direccion  : []            
            };
            setApiError({...apiError});

        }
        setExistClient(existClient);   

    }

    const getUnidadMedida = async (umId: number)=>{
        const response = await httpApiGet(`PosUnidadesMedida/${umId}`);
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            return response.data[0].nombre;                
        }
    }  

    const buscaProducto = async () =>{
        const response = await httpApiGet(`Posinventarioproducto/getProducto/${frmDetalle.CodigoProducto}`);
        if (response.statusCode >= 400){
            existProduct = true;
            mensajeModal = response.statusCode === 404 ? ["Producto no registrado"]: [];
            Mensajes(false, mensajeModal, "xl");
            frmDetalle.Descripcion = "";
            frmDetalle.ValUnitario = 0;
            frmDetalle.Iva = 0;
            frmDetalle.Descuento = 0;  
            frmDetalle.UnidadMedida = 0;
            frmDetalle.UnidadMedidaName = "";
            setFormDetalle({...frmDetalle});                               
        }else{
            frmDetalle.Descripcion = response.data[0].descripcion;
            frmDetalle.ValUnitario = response.data[0].valorUnitario;
            frmDetalle.Iva = response.data[0].impuesto;
            frmDetalle.Descuento = response.data[0].descuento;  
            maxCant =  response.data[0].cantidad; 
            frmDetalle.UnidadMedida = response.data[0].unidadMedida;
            frmDetalle.UnidadMedidaName = await getUnidadMedida(response.data[0].unidadMedida);              
            setMaxCant(maxCant);
            setFormDetalle({...frmDetalle});                   
            existProduct = false;
        }
        
        setExistProduct(existProduct);       

    }

    const onVendedorSelected = (idVendedor: number) =>{
        frmData.idVendedor = idVendedor;
        setFormData({...frmData});
        idVnd = idVendedor;
        setIdVnd(idVnd);
        apiError = {
            ...apiError,
            idVendedor: []           
        };
        setApiError({...apiError});      
    }

    const Vendedor = (props: {idVendedor: number, nombres: string, onClickCallback: any} ) =>{
        return(
            <div>
                <input type="radio" id={`vnd-${props.idVendedor}`} name={`vnd-vendedores`} className=" btn-check" 
                    autoComplete="off" onChange={props.onClickCallback} checked={props.idVendedor === idVnd}                    />
                <label className="text-wrap btn btn-outline-primary border rounded shadow text-center p-2 m-1 d-flex flex-column justify-content-center"  htmlFor={`vnd-${props.idVendedor}`}  style={{width:"150px", height:"130px"}}>
                    <div className="d-flex flex-column align-items-center " >
                        <div className="h1 fw-bold " >
                            {props.idVendedor}
                        </div>
                        <div className="h6 " >
                            {props.nombres}
                        </div> 
                    </div>
                </label>
            </div>
        )
    }

    const tooltip = (
        <Tooltip id="tooltip">
          <strong >Añada el producto a comprar</strong>
        </Tooltip>
    )  

    const calcularFactura = () => {
        let subT = 0;
        let tDesc = 0;
        let tIva = 0;
        let tOper = 0;
        let tRtfte = 0;
        let retIca = 0;
        let total = 0;

        frmDetalles.map((prd: FormDetalleFactura)=>{
            subT    += prd.SubTotal;
            tDesc   += prd.ValUnitarioDescuento;
            tIva    += prd.ValIva;
            tOper   += prd.Total;
        });

        tRtfte      = 0;
        retIca      = 0;
        total       = tOper + tRtfte + retIca;

        frmData.subTotal = subT;
        frmData.descuento = tDesc;
        frmData.iva = tIva;
        frmData.totalOprecaion = tOper;
        frmData.retefuente = tRtfte;
        frmData.reteIca = retIca;
        frmData.total = total;
    }
    
    const addProducto = () => {

        if (frmDetalle.Cantidad > maxCant){
            mensajeModal = [`No se puede añadir el producto. La cantidad solicitada es mayor al stock (${maxCant})`];
            Mensajes(false, mensajeModal, "xl");

        }else{
            frmDetalle.idPos = frmData.idPos;
            const valorcompra =  (frmDetalle.ValUnitario * frmDetalle.Cantidad);
            frmDetalle.ValUnitarioDescuento = ( valorcompra * (frmDetalle.Descuento/100) );     
            frmDetalle.SubTotal = (valorcompra - frmDetalle.ValUnitarioDescuento);              
            frmDetalle.ValIva = frmDetalle.SubTotal * (frmDetalle.Iva/100);
            frmDetalle.Total = ( frmDetalle.SubTotal + frmDetalle.ValIva);      
            frmDetalle.createdAt = fechaYhora;
            frmDetalle.updatedAt = fechaYhora;                  
            frmDetalles.push({...frmDetalle});
            setFormDetalles([...frmDetalles]);

            frmDetalle.CodigoProducto = 0;
            frmDetalle.Descripcion = "";
            frmDetalle.ValUnitario = 0;
            frmDetalle.Iva = 0;
            frmDetalle.Descuento = 0;
            frmDetalle.Cantidad = 0;
            setFormDetalle({...frmDetalle});
            calcularFactura(); 
        }
    }
    
    const imprimirFactura = ()=>{
        setShowInfo(false);
        setTimeout(() => {
            window.print();
        }, 1000); 
    }

    useEffect(()=>{

        const getTipoIdPos = async ()=>{
            const response = await httpApiGet("SedePos");
            if (response.statusCode >= 400){
                setOperacion(false);
                mensajeModal = [...response.messages];
    
                setMensajeModal(mensajeModal);            
                setShowInfo(true);
            }else{
                const fltr: any = response.data.filter((obj: any) => obj.estado !== 1);
                sltPos = [...fltr];
                setSltPos(sltPos);                   
            }
        }
  
        const getTipoDocumentos = async ()=>{
            const response = await httpApiGet("PosTipoIdCliente");           
            if (response.statusCode >= 400){
                setOperacion(false);
                mensajeModal = [...response.messages];
    
                setMensajeModal(mensajeModal);            
                setShowInfo(true);
            }else{
                const fltr: any = response.data.filter((obj: any) => obj.estado !== 1);
                tipoDoc = [...fltr];
                setTipoDoc(tipoDoc);                   
            }
        }

        const getListaVendedores = async ()=>{
            const response = await httpApiGet("PosVendedor");
            if (response.statusCode >= 400){
                setOperacion(false);
                mensajeModal = [...response.messages];
    
                setMensajeModal(mensajeModal);            
                setShowInfo(true);
            }else{
                vendedores = [...response.data];
                setVendedores(vendedores);                 
            }
        } 
              
        const handleResize = () => {

            setWidth(window.innerWidth);
        };
        
        getTipoIdPos();
        getTipoDocumentos(); 
        getListaVendedores();       

        handlerDiasVencimiento();

        frmData.concepto = "Venta de productos";
        setFormData({...frmData});

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []) 

    return(
        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className=' d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="row">
                        <div className="col-lg-12 col-md-12  col-sm-12 ">
                            <div className=" border p-1 rounded" style={{"color": "#2A3482"}}>
                                <a id="inicio"></a>
                                <div className=" row p-2">

                                    <div  className=" col-lg-8 col-md-12 ">
                                        <div className="col-lg-4 col-md-12 border rounded  w-100">
                                            <div className="text-center">
                                            <label className="h3 fw-bold">INTERNATIONAL MARITIME AND FISHERIES AGENCY SAS</label>
                                            <label className="h4 fw-bold">Nit 901146041</label>                       
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-12 ">
                                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                                        <div className="d-flex flex-column w-100">
                                                            <img src={logoEmp} alt="" className="img-fluid rounded-3 d-flex justify-content-center " />                                 
                                                        </div>
                                                    </div>                            
                                                </div>
                                                <div className="col-lg-8 col-md-12 ">
                                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                                        <div className="d-flex flex-column w-100">
                                                            <div className="h5 fw-bolder text-center">IVA Régimen Común</div>
                                                            <div className="h5 fw-bolder text-center">Actividad Económica ICA 0311 4.00 X 1000</div>   
                                                            <div className="h5  text-center">No somos Grandes Contribuyentes </div>         
                                                            <div className="h5  text-center">No Somos Agentes de Retención de IVA</div>                                     
                                                        </div>
                                                    </div>                                 
                                                </div>
                                            </div>
                                        </div>                    
                                    </div>

                                    <div  className=" col-lg-4 col-md-12 ">
                                        <div className=" col-lg-4 col-md-12 text-center border rounded p-4 w-100">
                                            <p className="h3 fw-bolder border p-2" style={{backgroundColor: "#85C4FF"}}> Factura De Venta No</p>
                                            <p className="h3 fw-bolder border p-2">{frmData.idFactura.toString().padStart(7, '0')}</p>   
                                            <p className="h5 text-wrap ">Documento Oficial de Autorización de Numeración Facturación Electrónica No. 18764058091641 que habilita desde IMAF 585 hasta IMAF 1000. Vence 2024-10-17</p>                              
                                        </div>                    
                                    </div>

                                </div>

                                <label htmlFor="" className="h3 p-2 m-2">Facturación de productos</label>
                                <form className='row border rounded p-2 m-2'>

                                    <div className=" h5 p-1 rounded" style={{backgroundColor: "#85C4FF"}}>Datos del cliente (obligatorios)</div>
                                    <hr className="pb-2" />

                                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="idPos" className="form-label">* Pos</label>                
                                        <select className="form-select" aria-label="Default select example" id="idPos" value={frmData.idPos} onChange={handler}  disabled={(btnRef == "Actualizar")}>
                                            <option value="0" >Seleccione POS</option>
                                            {
                                                sltPos.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                            }    
                                        </select>
                                        <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                                    </div> 

                                    <div className="col-lg-9 col-md-12 col-sm-12 mb-3 " style={{backgroundColor: "#F4F6F6"}}>
                                        <div className="  row d-flex border rounded">
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="idPos" className="form-label">* Tipo documento</label>                
                                                <select className="form-select" aria-label="Default select example" id="tipoCliente" value={frmData.tipoCliente} onChange={handler}  disabled={(btnRef == "Actualizar")}>
                                                    <option value="0" >Tipo Identificación</option>
                                                    {
                                                        tipoDoc.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{` ${opc.nombre} - ${opc.descripcion}`}</option>)
                                                    }    
                                                </select>
                                                <Alert show={apiError.tipoCliente && apiError.tipoCliente.length > 0} alert="#F3D8DA" msg={apiError.tipoCliente}/>                    
                                            </div> 
                                            <div className="col-lg-6 col-md-12 col-sm-12">
                                                <label htmlFor="idCliente" className="form-label">* Identificación</label> 
                                                <div className="w-100 d-flex ">
                                                    <div className="w-100">
                                                        <input type="text" className="form-control" id="nit"  placeholder="" value={frmData.nit} onChange={handler}/>                    
                                                    </div>                         
                                                    <div className="">                    
                                                        <Button className=" btn-secondary " onClick={buscaCliente} disabled={btnSearch} > <FaSearch /></Button>   
                                                    </div>                      
                                                </div>     
                                                <Alert show={apiError.nit && apiError.nit.length > 0} alert="#F3D8DA" msg={apiError.nit}/>                    
                                            </div>                                
                                        </div>
                                    </div>

                                    <fieldset className="col-lg-12 col-md-12 col-sm-12 mb-3" disabled={existClient ? true: false} >
                                        <div className="  row d-flex border rounded">
                                            
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="nombre" className="form-label">* Nombre Cliente</label>                  
                                                <input type="text" className="form-control" id="razonSocial"  placeholder="" value={frmData.razonSocial} onChange={handler}/>
                                                <Alert show={apiError.razonSocial && apiError.razonSocial.length > 0} alert="#F3D8DA" msg={apiError.razonSocial} />
                                            </div>

                                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="nombre" className="form-label">* Departamento</label>                  
                                                <input type="text" className="form-control" id="dpto"  placeholder="" value={frmData.dpto} onChange={handler}/>
                                                <Alert show={apiError.dpto && apiError.dpto.length > 0} alert="#F3D8DA" msg={apiError.dpto} />
                                            </div>   

                                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="nombre" className="form-label">* Ciudad</label>                  
                                                <input type="text" className="form-control" id="ciudad"  placeholder="" value={frmData.ciudad} onChange={handler}/>
                                                <Alert show={apiError.ciudad && apiError.ciudad.length > 0} alert="#F3D8DA" msg={apiError.ciudad} />
                                            </div>                         

                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="nombre" className="form-label">* Dirección</label>                  
                                                <input type="text" className="form-control" id="direccion"  placeholder="" value={frmData.direccion} onChange={handler}/>
                                                <Alert show={apiError.direccion && apiError.direccion.length > 0} alert="#F3D8DA" msg={apiError.direccion} />
                                            </div>   

                                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="nombre" className="form-label">Teléfono</label>                  
                                                <input type="text" className="form-control" id="telefono"  placeholder="" value={frmData.telefono} onChange={handler}/>
                                            </div>                                                

                                        </div>
                                        
                                    </fieldset>                

                                    <div className=" h5 p-1 rounded"  style={{backgroundColor: "#85C4FF"}}>Otros</div>
                                    <hr className="pb-2" />

                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Por Concepto De</label>                  
                                        <input type="text" className="form-control " id="concepto"  placeholder="" value={frmData.concepto} disabled onChange={handler}/>
                                        {/* <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre} /> */}
                                    </div>       
                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Fecha factura</label>                  
                                        <input type="date" className="form-control" id="fechaFactura"  placeholder="" value={frmData.fechaFactura} disabled onChange={handler}/>
                                        {/* <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre} /> */}
                                    </div>   
                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Días vencimiento</label>                  
                                        <input type="number" className="form-control text-end" id="diasVencimiento" min={0} defaultValue={0} ref={diasVencimiento} onChange={handlerDiasVencimiento}/>
                                    </div> 
                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Fecha vencimiento</label>                  
                                        <input type="date" className="form-control" id="fechaVencimiento" min={fechaFactura} placeholder="" value={frmData.fechaVencimiento} onChange={handler}/>
                                        {/* <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre} /> */}
                                    </div> 

                                    <div className=" h5 p-1 rounded"  style={{backgroundColor: "#85C4FF"}}>Vendedores</div>
                                    <hr />

                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                        <div className="btn-group d-flex justify-content-center flex-wrap gap-4" role="group" aria-label="Basic radio toggle button group">
                                            {
                                                vendedores.map((vnd: any, idx: number)=><Vendedor idVendedor={vnd.id} nombres={vnd.nombres} key={idx} onClickCallback={()=>onVendedorSelected(vnd.id)} />)
                                            }
                                        </div>
                                        <Alert show={apiError.idVendedor && apiError.idVendedor.length > 0} alert="#F3D8DA" msg={apiError.idVendedor} />
                                    </div> 
                                
                                    <div className=" h5 p-1 rounded"  style={{backgroundColor: "#85C4FF"}}>Producto</div>
                                    <hr />  

                                    <div className="col-lg-2 col-md-12 col-sm-12">
                                        <label htmlFor="idCliente" className="form-label">* Código</label> 
                                        <div className="w-100 d-flex ">
                                            <div className="w-100">
                                                <input type="number" min={0} className="form-control text-end" id="CodigoProducto"  placeholder="" value={frmDetalle.CodigoProducto} onChange={handlerProductoId} />                    
                                            </div>                         
                                            <div className="">                    
                                                <Button className=" btn-secondary " onClick={buscaProducto} disabled={btnSearchDetail} > <FaSearch /></Button>   
                                            </div>                      
                                        </div>     
                                        <Alert show={detralleApiError.CodigoProducto  && detralleApiError.CodigoProducto.length > 0} alert="#F3D8DA" msg={detralleApiError.CodigoProducto  }/>                    
                                    </div> 
                                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Descripción</label>                  
                                        <input type="text" className="form-control" id="Descripcion"  placeholder=""  disabled  value={frmDetalle.Descripcion} onChange={handler}/>

                                    </div> 
                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Precio</label>                                                                                                                                                                    
                                        <input type="text" className="form-control text-end" id="ValUnitario"  placeholder=""  disabled  value={frmDetalle.ValUnitario.toLocaleString()} onChange={handler}/>

                                    </div> 
                                    <div className="col-lg-1 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">IVA</label>                  
                                        <input type="text" className="form-control text-end" id="Iva"  placeholder="" disabled  value={frmDetalle.Iva} onChange={handler}/>

                                    </div> 
                                    <div className="col-lg-1 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Descuento</label>                  
                                        <input type="text" className="form-control text-end" id="Descuento"  placeholder="" disabled  value={frmDetalle.Descuento} onChange={handler}/>
                                    </div> 
                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor="nombre" className="form-label">Cantidad (un/gr)</label>                                                                                                                                                                    
                                        <input type="number"  min={0} max={maxCant} className="form-control text-end" id="Cantidad"  
                                                placeholder="" disabled={existProduct} value={frmDetalle.Cantidad} onChange={handlerProductoId}
                                        />
                                        <Alert show={detralleApiError.Cantidad && detralleApiError.Cantidad .length > 0} alert="#F3D8DA" msg={detralleApiError.Cantidad } />
                                    </div> 
                                    <div className="col-lg-1 col-md-12 col-sm-12 ">
                                        <label htmlFor="" className="form-label"></label>  
                                        <ButtonToolbar>
                                            <OverlayTrigger placement="top" overlay={tooltip}>                    
                                                <Button className="m-1 p-2 btn-success w-100" id="btnAdd" onClick={addProducto}  disabled={btnAddCar || (frmDetalle.Cantidad <= 0)} > <FaCartPlus /> </Button>   
                                            </OverlayTrigger> 
                                        </ButtonToolbar>                       
                                    </div>  
            
                                    {/* zona de detalle del produto */}
                                    <div className=" mt-3 mb-3 p-2 rounded">          
                                        <DataTable 
                                            title=""
                                            className="border rounded"
                                            columns={columnas}
                                            data={frmDetalles} 
                                            pagination
                                            highlightOnHover
                                            fixedHeader={true}
                                            paginationComponentOptions={pagOptions}    
                                            customStyles={customStyles}
                                            conditionalRowStyles={conditionalRowStyles} 
                                            progressPending={pending}
                                            progressComponent={loader()}             
                                        />
                                        <Alert show={frmDetalles.length <= 0} alert="#F3D8DA" msg={["Debe seleccionar los productos a vender"]} />                                 
                                    </div>                                   

                                    <div className=" h5 p-1 rounded"  style={{backgroundColor: "#85C4FF"}}>Resumen total a pagar</div>
                                    <hr /> 
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"SUBTOTAL"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.subTotal.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"DESCUENTO"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.descuento.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"I.V.A."} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.iva.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"TOTAL DE LA OPERACIÓN"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.totalOprecaion.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div>   
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"RETEFUENTE"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.retefuente.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div>                  
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"RETEICA"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.reteIca.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <div className="row  ">
                                            <div className="col-lg-9 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={"TOTAL MENOS RETENCIONES"} style={{backgroundColor: "#85C4FF"}}/>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-end border rounded p-1">
                                                <input type="text" className="form-control text-end fw-bold" disabled  value={`$ ${frmData.total.toLocaleString()}`} />
                                            </div>
                                        </div>
                                    </div>                                               
                                </form> 
                                <div className="row d-flex justify-content-center">  
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <Button className="m-1 p-2 btn-danger w-100 p-4" id="btnNuevaFactura" onClick={()=>location.reload()} >Nueva facturación</Button>   
                                    </div>   
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <Button className="m-1 p-2 btn-secondary w-100 p-4" id="btnPagar" disabled={(idFactura === "") ? true : false} onClick={()=>setShoPago(true)} >Pagar</Button>   
                                    </div> 
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <Button className="m-1 p-2 btn-success w-100 p-4" id="btnGuardar" disabled={(parseInt(`${frmData.idFactura}`) !== 0)} onClick={OnbtnGuardar} >Generar factura</Button>      
                                    </div>                         
                                </div>    
                                {/*                     */}  
                                { showMsg && <MsgDialog
                                    Title='Facturación'
                                    Message={mensajeModal}
                                    Icon={false}
                                    BtnOkName='Aceptar'
                                    BtnNokName=''
                                    Show={showMsg}
                                    HandlerdClickOk={()=> setShowMsg(false)}
                                    size="md"
                                    HandlerdClickNok={null}
                                />}                     
                                {showInfo && <MsgFacturaDialog
                                    Title='Facturación'
                                    Show={showInfo}
                                    HandlerdClickCerrar={()=> setShowInfo(false)}
                                    FacturaNro={`${idFactura.toString().padStart(7, '0')}`}
                                    HandlerdClickImprimir={imprimirFactura}
                                    size={sizeModal}
                                /> }   
                                {showPago && <ModalPago
                                    Show={showPago}
                                    HandlerdClickCerrar={()=> {
                                        setShoPago(false);
                                        //location.reload();                            
                                    }}
                                    Factura={`${frmData.idFactura.toString().padStart(7, '0')}`}
                                    Pago={`${frmData.total.toString().padStart(7, '0')}`}
                                /> }                                        
                            </div>            
                        </div>
                    </div>            
                </div>
                <div className='d-flex align-items-center justify-content-center '  style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>
    )
};

export default PosFacturas;