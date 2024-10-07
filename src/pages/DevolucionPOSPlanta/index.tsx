import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Alert from "../../component/Alert";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import MsgDialog from "../../component/MsgDialog";
import { exportToExcel, getFechaYhora, httpApiGet, httpApiPPPD } from "../../lib";
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
    idPos               : 0,
    fechaDevolucion     : "",
    solicitante         : "",
    fresco              : false,
    congelado           : false,    
    temperaturaVh       : "",
    color               : "",
    olor                : "",    
    textura             : "",    
    tamano              : "",    
    empaque             : "",
    observacionOrg      : "", 
    observacionSol      : "", 
    observacionDes      : "",     
    listProducts        : [],
    user                : "",    
    createdAt           : "",    
    updatedAt           : ""  
};

const ApiErrMsg: ApiErrorMessage = {
    idPos       : [],
    idCodigo    : []    
};

const dataSelect: any = [

    {
        value: 0,
        text: "Seleccione... "
    },
    {
        value: 1,
        text: "Cumple"
    },
    {
        value: 2,
        text: "No cumple"
    },

];

const DevolucionPOSPlanta= () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Historial ingreso");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    let [prd, setPrd] = useState({nombre: "", descripcion:"", stock: 0, fechaVencimiento: getFechaYhora()});   
    const [showInfo, setShowInfo] = useState(false);    
    const [showToast, setShowToast] = useState(false);    
    const [operacion, setOperacion] = useState(true); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltPos, setSltPos] = useState([]);     
    const [findsino, setFindsino] = useState(false);               

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
            width: "150px"       
        },         
        {
            name: 'Cantidad',
            selector: (row: FormData) => row.cantidad,
            wrap: true,
            sortable: true,
            right: "true",
        },       
        {    name: 'Lote',
            selector: (row: FormData) => row.lote,
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

        frmData.idPos = parseInt(opt.value);
        setFormData({ ...frmData});
        apiError = {
            ...apiError,
            [opt.id]: [],
        }
        setApiError({...apiError});

    } 

    const listar = async () =>{
        const response = await httpApiGet("PosMovimientoInventario/GetAll");
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
        setTituloBoton(!estadosVisibles ? "Ocultar ingresos" : "Mostrar ingresos");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        // borra las cajas de datos de entrada
        const inputsArray = Object.entries(frmData);
        const clearInputsArray = inputsArray.map(([key]) => [key, '']); // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const inputsJson = Object.fromEntries(clearInputsArray); //Convertimos el arreglo de arreglos nuevamente a formato json
        frmData = {...inputsJson, id: 0, idCaja: 0, idPos: 0, valor: 0, revisorId: 0, estadoArqueo: 0}
        setFormData(frmData);
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
        setPrd({nombre: "", descripcion:"", stock: 0});

        
        frmData.fechaMovimiento = getFechaYhora();
        setFormData({...frmData});
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
        
        if ((apiError.idCodigo && (apiError.idCodigo?.length > 0)) 
            || (apiError.idPos && (apiError.idPos?.length > 0))  
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

                const response = await httpApiPPPD("PosMovimientoInventario", "POST", {
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

    useEffect(()=>{

        const getTipoIdPos = async ()=>{
            const response = await httpApiGet("SedePos");
            if (response.statusCode >= 400){
                setOperacion(false);
                mensajeModal = [...response.messages];
    
                setMensajeModal(mensajeModal);            
                setShowInfo(true);
            }else{
                const fltr: any = response.data.filter(obj => obj.estado !== 1);
                sltPos = [...fltr];
                setSltPos(sltPos);                   
            }
        }

        getTipoIdPos();

        frmData.fechaDevolucion = getFechaYhora();
        setFormData({...frmData})

    }, []); 

    return(
        <div  className="container ">
            <BarraMenu /> 
      
            <div className="container border rounded " style={{"color": "#2A3482"}}>
                <a id="inicio"></a>
 
                <div className="h3 p-2 m-2 text-center">Devolución a Planta</div>                                  

                <div className="mx-1">

                    <div className='row ' >

                        <div className="col-lg-6 col-md-12 border rounded p-3 ">
                            <div className="row w-lg-50">
                                <div className="col-lg-4 col-md-12 mb-3">
                                    <label htmlFor="fechaDevolucion" className="form-label">Fecha </label>                  
                                    <input type="date" className="form-control text-end" id="fechaDevolucion" value={frmData.fechaDevolucion?.substring(0, 10)} disabled/>                                 
                                </div>   
                                <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
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

{/*                                 <div className="d-flex flex-column gap-2 col-lg-12 col-md-12 mb-3">
                                    <label htmlFor="">* Solicitud de</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="solicitante"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                    <Alert show={apiError.solicitante && apiError.solicitante.length > 0} alert="#F3D8DA" msg={apiError.solicitante}/>                                    
                                </div> */}     

                                <div className="col-lg-12 my-3" style={{backgroundColor: "#faf8f9"}}>
                                    <div className="row ">
                                        <div className="col-lg-4 col-md-12 fw-bold">* Estado del producto</div>
                                        <div className="col-lg-4 col-md-12  form-check form-switch">
                                            <label className="form-check-label" htmlFor="fresco">Fresco</label>                                          
                                            <input className="form-check-input" name="estado" type="radio" id="fresco" onChange={()=>null} />        
                                        </div>
                                        <div className="col-lg-4 col-md-12  form-check form-switch">
                                            <label className="form-check-label" htmlFor="congelado">Congelado</label>                                          
                                            <input className="form-check-input" name="estado"  type="radio" id="congelado" onChange={()=>null} />        
                                        </div>  
                                    </div>
                                </div>                           
                                
                                <div className="d-flex flex-column gap-1 col-lg-12 col-md-12 mb-3">
                                    <label htmlFor="" className="form-label">* Temperatura vehículo</label>                  
                                    <input type="text" className="form-control " id="temperaturaVh" value={``} onChange={()=>null} />                                 
                                </div>                                
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12  border rounded p-3">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 d-flex flex-column gap-2 mb-3">
                                    <label htmlFor="">* Color</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="color"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex flex-column gap-2 mb-3">
                                    <label htmlFor="">* Olor</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="olor"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex flex-column gap-2 mb-3">
                                    <label htmlFor="">* Textura</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="textura"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex flex-column gap-2 mb-3">
                                    <label htmlFor="">* Tamaño</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="tamano"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex flex-column gap-2 mb-3">
                                    <label htmlFor="">* Estado empaque</label>
                                    <OrdinarySelect
                                        data={dataSelect}
                                        id="empaque"
                                        Value="0"
                                        ClassName="form-select"
                                        onSelect={(sel: any)=>alert(sel)}
                                    />
                                </div>  
                                <div className="col-lg-12 col-md-12">
                                    <label htmlFor="">Observación </label>
                                    <textarea className="form-control" name="" id="observacionOrg">
                                    </textarea>
                                </div>                                    
                            </div>
                        </div>

                    </div>  

                    <div className="row my-3">
                        <div className="col-lg-6 col-md-12">
                            <label htmlFor="">Observación Solicitud</label>
                            <textarea className="form-control" name="" id="observacionSol">
                            </textarea>
                        </div>    

                        <div className="col-lg-6 col-md-12">
                            <label htmlFor="">Observación despacho</label>
                            <textarea className="form-control" name="" id="observacionDes">
                            </textarea>
                        </div> 
                    </div>

                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-lg-4 col-md-12 col-sm-12 ">
                            <Button className="m-1 p-2 btn-success w-100" id="btnGuardar" onClick={OnbtnGuardar}  >{btnRef}</Button>   
                        </div>   

                        <div className="col-lg-4 col-md-12 col-sm-12 ">
                            <Button className="m-1 p-2 btn-danger w-100 " id="btnLimpiar" onClick={OnbtnLimpiar} >Limpiar</Button>      
                        </div> 
                    </div>

                </div> 

                {/* zona de grilla con listado de las sedes creadas */}
                <div className="ms-2 mb-2 form-check form-switch h4 ">    
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
                    message={(findsino) ? " El producto encontrado en este P.O.S." : "El producto no encontrado en este P.O.S."} 
                    onTimeOff={()=>setShowToast(false)}
                    type={findsino}
                />}      
            </div>            

            <FooterBar/>                              
        </div>
    )
};

export default DevolucionPOSPlanta;