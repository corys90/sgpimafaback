import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "../PosCajaEstado/Dto/ApiErrorMessage";
import FormData from "../PosCajaEstado/Dto/FormData";
import MsgDialog from "../../component/MsgDialog";
import { formatDate, httpApiGet, httpApiPPPD } from "../../lib";
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

const loader = ()=> {
    return (
        <div className="spinner-border m-3" role="status"  style={{"color": "#2A3482"}}></div>
    );
}

const form: FormData = {
    idCaja          : 0,
    idPos           : 0,
    valorEstado     : 0,
    fechaOperacion  : "",
    estado          : 0,
    createdAt       : "",
    updatedAt        : "",   
    nmPos           : "",
    nmCaja          : "",
    nmEstado        : "",
    userAccion      : ""
};

const ApiErrMsg: ApiErrorMessage = {
    idCaja: [],
    idPos:[],
    valorEstado: [],
    estado: []
};

const estadosCaja = [{id: 1, nombre: "Abierta"}, {id: 2, nombre: "Cerrada"}, {id: 3, nombre: "Otro estado"}];

const  PosCajaEstadoPage = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar Novedades");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    // eslint-disable-next-line prefer-const
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    const [showInfo, setShowInfo] = useState(false);        
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltPos, setSltPos] = useState([]);       
    let [sltCaja, setSltCaja] = useState([]);         
    const [operacion, setOperacion] = useState(false);         

    // Obtiene la fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
    const hh = (new Date().getHours()) < 10 ? `0${new Date().getHours()}`:`${new Date().getHours()}`;
    const mm = (new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}`:`${new Date().getMinutes()}`; 
    const fechaYhora = `${formatDate(new Date())}T${hh}:${mm}:00`;    

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Id.',
            selector: (row: FormData) => row.id,
            width: "100px",
            sortable: true,
            right: "true",
        },  
        {
            name: 'POS',
            selector: (row: FormData) => row.nmPos,
            width: "150px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Caja',
            selector: (row: FormData) => row.nmCaja,
            width: "110px",
            wrap: true,
            sortable: true,
        },        
        {
            name: 'Valor',
            selector: (row: FormData) => row.valorEstado,
            width: "100px",
            wrap: true,
            sortable: true,
            right: "true",  
            format: (row: FormData)=> row.valorEstado?.toLocaleString(),                        
        },         
        {
            name: 'Fecha',
            selector: (row: FormData) => row.fechaOperacion,
            width: "250px",
            wrap: true,
            sortable: true,            
        }, 
        {
            name: 'Estado',
            selector: (row: FormData) => row.nmEstado,
            width: "130px",
            wrap: true,
            sortable: true,            
        },                                            
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className={"text-warning"} title="Edita" onClick={()=>edita(row)}>
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
{/*                         <div>
                            <a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(idx)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> */}
                </div>,
            width: "150px",
        },                             
    ];

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

    const listar = async () =>{
        const response = await httpApiGet("PosCajaEstado");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((caja: any) => {
                let obj = {};
                //se busca el nombre del pos
                const pos: any = sltPos.find((ps: any) => ps.id === caja.idPos);
                //se busca el nombre de la caja                
                const cj: any = sltCaja.find((cj: any) => cj.id === caja.idCaja);   
                //se busca el estado de la caja                
                const es: any = estadosCaja.find((cj: any) => cj.id === caja.estado);                 
  
                obj = {...caja, nmPos:pos.nombre, nmCaja:cj.nombre, nmEstado: es.nombre}
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
        setTituloBoton(!estadosVisibles ? "Ocultar Novedades" : "Mostrar Novedades");
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
    } 
    
    const OnbtnGuardar = async () => {

        let msg = ""; 
        mensajeModal =  [];

        if ((frmData.idPos <= 0)){
            apiError = {
                ...apiError,            
                idPos:["Debe seleccionar un POS"],
            }      
        }

        if (frmData.idCaja <= 0){
            apiError = {
                ...apiError,            
                idCaja:["Debe seleccionar una caja"],
            }               
        }

        if (frmData.valorEstado <= 0){
            apiError = {
                ...apiError,            
                valorEstado:["Se requiere un valor válido"],
            }               
        }

        if (frmData.estado <= 0){
            apiError = {
                ...apiError,            
                Estado:["Debe seleccionar un estado"],
            }               
        }
        
        if ((apiError.idCaja && (apiError.idCaja?.length > 0)) 
            || (apiError.idPos && (apiError.idPos?.length > 0))  
            || (apiError.valorEstado && (apiError.valorEstado?.length > 0)) 
            || (apiError.idCaja && (apiError.idCaja?.length > 0))       
            || (apiError.estado && (apiError.estado?.length > 0))         
            ){
            setApiError({...apiError});   
        }else{
            
            if (btnRef === "Guardar"){
                frmData.createdAt = fechaYhora;
                frmData.updatedAt = fechaYhora;
                frmData.fechaOperacion = fechaYhora;

                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("PosCajaEstado", "POST", {
                    "Content-Type" : "application/json"
                }, frmData);

                if (response.statusCode >= 400){
                    setOperacion(false);
                    mensajeModal = [...response.messages];

                }else{
                    setOperacion(true);
                    // actualiza la grilla
                    estadosVisibles && listar();
                    msg = "Se ha creado la informacioón exitosamente!!!";
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }else{
                frmData.updatedAt = fechaYhora;
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`PosCajaEstado/${frmData.id}`, "PUT", {
                    "Content-Type" : "application/json"
                }, frmData);
                if (response.statusCode >= 400){
                    setOperacion(false);
                    mensajeModal = [...response.messages];
                }else{
                    setOperacion(true);
                    // actualiza la grilla
                    if (estadosVisibles){
                        listar();
                    }
                    msg = "Se ha actualizado la información exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }

            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }
    }  

    const edita = (row: FormData) =>{
        setFormData({...row});
        setBtnRef("Actualizar");
    };

    useEffect(()=>{

        const getPos = async ()=>{
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

            //console.log("Pos: ", sltPos);
        };

        const getCajas = async ()=>{
            const response = await httpApiGet("PosCaja");
            if (response.statusCode >= 400){
                setOperacion(false);
                mensajeModal = [...response.messages];
    
                setMensajeModal(mensajeModal);            
                setShowInfo(true);
            }else{
                const fltr: any = response.data.filter(obj => obj.estado !== 1);
                sltCaja = [...fltr];
                setSltCaja(sltCaja);                   
            }

           //console.log("caja: ", sltCaja);            
        };        

        getPos();
        getCajas();

    }, []);      

    return(
        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className=' d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Novedad de caja </label>
                        <form className='row border p-2 m-2'>

                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idPos" className="form-label">* Pos</label>                
                                <select className="form-select" aria-label="Default select example" id="idPos" value={frmData.idPos} onChange={handler} >
                                    <option value="0" >Seleccione pos</option>
                                    {
                                        sltPos.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }                      
                                </select>
                                <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idCaja" className="form-label">* Caja</label>                               
                                <select className="form-select" aria-label="Default select example" id="idCaja" value={frmData.idCaja} onChange={handler} >
                                    <option value="0" >Seleccione caja</option>
                                    {
                                        sltCaja.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    } 
                                </select>
                                <Alert show={apiError.idCaja && apiError.idCaja.length > 0} alert="#F3D8DA" msg={apiError.idCaja}/>                    
                            </div>   

                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="nombre" className="form-label">* Valor estado</label>                  
                                <input type="number" className="form-control text-end" id="valorEstado"  placeholder="" value={frmData.valorEstado} onChange={handler}/>
                                <Alert show={apiError.valorEstado && apiError.valorEstado.length > 0} alert="#F3D8DA" msg={apiError.valorEstado} />
                            </div>   

                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="estado" className="form-label">* Estado caja</label>                
                                <select className="form-select" aria-label="Default select example" id="estado" value={frmData.estado} onChange={handler} >
                                    <option value="0" >Seleccione un estado de caja</option>
                                    {
                                        estadosCaja.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    } 
                                </select>
                                <Alert show={apiError.estado && apiError.estado.length > 0} alert="#F3D8DA" msg={apiError.estado}/>                    
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
                                        title="Historial de estados de las cajas"
                                        className="border rounded"
                                        columns={columnas}
                                        data={data} 
                                        pagination
                                        highlightOnHover
                                        fixedHeader={true}
                                        paginationComponentOptions={pagOptions}    
                                        customStyles={customStyles}
                                        progressPending={pending}
                                        progressComponent={loader()}             
                                    />
                                </div>                  
                        )
                        }           
                        { showInfo && <MsgDialog
                            Title='Estados de las Cajas'
                            Message={mensajeModal}
                            Icon={operacion}
                            BtnOkName='Aceptar'
                            BtnNokName=''
                            Show={showInfo}
                            HandlerdClickOk={() => setShowInfo(false)}
                            HandlerdClickNok={null} size={"lg"}                        />} 
                    </div>            
                </div>
                <div className='d-flex align-items-center justify-content-center ' style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>



    )
};

export default PosCajaEstadoPage;