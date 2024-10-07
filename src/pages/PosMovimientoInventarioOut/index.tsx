import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import MsgDialog from "../../component/MsgDialog";
import { exportToExcel, getFechaYhora, httpApiGet, httpApiPPPD, init } from "../../lib";
import BarraMenu from "../../component/BarraMenu";
import FooterBar from "../../component/FooterBar";
import ToastAutoHide from "../../component/ToastAutoHide";
import GenericSelect from "../../component/GenericSelect";

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
            fontSize: "20px",
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

const conditionalRowStyles = [ {
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
    id              : 0,
    idPos           : 0,
    idCodigo        : 0, 
    cantidad        : 0,
    fechaMovimiento : "",
    motivo          : 0,    
    updatedAt       : "",
    createdAt       : "",
    user            : ""
};

const ApiErrMsg: ApiErrorMessage = {
    idPos       : [],
    idCodigo    : [],  
    cantidad    : [],
    motivo      : []      
};

const prdInit = {
    nombre: "", 
    descripcion:"", 
    stock: 0, 
    fechaVencimiento: getFechaYhora()
};

const PosMovimientoInventarioOut = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Historial de egresos");
    const [frmData, setFormData] = useState({...form});    
    const [pending, setPending] = useState(false); 
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    let [prd, setPrd] = useState({...prdInit});   
    const [showInfo, setShowInfo] = useState(false);    
    const [showToast, setShowToast] = useState(false);    
    const [operacion, setOperacion] = useState(true); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");        
    const [findsino, setFindsino] = useState(false);          
    let [opciones, setOpciones] = useState();
    let [motivos, setMotivos] = useState([]);               

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Nro.',
            selector: (row: FormData) => row.id,
            sortable: true,
            right: "true",
            width: "90px"
        },  
        {
            name: 'Código',
            selector: (row: FormData) => row.idCodigo,
            wrap: true,
            sortable: true,
            right: "true",
            width: "110px"            
        }, 
        {
            name: 'Nombre',
            selector: (row: FormData) => row.nombre,
            wrap: true,
            sortable: true,
            width: "250px"            
        },  
        {
            name: 'POS',
            selector: (row: FormData) => row.nmPos,
            wrap: true,
            sortable: true,
            width: "250px"       
        },         
        {
            name: 'Cantidad',
            selector: (row: FormData) => row.cantidad,
            wrap: true,
            sortable: true,
            right: "true",
        },              
        {
            name: 'Fecha',
            selector: (row: FormData) => row.fechaMovimiento?.substring(0, 10),
            grow: 4,
            wrap: true,
            sortable: true,            
        }                           
    ];

    const getOption = (opt: number) => {
        const slt = document.getElementById('idPos');
        const opc = slt[opt];
        return(opc.text);
    }

    const handler = (e: any) => {

        const id: string = e.target.id;
        const value = e.target.value;
        setFormData({ ...frmData, [id]: value });
        apiError = {
            ...apiError,
            [id]: [],
        }
        setApiError({...apiError});
    }

    const handlerGenSelect = (opt: {id: string, value: string, text: string}) => {

        const nv = parseInt(opt.value);
        setFormData({ ...frmData, [opt.id]: nv});
        apiError = {
            ...apiError,
            [opt.id]: [],
        }
        setApiError({...apiError});

    } 

    const listar = async () =>{
        const response = await httpApiGet("PosMovimientoInventarioOut/GetAll");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((cja: any) => {
                let obj = {};                
                obj = {...cja, nmPos: getOption(cja.idPos)};
                dta.push(obj);
            });
            data = [...dta];
            setData(data);                   
        }
    }

    const verListado = async () => {
        
        if (!estadosVisibles){
            listar();
        }
        setTituloBoton(!estadosVisibles ? "Ocultar egresos" : "Mostrar egresos");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
        prd = {...prdInit};
        setPrd(prd);

        setFormData({...form, fechaMovimiento: getFechaYhora() });
    } 
    
    const OnbtnGuardar = async () => {
        
        mensajeModal =  [];

        if ((frmData.idPos <= 0)){
            apiError = {
                ...apiError,            
                idPos:["Debe seleccionar un POS"],
            }
        }

        if ((frmData.idCodigo <= 0)){
            apiError = {
                ...apiError,            
                idCodigo:["Se requiere un valor válido"],
            }
        }

        if (frmData.cantidad <= 0){
            apiError = {
                ...apiError,            
                cantidad:["Se requiere un valor válido"],
            }               
        }

        if (frmData.motivo <= 0){
            apiError = {
                ...apiError,            
                motivo:["Se requiere seleccionar un motivo válido"],
            }               
        }
        
        if ((apiError.idCodigo && (apiError.idCodigo?.length > 0)) 
            || (apiError.idPos && (apiError.idPos?.length > 0))  
            || (apiError.cantidad && (apiError.cantidad?.length > 0))
            || (apiError.motivo && (apiError.motivo?.length > 0))){

            setApiError({...apiError});
        }else{
            frmData.createdAt = getFechaYhora();
            frmData.updatedAt = frmData.createdAt;
            
            if (prd.nombre === ""){
                mensajeModal = ["Escriba el código de un producto y pulse buscar"];
                setOperacion(false);
                setMensajeModal([...mensajeModal]);
                setShowInfo(true);    
            }else{

                frmData.cantidad = parseFloat(frmData.cantidad);
                frmData.idCodigo = parseInt(frmData.idCodigo);
                const response = await httpApiPPPD("PosMovimientoInventarioOut", "POST", {
                    "Content-Type" : "application/json"
                }, frmData);

                if (response.statusCode >= 400){
                    mensajeModal = [...response.message];
                    setOperacion(false);
                }else{
                    mensajeModal = ["Movimiento de egreso registrado con éxito!!!"];
                    setOperacion(true);
                }
                setMensajeModal([...mensajeModal]);
                setShowInfo(true);
                OnbtnLimpiar();
                listar();                   
            }
        }
    }  

    const buscaProducto = async () =>{

        if (frmData.idPos < 1){
            setOperacion(false);
            setMensajeModal(["Debe seleccionar un Pos para buscar el producto!!"]);
            setShowInfo(true);
        }else{
            const response = await httpApiGet(`inventarioproducto/getProducto/${frmData.idCodigo}`);          
            if (response.statusCode >= 400){
                setOperacion(false);
                setMensajeModal(response.messages);
                setShowInfo(true);
            }else{      

                let cant = 0;
                prd.nombre = response.data[0].nombre;
                prd.descripcion = response.data[0].descripcion;

                // trae la cantidad de stock del ineventario del POS
                const responseInvPos = await httpApiGet(`Posinventarioproducto/Pos/${frmData.idPos}/GetByProductoId/${frmData.idCodigo}`);
                if (responseInvPos.statusCode >= 400){
                    setFindsino(false);
                    setShowToast(true);                    
                }else{
                    setFindsino(true);
                    setShowToast(true);  
                    cant =  responseInvPos.data.length > 0 ? responseInvPos.data[0].cantidad : 0;                 
                }
                prd.stock =  cant;
                setPrd({...prd});
            }                
        }
    }

    const exportTo = () => {

        exportToExcel(`MovimientoInventario-${getFechaYhora()}.xls`, data);

    }     

    const inicio = async () =>{
        const res = await init();
        motivos = res.data.motivoInventarioStatic;
        setMotivos([...motivos]);
    }

    useEffect(()=>{

        inicio();

        frmData.fechaMovimiento = getFechaYhora();
        setFormData({...frmData})

    }, []); 

    return(
        <div  className="container">
            <BarraMenu /> 
            <div>            
                <div className="container border rounded " style={{"color": "#2A3482"}}>
                    <a id="inicio"></a>
                    <div className="d-flex">
                        <div className="h3 p-2 m-2  text-center text-wrap w-100">Egreso de inventario</div>                                  
                    </div>

                    <form >
                        <div className='row border '>
                            <div className="row my-3">
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="idPos" className="form-label">* Pos</label>                
                                    <GenericSelect 
                                        Url="SedePos" 
                                        ValueField="id"
                                        ValueText="nombre"
                                        Value={`${frmData.idPos}`} 
                                        onSelect={handlerGenSelect} 
                                        ClassName="form-select" 
                                        id={`idPos`}
                                    />  
                                    <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                                </div>   
                                <div className="col-lg-4 col-md-12 col-sm-12 offset-lg-4 mb-3">
                                    <label htmlFor="fechaMovimiento" className="form-label">Fecha movimiento</label>                  
                                    <input type="date" className="form-control text-end" id="fechaMovimiento" value={frmData.fechaMovimiento?.substring(0, 10)}  onChange={()=>null}  disabled/>                                 
                                </div>                                                                  
                            </div>
                            <hr />
                            <div className="row my-3">
                                <label htmlFor="" className="mb-4">Datos del producto</label>
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3 ">
                                    <label htmlFor="idCodigo" className="form-label">* Código producto</label>                  
                                    <div className=" d-flex ">
                                        <input type="number" className="form-control text-end" id="idCodigo" min={0} placeholder="" value={frmData.idCodigo} onChange={handler} /> 
                                        <Button className="border-0 bg-secondary" onClick={buscaProducto} disabled={(frmData.idPos < 0) && (frmData.idCodigo < 1)}> <FaSearch /> </Button>                                                                              
                                    </div>
                                    <Alert show={apiError.idCodigo && apiError.idCodigo.length > 0} alert="#F3D8DA" msg={apiError.idCodigo} /> 
                                </div> 
                                <div className="col-lg-9 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="" className="form-label">Descripción</label>                  
                                    <input type="text" className="form-control " value={`${prd.nombre} - ${prd.descripcion}`} onChange={()=>null} disabled/>                                 
                                </div>                             
                                <div className="col-lg-1 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="" className="form-label">Stock</label>                  
                                    <input type="text" className="form-control text-end" value={prd.stock} onChange={()=>null}  disabled/>                                 
                                </div>                                
                            </div>
                            <hr />
                            <div className="row  my-3">
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="cantidad" className="form-label">* Cantidad</label>                  
                                    <input type="number" className="form-control text-end" id="cantidad"  placeholder="" value={frmData.cantidad} onChange={handler} /> 
                                    <Alert show={apiError.cantidad && apiError.cantidad.length > 0} alert="#F3D8DA" msg={apiError.cantidad} />                                                                             
                                </div> 
                                <div className="col-lg-10 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="lote" className="form-label">* Motivo egreso</label>                  
                                    <GenericSelect 
                                        Data={motivos}
                                        ValueField="id"
                                        ValueText="label"
                                        Value={`${frmData.motivo}`} 
                                        onSelect={handlerGenSelect} 
                                        ClassName="form-select" 
                                        id={`motivo`}
                                    />
                                    <Alert show={apiError.motivo && apiError.motivo.length > 0} alert="#F3D8DA" msg={apiError.motivo}/>                                                                                                                   
                                </div>                                                              
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 offset-lg-2  my-3">
                                <Button className="m-1 p-2 btn-success w-100" id="btnGuardar" onClick={OnbtnGuardar}  >{btnRef}</Button>   
                            </div>   
                            <div className="col-lg-4 col-md-12 col-sm-12  my-3">
                                <Button className="m-1 p-2 btn-danger w-100 " id="btnLimpiar" onClick={OnbtnLimpiar} >Limpiar</Button>      
                            </div>                         
                      
                        </div>     
                    </form> 

                    {/* zona de grilla con listado de las sedes creadas */}
                    <div className="ms-2 mb-2 form-check form-switch h4 my-3">    
                        <label htmlFor="versedes" className="form-check-label">{tituloBoton}</label>                       
                        {
                            estadosVisibles ? <input type="checkbox" className="form-check-input" id="versedes" role="switch" onChange={verListado} style={{backgroundColor: "#2A3482"}}/>
                                            :  <input type="checkbox" className="form-check-input" id="versedes" role="switch" onChange={verListado} />
                        }                            
                    </div> 
                    {
                        estadosVisibles && (
                                <div className="ms-2 mt-3 p-2 border rounded">  
                                    <div className="col-lg-6 col-md-12 col-sm-12 offset-6 mb-1 ">
                                        <div className="d-flex justify-content-end mt-3">
                                            <Button className="m-1 p-2 btn-secondary w-25" onClick={exportTo} >Exportar a excel</Button>                                             
                                        </div>
                                    </div>  

                                    <DataTable 
                                        title="Historial de egresos"
                                        className="border rounded"
                                        columns={columnas}
                                        data={data} 
                                        pagination
                                        highlightOnHover
                                        fixedHeader={true}
                                        paginationComponentOptions={pagOptions}    
                                        customStyles={customStyles}
                                        conditionalRowStyles={conditionalRowStyles} 
                                        progressPending={pending}
                                        progressComponent={loader()}             
                                    />
                                </div>                  
                        )
                    }           
                    { showInfo && <MsgDialog
                        Title='Egresos de inventario'
                        Message={mensajeModal}
                        Icon={operacion}
                        BtnOkName='Aceptar'
                        BtnNokName=''
                        Show={showInfo}
                        HandlerdClickOk={() => setShowInfo(false)}
                        HandlerdClickNok={null} size={"md"}                        
                    />}       
                    { showToast && <ToastAutoHide
                        class="p-2 m-2 " 
                        show={showToast} 
                        timeoff={5000}
                        message={(findsino) ? "Producto encontrado en este P.O.S." : "Producto no encontrado en este P.O.S."} 
                        onTimeOff={()=>setShowToast(false)}
                        type={findsino}
                    />}      
                </div>            
            </div>     
            <FooterBar/>                              
        </div>
    )
};

export default PosMovimientoInventarioOut;