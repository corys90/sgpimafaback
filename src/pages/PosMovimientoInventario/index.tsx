import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import MsgDialog from "../../component/MsgDialog";
import { getFechaYhora, httpApiGet, httpApiPPPD } from "../../lib";
import BarraMenu from "../../component/BarraMenu";
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
            fontSize: "22px",
        },
    },
    headRow:{
        style: {
            color: "#2A3482",
            background:"#F5F5F5",
            fontSize: "18px",
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
    updatedAt       : "",
    createdAt       : "",
    fechaMovimiento : "",
    user            : ""
};

const ApiErrMsg: ApiErrorMessage = {
    idPos       : [],
    idCodigo    : []    
};

const PosMovimientoInventario= () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Historial ingreso");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    let [prd, setPrd] = useState({nombre: "", descripcion:"", stock: 0});   
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(true); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltPos, setSltPos] = useState([]);     

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Nro.',
            selector: (row: FormData) => row.id,
            grow: 1,
            sortable: true,
            right: "true",
        },  
        {
            name: 'Código',
            selector: (row: FormData) => row.idCodigo,
            grow: 2,
            wrap: true,
            sortable: true,
            right: "true",
        }, 
        {
            name: 'POS',
            selector: (row: FormData) => row.idPos,
            grow: 2,
            wrap: true,
            sortable: true,
            right: "true", 
            omit: true           
        }, 
        {
            name: 'POS',
            selector: (row: FormData) => row.nmPos,
            grow: 2,
            wrap: true,
            sortable: true      
        },         
        {
            name: 'Cantidad',
            selector: (row: FormData) => row.cantidad,
            grow: 3,
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
        const response = await httpApiGet("PosMovimientoInventario");
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
                mensajeModal = ["Seleccione un producto y pulse buscar"];
                setOperacion(false);
                setMensajeModal([...mensajeModal]);
                setShowInfo(true);    
            }else{
                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("PosMovimientoInventario", "POST", {
                    "Content-Type" : "application/json"
                }, frmData);

                if (response.statusCode >= 400){
                    mensajeModal = [...response.messages];
                    setOperacion(false);
                }else{
                    mensajeModal = ["Movimiento registrado con éxito!!!"];
                    setOperacion(true);
                }
                setMensajeModal([...mensajeModal]);
                setShowInfo(true);                   
            }
        }
    }  

    const buscaProducto = async () =>{

        if (frmData.idPos < 1){
            setOperacion(false);
            setMensajeModal(["Debe seleccionar un Pos para buscar el producto!!"]);
            setShowInfo(true);
        }else{
            console.log(`inventarioproducto/getProducto/${frmData.idCodigo}`);
            const response = await httpApiGet(`inventarioproducto/getProducto/${frmData.idCodigo}`);
            if (response.statusCode >= 400){
                setOperacion(false);
                setMensajeModal(["Código del producto no encontrado!!"]);
                setShowInfo(true);
            }else{      
                let cant = 0;
                prd.nombre = response.data[0].nombre;
                prd.descripcion = response.data[0].descripcion;  

                console.log(`Posinventarioproducto/Pos/${frmData.idPos}/GetByProductoId/${frmData.idCodigo}`);
                // trae la cantidad de stock del ineventario del POS
                const responseInvPos = await httpApiGet(`Posinventarioproducto/Pos/${frmData.idPos}/GetByProductoId/${frmData.idCodigo}`);
                console.log("Response: ", responseInvPos);
                if (responseInvPos.statusCode >= 400){
                    console.log("Código del producto no encontrado!!"); 
                }else{
                    cant =  responseInvPos.data.length > 0 ? responseInvPos.data[0].cantidad : 0;                 
                }
        
                prd.stock =  cant;
                setPrd({...prd});
            }                
        }
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

        frmData.fechaMovimiento = getFechaYhora();
        setFormData({...frmData})

    }, []); 

    return(
        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Ingreso de inventario</label>
                        <form className='row border p-2 m-2'>
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
                            <div className="row ">
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="valor" className="form-label">* Código producto</label>                  
                                    <div className=" d-flex ">
                                        <input type="number" className="form-control text-end" id="idCodigo" min={0} placeholder="" value={frmData.idCodigo} onChange={handler} /> 
                                        <Button className="border-0 bg-secondary" onClick={buscaProducto} disabled={(frmData.idPos < 0) && (frmData.idCodigo < 1)}> <FaSearch /></Button>                                                                              
                                    </div>
                                    <Alert show={apiError.idCodigo && apiError.idCodigo.length > 0} alert="#F3D8DA" msg={apiError.idCodigo} /> 
                                </div> 
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="" className="form-label">Descripción</label>                  
                                    <input type="text" className="form-control " value={`${prd.nombre} - ${prd.descripcion}`} disabled/>                                 
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="" className="form-label">Stock</label>                  
                                    <input type="text" className="form-control text-end" value={prd.stock} disabled/>                                 
                                </div>                                
                            </div>
                            <div className="row ">
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor="cantidad" className="form-label">* Cantidad</label>                  
                                    <input type="number" className="form-control text-end" id="cantidad"  placeholder="" value={frmData.cantidad} onChange={handler} /> 
                                    <Alert show={apiError.cantidad && apiError.cantidad.length > 0} alert="#F3D8DA" msg={apiError.cantidad} />                                                                             
                                </div> 
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3 offset-4">
                                    <label htmlFor="fechaMovimiento" className="form-label">Fecha</label>                  
                                    <input type="text" className="form-control text-end" id="fechaMovimiento" value={frmData.fechaMovimiento?.substring(0, 10)} disabled/>                                 
                                </div>                                
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4 col-md-12 col-sm-12 ">
                                    <Button className="m-1 p-2 btn-success w-100" id="btnGuardar" onClick={OnbtnGuardar}  >{btnRef}</Button>   
                                </div>   
                                <div className="col-lg-4 col-md-12 col-sm-12 ">
                                    <Button className="m-1 p-2 btn-danger w-100 " id="btnLimpiar" onClick={OnbtnLimpiar} >Limpiar</Button>      
                                </div>                         
                            </div>                                                   
                        </form> 

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
                            HandlerdClickNok={null} size={"lg"}                        
                        />}
                    </div>            
                </div>
                <div className='d-flex align-items-center justify-content-center ' style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>
    )
};

export default PosMovimientoInventario;