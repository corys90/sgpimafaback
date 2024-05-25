import { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import MsgYesNoDialog from "../../component/MsgYesNoDialog";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import { formatDate, httpApiGet, httpApiPPPD } from "../../lib";
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
    descripcion :"",
    nombre      :"",
    user        :"",
    estado      : 0, 
    createdAt   :"",
    updatedAt   :""  
};


const ApiErrMsg: ApiErrorMessage = {
    nombre: [],
    descripcion: [],
};

const TipoPagosAFavorPage = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar los tipos de productos");
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

    // Obtiene la fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
    const hh = (new Date().getHours()) < 10 ? `0${new Date().getHours()}`:`${new Date().getHours()}`;
    const mm = (new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}`:`${new Date().getMinutes()}`; 
    const fechaYhora = `${formatDate(new Date())}T${hh}:${mm}:00`;

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Id',
            selector: (row: any) => row.id,
            width: "70px",
            sortable: true,
            right: "true",
        },  
        {
            name: 'Nombre',
            selector: (row: any) => row.nombre,
            width: "120px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Descripción',
            selector: (row: any) => row.descripcion,
            width: "250px",
            wrap: true,
            sortable: true,            
        },                      
        {
            name: 'Acciones',
            selector: (row: any) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className={`${(row.estado === 1) ? "pe-none " : "text-warning"}`} title="Edita" onClick={()=>edita(row)} style={{color: `${(row.estado === 1) ? "#F2D7D5": ""}`}}>
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                        <div>
                            <a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(row)}>
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
        const response = await httpApiGet("PosTipoPagosAFavor");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];

            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            data = [...response.data];
            setData(data);                   
        }
    }

    const verListado = async () => {
        
        if (!estadosVisibles){
            listar();
        }
        setTituloBoton(!estadosVisibles ? "Ocultar los tipos de Pagos a favor" : "Mostrar los tipos de Pagos a favor");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        // borra las cajas de datos de entrada
        const inputsArray = Object.entries(frmData);
        const clearInputsArray = inputsArray.map(([key]) => [key, '']); // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const inputsJson = Object.fromEntries(clearInputsArray); //Convertimos el arreglo de arreglos nuevamente a formato json
        frmData = {...inputsJson, id: 0, estado: 0}
        setFormData(frmData);
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
    } 
    
    const OnbtnGuardar = async () => {
        
        let msg = ""; 
        mensajeModal =  [];

        if ((frmData.nombre.trim() === "")){
            apiError = {
                ...apiError,            
                nombre:["El nombre no puede estar vacio."],
            }      
        }

        if (frmData.descripcion?.trim() === ""){
            apiError = {
                ...apiError,            
                descripcion:["La descripción no puede estar vacia"],
            }               
        }
        
        if (((apiError.nombre) && (apiError.nombre?.length > 0)) || ((apiError.descripcion) && (apiError.descripcion?.length > 0))){
            setApiError({...apiError});   
        }else{
            
            if (btnRef === "Guardar"){
                frmData.createdAt = fechaYhora;
                frmData.updatedAt = fechaYhora;

                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("PosTipoPagosAFavor", "POST", {
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
                    msg = "Se ha creado el tipo exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }else{
                frmData.updatedAt = fechaYhora;
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`PosTipoPagosAFavor/${frmData.id}/${frmData.nombre}`, "PUT", {
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
                    msg = "Se ha actualizado el tipo exitosamente!!!"
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
        const response = await httpApiPPPD(`PosTipoPagosAFavor/${frmData.id}/${frmData.nombre}`, "PUT", {
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

    return(

        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Tipos de pagos a favor</label>
                        <form className='row border p-2 m-2'>
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="nombre" className="form-label">* Nombre </label>                
                                <input type="text" className="form-control" id="nombre" placeholder="" value={frmData.nombre} onChange={handler} disabled={(btnRef == "Actualizar")}/>
                                <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre}/>
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="direccion" className="form-label">Descripción</label>                  
                                <input type="text" className="form-control" id="descripcion"  placeholder="" value={frmData.descripcion} onChange={handler}/>
                                <Alert show={apiError.descripcion && apiError.descripcion.length > 0} alert="#F3D8DA" msg={apiError.descripcion}/> 
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

                        {/* zona de grilla con listado de las estados de las cajas creadas */}
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
                                        title="Tipos de pagos a favor"
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
                            Title='Tipo de pagos a favor'
                            Message={`Este proceso cambia el estado del tipo de pagos a favor, lo deshabilita si está habilitado o visceversa. ¿Quiero cambiarlo?`}
                            Icon='X'
                            BtnOkName='Sí, continuar'
                            BtnNokName='No, cancelar'
                            Show={showYesNo}
                            HanlerdClickNok={()=> setShowYesNo(false)}
                            HandlerClickOk={()=>borra()}
                            size="lg"
                        /> } 
                        { showInfo && <MsgDialog
                            Title='Tipo de pagos a favor'
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

export default TipoPagosAFavorPage;