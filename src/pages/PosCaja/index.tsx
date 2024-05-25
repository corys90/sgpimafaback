import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import MsgYesNoDialog from "../../component/MsgYesNoDialog";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
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
    id          : 0,
    idPos       : 0,
    tipoId      : "", 
    descripcion :"",
    nombre      :"",
    user        :"",
    estado      : 0, 
    createdAt   :"",
    updateAt    :""  
};

const ApiErrMsg: ApiErrorMessage = {
    nombre: [],
    idPos: [],
};

const PosCajaPage = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar cajas");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    // eslint-disable-next-line prefer-const
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    const [showYesNo, setShowYesNo] = useState(false); 
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(false); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [id, setId] = useState(form);   
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltTipoId, setSltTipoId] = useState([]);       

    // Obtiene la fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
    const hh = (new Date().getHours()) < 10 ? `0${new Date().getHours()}`:`${new Date().getHours()}`;
    const mm = (new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}`:`${new Date().getMinutes()}`; 
    const fechaYhora = `${formatDate(new Date())}T${hh}:${mm}:00`;    

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Id',
            selector: (row: FormData) => row.id,
            width: "100px",
            sortable: true,
            right: "true",
        },  
        {
            name: 'Pos',
            selector: (row: FormData) => row.tipoId,
            width: "180px",
            sortable: true,         
        }, 
        {
            name: 'Nombre',
            selector: (row: FormData) => row.nombre,
            width: "150px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Descripción',
            selector: (row: FormData) => row.descripcion,
            width: "320px",
            wrap: true,
            sortable: true,
        },                                          
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className={`${(row.estado === 1) ? "pe-none " : "text-warning"}`} title="Edita" onClick={()=>edita(row)} style={{color: `${(row.estado === 1) ? "#E8E8E8": ""}`}}>
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                        <div><a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(row)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
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
        const response = await httpApiGet("PosCaja");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((caja: any) => {
                let obj = {};
                const td: any = sltTipoId.find((td: any) => td.id === caja.idPos);
                obj = {...caja, tipoId: td.nombre}
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
        setTituloBoton(!estadosVisibles ? "Ocultar cajas" : "Mostrar cajas");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        // borra las cajas de datos de entrada
        const inputsArray = Object.entries(frmData);
        const clearInputsArray = inputsArray.map(([key]) => [key, '']); // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const inputsJson = Object.fromEntries(clearInputsArray); //Convertimos el arreglo de arreglos nuevamente a formato json
        frmData = {...inputsJson, id: 0, estado: 0, idPos: 0}
        setFormData(frmData);
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
    } 
    
    const OnbtnGuardar = async () => {
        
        let msg = ""; 
        mensajeModal =  [];

        if ((frmData.nombre?.trim() === "")){
            apiError = {
                ...apiError,            
                nombre:["El nombre no puede estar vacio."],
            }      
        }

        if (frmData.idPos <= 0){
            apiError = {
                ...apiError,            
                idPos:["Debe seleccionar un POS"],
            }               
        }
        
        if (((apiError.nombre) && (apiError.nombre?.length > 0)) || ((apiError.idPos) && (apiError.idPos?.length > 0))){
            setApiError({...apiError});   
        }else{
            
            if (btnRef === "Guardar"){
                frmData.createdAt = fechaYhora;
                frmData.updateAt = fechaYhora;

                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("PosCaja", "POST", {
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
                    msg = "Se ha creado la nueva caja- exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }else{
                frmData.updateAt = fechaYhora;
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`PosCaja/${frmData.id}/${frmData.idPos}/${frmData.nombre}`, "PUT", {
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
                    msg = "Se ha actualizado la caja exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }

            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }
    }  

    const edita = (row: any) =>{
        setFormData({...row});
        setBtnRef("Actualizar");
    };


    const borra = async () => {

        // Antes de eliminarlo fisicamente del sistema, verificar si está siendo usado
        // Se actualiza el estado 
        frmData = {...id, estado: ((id.estado === 0) ? 1 : 0) }
        const response = await httpApiPPPD(`PosCaja/${frmData.id}/${frmData.idPos}/${frmData.nombre}`, "PUT", {
            "Content-Type" : "application/json"
        }, frmData);
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];

        }else{
            listar();
        } 

        OnbtnLimpiar();        
        setShowYesNo(false);
    }

    const borraSiNo = (obj: any) =>{
        setShowYesNo(true);
        setId(obj);
    };

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
                sltTipoId = [...fltr];
                setSltTipoId(sltTipoId);                   
            }
        }

        getTipoIdPos();

    }, []);  


    return(

        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Caja</label>
                        <form className='row border p-2 m-2'>
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idPos" className="form-label">* Pos</label>                
                                <select className="form-select" aria-label="Default select example" id="idPos" value={frmData.idPos} onChange={handler}  disabled={(btnRef == "Actualizar")}>
                                    <option value="0" >Seleccione POS</option>
                                    {
                                        sltTipoId.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                </select>
                                <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                            </div>         
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="nombre" className="form-label">* Nombre</label>                  
                                <input type="text" className="form-control" id="nombre"  placeholder="" value={frmData.nombre} onChange={handler}  disabled={(btnRef == "Actualizar")}/>
                                <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre} />
                            </div>    
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="descripcion" className="form-label">* Descripción</label>                  
                                <input type="text" className="form-control" id="descripcion"  placeholder="" value={frmData.descripcion} onChange={handler}/>
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
                                        title="Cajas"
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
                    { showYesNo && <MsgYesNoDialog
                            Title='Tipos de estados de la Caja'
                            Message={`Este proceso cambia el estado de la caja, lo deshabilita si está habilitado o visceversa. ¿Quiere cambiarlo?`}
                            Icon='X'
                            BtnOkName='Sí, continuar'
                            BtnNokName='No, cancelar'
                            Show={showYesNo}
                            HanlerdClickNok={()=> setShowYesNo(false)}
                            HandlerClickOk={()=>borra()}
                            size="lg"
                        /> } 
                        { showInfo && <MsgDialog
                            Title='Tipos de estados de la Caja'
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

export default PosCajaPage;