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
import * as State from  "../../redux/store/InicialState";
import GenericSelectPersonalized from "../../component/GenericSelectPersonalized";
import { useSelector } from "react-redux";

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
    idCodigo        : 0, 
    cantidad        : 0,
    umName          : "",          
    lote            : "",
    fechaMovimiento : "",
    fechaVencimiento: "",    
    updatedAt       : "",
    createdAt       : "",
    user            : ""
};

const ApiErrMsg: ApiErrorMessage = {
    idPos       : [],
    idCodigo    : []    
};

const prdInit = {
    nombre: "", 
    descripcion:"", 
    stock: 0, 
    um: "", 
    fechaVencimiento: getFechaYhora().substring(0, 10) 
};

const MovimientoInventarioProduccion= () => {
    
    const emp:State.data = useSelector((state: any) => state.emp);  
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Historial ingreso");
    let [frmData, setFormData] = useState<FormData>(form);    
    const [pending, setPending] = useState(false); 
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    let [cpdata, setCpData] = useState([]); 
    let [prd, setPrd] = useState({...prdInit});   
    const [showInfo, setShowInfo] = useState(false);    
    const [showToast, setShowToast] = useState(false);    
    const [operacion, setOperacion] = useState(true); 
    let [mensajeModal, setMensajeModal] = useState<string[]>();       
    const [btnRef, setBtnRef] = useState("Guardar");        
    const [findsino, setFindsino] = useState(false);          
    let [opciones, setOpciones] = useState();          

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Nro.',
            selector: (row: any) => row.id,
            sortable: true,
            cell: (row: any) => <div className="w-100 text-end">{row.id}</div>,    
            width: "80px",  
        },  
        {
            name: 'Fecha ingreso',
            selector: (row: FormData) => row.fechaMovimiento.substring(0, 10),
            wrap: true,
            sortable: true, 
            width: "140px",             
        },        
        {
            name: 'Código',
            selector: (row: any) => row.idCodigo,
            wrap: true,
            sortable: true,
            cell: (row: any) => <div className="w-100 text-end">{row.idCodigo}</div>,    
            width: "100px",           
        }, 
        {
            name: 'Nombre',
            selector: (row: any) => row.nombre,
            wrap: true,
            sortable: true,
            width: "270px"            
        },        
        {
            name: 'Cantidad',
            selector: (row: FormData) => row.cantidad,
            wrap: true,
            sortable: true,
            cell: (row: FormData) => <div className="w-100 text-end">{Number(row.cantidad).toFixed(2)}</div>,    
            width: "110px", 
        }, 
        {
            name: 'Medida',
            selector: (row: FormData) => row.umName,
            sortable: true,
            cell: (row: FormData) => <div className="w-100">{row.umName}</div>,    
            width: "130px", 
        },               
        {    
            name: 'Lote',
            selector: (row: FormData) => row.lote,
            wrap: true,
            sortable: true,
            width: "250px" 
        },                    
        {
            name: 'Fecha Vencimiento',
            selector: (row: FormData) => row.fechaVencimiento.substring(0, 10),
            wrap: true,
            sortable: true,            
        }                                
    ];

    const handlertxt = (e: any) => {

        const id: string = e.target.id;
        const value = e.target.value;
        setFormData({ ...frmData, [id]: value });

        apiError = {
            ...apiError,
            [id]: [],
        }

        setApiError({...apiError});
    } 

    const listar = async () =>{
        const response = await httpApiGet("MovimientoInventarioProduccion/GetAll");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{

            const dta: any = [];
            response.data.map((cja: any) => {
                let obj = {};   
                const um: any = emp.tipologia.unidadMedida.filter((itm: any)=>itm.id === cja.um);          
                obj = {...cja, umName: (um.length > 0) ? um[0].nombre : ""};
                dta.push(obj);
            });
            data = [...dta];
            setData(data);   
            cpdata = [...dta];                 
            setCpData(cpdata);
        }
    }

    const verListado = async () => {
        
        if (!estadosVisibles){
            listar();
        }
        setTituloBoton(!estadosVisibles ? "Ocultar ingresos" : "Mostrar ingresos");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);

        prd = {...prdInit};
        setPrd({...prd});

        setFormData({...form, 
            fechaMovimiento: getFechaYhora().substring(0, 10),
            fechaVencimiento: getFechaYhora().substring(0, 10) 
        });
    } 
    
    const OnbtnGuardar = async () => {
        
        mensajeModal =  [];

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
        
        if ((apiError.idCodigo && (apiError.idCodigo?.length > 0)) 
            || (apiError.cantidad && (apiError.cantidad?.length > 0))){

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
                const response = await httpApiPPPD("MovimientoInventarioProduccion", "POST", {
                    "Content-Type" : "application/json"
                }, frmData);

                if (response.statusCode >= 400){
                    mensajeModal = [...response.message];
                    setOperacion(false);
                }else{
                    mensajeModal = ["Movimiento registrado con éxito!!!"];
                    setOperacion(true);
                }
                setMensajeModal([...mensajeModal]);
                setShowInfo(true);

                prd = {...prdInit};
                setPrd(prd);

                frmData = {...form};
                setFormData({...frmData, 
                    fechaMovimiento: getFechaYhora().substring(0, 10),
                    fechaVencimiento: getFechaYhora().substring(0, 10)
                });

                estadosVisibles && listar();              
            }
        }
    }  

    const buscaProducto = async () =>{

        const response = await httpApiGet(`inventarioproducto/getProducto/${frmData.idCodigo}`);          
        if (response.statusCode >= 400){
            setOperacion(false);
            setMensajeModal(response.messages);
            setShowInfo(true);
        }else{      

            let cant = 0;
            prd.nombre = response.data[0].nombre;
            prd.descripcion = response.data[0].descripcion;
            
            // trae la unidad de medida
            const um = emp.tipologia.unidadMedida.filter((itm: any)=>itm.id === response.data[0].unidadMedida);
            prd.um = (um.length > 0) ? um[0].nombre : "Sin definición";

            // trae la cantidad de stock del ineventario
            const responseInvPos = await httpApiGet(`InventarioProduccion/GetByProductoId/${frmData.idCodigo}`);
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

    const changeTextFiltro = (evnt: any) => {
        if (evnt.target.value.trim() === ""){
          setData([...data]);  
        }else{
            const reg = cpdata.filter((data: any)=> {
                return    data.idCodigo && data.idCodigo.toString().includes(evnt.target.value)
                       || data.nmPos && data.nmPos.toUpperCase().includes(evnt.target.value.toUpperCase())
                       || data.idCodigo && data.idCodigo.toString().includes(evnt.target.value) 
                       || data.nombre && data.nombre.toUpperCase().includes(evnt.target.value.toUpperCase())  
                       || data.lote && data.lote.toUpperCase().includes(evnt.target.value.toUpperCase()); 
            }); 
            data = [...reg] ;
            setData([...data]);              
        }
    }

    const exportTo = () => {

        exportToExcel(`MovimientoInventario-${getFechaYhora()}.xls`, data);

    }     

    const inicio = async () =>{
        const res = await init();
        opciones =  res.data;
        setOpciones(opciones);
    }

    useEffect(()=>{

        inicio();

        frmData.fechaMovimiento = getFechaYhora().substring(0, 10);
        frmData.fechaVencimiento = getFechaYhora().substring(0, 10);

        setFormData({...frmData})

    }, []); 

    return(
        <div  className="container">
            <BarraMenu /> 
            <div>            
                <div className="container border rounded " style={{"color": "#2A3482"}}>
                    <a id="inicio"></a>
                    <div className="d-flex">
                        <div className="h3 p-2 m-2  text-center text-wrap w-100">Ingreso de materias primas</div>                                  
                    </div>

                    <form >
                        <div className='row border '>
                            <div className="row my-3">
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="fechaMovimiento" className="form-label">Fecha movimiento</label>                  
                                    <input type="date" className="form-control text-end" id="fechaMovimiento" value={frmData?.fechaMovimiento}  disabled/>                                 
                                </div>                                                                  
                            </div>
                            <hr />
                            <div className="row my-3">
                                <label htmlFor="" className="mb-4">Datos del producto</label>
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3 ">
                                    <label htmlFor="idCodigo" className="form-label">* Código producto</label>                  
                                    <div className=" d-flex ">
                                        <input type="number" className="form-control text-end" id="idCodigo" min={0} placeholder="" value={frmData?.idCodigo} onChange={handlertxt} /> 
                                        <Button className="border-0 bg-secondary" onClick={buscaProducto} disabled={frmData.idCodigo < 1}> <FaSearch /> </Button>                                                                              
                                    </div>
                                    <Alert show={apiError.idCodigo && apiError.idCodigo.length > 0} alert="#F3D8DA" msg={apiError.idCodigo} /> 
                                </div> 
                                <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="" className="form-label">Descripción</label>                  
                                    <input type="text" className="form-control " value={`${prd.nombre} - ${prd.descripcion}`} disabled/>                                 
                                </div>                                
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="cantidad" className="form-label">Unidad de medida</label>                  
                                    <input type="text" className="form-control text-end" id="Umedida"  placeholder="" value={prd.um} disabled />                                                                            
                                </div>                                 
                            </div>
                            <hr />
                            <div className="row  my-3">
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="cantidad" className="form-label">* Cantidad</label>                  
                                    <input type="number"min={0} className="form-control text-end" id="cantidad"  placeholder="" value={frmData.cantidad} onChange={handlertxt} /> 
                                    <Alert show={apiError.cantidad && apiError.cantidad.length > 0} alert="#F3D8DA" msg={apiError.cantidad} />                                                                             
                                </div> 
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="lote" className="form-label">Lote</label>                  
                                    <input type="text" className="form-control" id="lote"  placeholder="" value={frmData.lote} onChange={handlertxt} />                                                                              
                                </div>     
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="versedes" className="form-check-label"></label>                      
                                    <input type="checkbox" className="form-check-input" id="versedes" role="switch" onChange={verListado} />                               
                                </div>                                                               
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="fechaVencimiento" className="form-label">Fecha vencimiento</label>                  
                                    <input type="date" className="form-control text-end" id="fechaVencimiento" value={frmData.fechaVencimiento}  onChange={handlertxt} />                                 
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
                                            : <input type="checkbox" className="form-check-input" id="versedes" role="switch" onChange={verListado} />
                        }                            
                    </div> 
                    {
                        estadosVisibles && (
                                <div className="border rounded p-2">  
                                    <div className="row ">
                                        <div className="col-lg-12 col-md-12 mt-3 mb-1 text-end">
                                            <Button className="m-1 p-2 btn-secondary " onClick={exportTo} >Exportar a excel</Button>                     
                                        </div>                                          
                                        <div className="col-lg-6 col-md-12 offset-lg-6 mb-3">
                                                <label htmlFor="filtro" className="">Filtrar <label style={{fontSize: "10px", fontStyle: "italic"}}>(por Código, Nombre,  POS, Lote)</label></label>           
                                                <input type="text" className="form-control" id="filtro"  placeholder="" onChange={changeTextFiltro}/>
                                        </div> 
                                    </div> 

                                    <DataTable 
                                        title="Historial de ingresos"
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
                        Title='Ingreso de inventario'
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

export default MovimientoInventarioProduccion;