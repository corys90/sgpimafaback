import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import MsgYesNoDialog from "../../component/MsgYesNoDialog";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import { formatDate, getFechaYhora, httpApiGet, httpApiPPPD } from "../../lib";
import MsgDialog from "../../component/MsgDialog";
import BarraMenu from "../../component/BarraMenu";
import { useSelector } from "react-redux";
import GenericSelectPersonalized from "../../component/GenericSelectPersonalized";

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


const loader = ()=> {
    return (
        <div className="spinner-border m-3" role="status"  style={{"color": "#2A3482"}}></div>
    );
}

const form: FormData = {
    id: 0,
    idCliente: 0,
    tipoIdCliente: 0,       
    dpto: "",   
    ciudad: "",    
    direccion: "",
    estado: 0,
    nombres: "",
    apellidos: "", 
    email: "",
    telefono: "",            
    user: "",
    createdAt: "",
    updatedAt: "",
};

const ApiErrMsg: ApiErrorMessage = {
    idCliente           : [],   
    tipoIdCliente       : [], 
    dpto                : [],          
    ciudad              : [],            
    nombres             : [],
    direccion           : [],
    apellidos           : [],
};

const ClientePage = () => {
    
    const emp:State.data = useSelector((state: any) => state.emp);  
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar los Clientes");
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

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        
        {
            name: 'Acciones',
            selector: (row: any) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className={`${(row.estado) ? "pe-none " : "text-warning"}`} title="Edita" onClick={()=>edita(row)} style={{color: `${(row.estado === 1) ? "#F2D7D5": ""}`}}>
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                        <div >
                            <a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(row)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "100px",
        },          
        {
            name: 'Id',
            selector: (row: FormData) => row.idCliente,
            width: "100px",
            sortable: true,
        },  
        {
            name: 'Tipo',
            selector: (row: FormData) => row.tipoId,
            width: "150px",
            sortable: true,

        },          
        {
            name: 'Nombres',
            selector: (row: FormData) => row.nombres,
            width: "150px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Apellidos',
            selector: (row: FormData) => row.apellidos,
            width: "180px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Dpto',
            selector: (row: FormData) => row.dpto,
            width: "120px",
            wrap: true,
            sortable: true,            
        },                
        {
            name: 'Ciudad',
            selector: (row: FormData) => row.ciudad,
            width: "120px",
            wrap: true,
            sortable: true,            
        },       
        {
            name: 'Dirección',
            selector: (row: FormData) => row.direccion,
            width: "270px",
            wrap: true,
            sortable: true,            
        }, 
        {
            name: 'Teléfono',
            selector: (row: FormData) => row.telefono,
            width: "130px",
            wrap: true,
            sortable: true,            
        },  
        {
            name: 'Email',
            selector: (row: FormData) => row.email,
            width: "240px",
            wrap: true,
            sortable: true,            
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

    const handlerPersonalizedSelect = (e: any) => {

        const id: string = e.id;
        const value: string = e.value;

        frmData = {...frmData, [id]: value };
        setFormData({ ...frmData});

        apiError = {
            ...apiError,
            [id]: [],
        }
        setApiError({...apiError});

        // valida si tipocliente y nit contienen valores valido para habilitar el botón de busqueda
        //setBtnSearch( !((parseInt(`${frmData.tipoCliente}`) !== 0) && (frmData.nit !== "")) );
    }

    const listar = async () =>{
        const response = await httpApiGet("Clientes");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];

            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            console.log(response);
            const dta: any = [];
            response.data.map((dt: any) => {
                let obj = {};
                const td: any = emp.tipologia.tipoIdCliente.find((td: any) => td.id === dt.tipoIdCliente);
                obj = {...dt, tipoId: td.nombre}
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
        setTituloBoton(!estadosVisibles ? "Ocultar los Clientes" : "Mostrar los Clientes");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        // borra las cajas de datos de entrada
        frmData = {...form, id: 0, estado: 0, idCliente: 0, tipoIdCliente: 0}
        setFormData(frmData);
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
    } 
    
    const OnbtnGuardar = async (e: any) => {

        e.preventDefault();
        console.log(frmData);

        let msg = ""; 
        mensajeModal =  [];

        if ((frmData.tipoIdCliente === 0)){
            apiError = {
                ...apiError,            
                tipoIdCliente:["Debe seleccionar un Tipo de identificación."],
            }      
        }

        if (frmData.idCliente <= 0){
            apiError = {
                ...apiError,            
                idCliente:["La identificación no es válida"],
            }               
        }

        if ((frmData.nombres?.trim() === "")){
            apiError = {
                ...apiError,            
                nombres:["El nombre no puede estar vacio."],
            }      
        }

        if (frmData.apellidos?.trim() === ""){
            apiError = {
                ...apiError,            
                apellidos:["El apellido no pueden estar vacio"],
            }               
        }

        if ((frmData.dpto?.trim() === "")){
            apiError = {
                ...apiError,            
                dpto:["El departamento no puede estar vacio."],
            }      
        }

        if (frmData.ciudad?.trim() === ""){
            apiError = {
                ...apiError,            
                ciudad:["La ciudad no puede estar vacia"],
            }               
        } 
        
        if (frmData.direccion?.trim() === ""){
            apiError = {
                ...apiError,            
                direccion:["La dirección no puede estar vacia"],
            }               
        }         
        
        if ( ((apiError.tipoIdCliente) && (apiError.tipoIdCliente?.length > 0)) || ((apiError.idCliente) && (apiError.idCliente.length > 0)) ||
            ((apiError.nombres) && (apiError.nombres?.length > 0)) || ((apiError.apellidos) && (apiError.apellidos?.length > 0)) ||
            ((apiError.dpto) && (apiError.dpto?.length > 0)) || ((apiError.ciudad) && (apiError.ciudad?.length > 0))||
            ((apiError.direccion) && (apiError.direccion?.length > 0)))
            {
                setApiError({...apiError});   
        }else{
            console.log(frmData);
            
            if (btnRef === "Guardar"){

                frmData.createdAt = frmData.updatedAt = getFechaYhora();

                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("Clientes", "POST", {
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
                    msg = "Se ha creado el cliente exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }else{
                frmData.updatedAt = getFechaYhora();
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`Clientes/${frmData.id}/${frmData.idCliente}`, "PUT", {
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
                    msg = "Se ha actualizado al cliente exitosamente!!!"
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
        const response = await httpApiPPPD(`Clientes/${frmData.id}/${frmData.idCliente}`, "PUT", {
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

    }, []);  

    return(

        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className=' d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Clientes</label>
                        <form className='row border p-2 m-2' onSubmit={OnbtnGuardar}>
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="tipoIdCliente" className="form-label">* Tipo Identificación</label>    
                                <GenericSelectPersonalized 
                                    Data={emp.tipologia.tipoIdCliente} 
                                    ValueField="id"
                                    ValueText="nombre"
                                    Value={`${frmData.tipoIdCliente}`} 
                                    onSelect={handlerPersonalizedSelect} 
                                    ClassName="form-select" 
                                    id={`tipoIdCliente`}
                                /> 
                                <Alert show={apiError.tipoIdCliente && apiError.tipoIdCliente.length > 0} alert="#F3D8DA" msg={apiError.tipoIdCliente}/>                    
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idCliente" className="form-label">* Identificación</label>                
                                <input type="text" className="form-control  text-end" id="idCliente" placeholder="" value={frmData.idCliente} onChange={handler}  disabled={(btnRef == "Actualizar")}/>
                                <Alert show={apiError.idCliente && apiError.idCliente.length > 0} alert="#F3D8DA" msg={apiError.idCliente}/>
                            </div>      
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3 border rounded">        
                                <div className="bg-light h-100 border rounded d-flex justify-content-center align-items-center">
                                    Mi foto
                                </div>
                            </div>                           
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="nombres" className="form-label">* Nombres</label>                  
                                <input type="text" className="form-control" id="nombres" placeholder="" value={frmData.nombres} onChange={handler} />
                                <Alert show={apiError.nombres && apiError.nombres.length > 0} alert="#F3D8DA" msg={apiError.nombres}/>
                            </div>    
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="apellidos" className="form-label">* Apellidos</label>                  
                                <input type="text" className="form-control" id="apellidos" placeholder="" value={frmData.apellidos} onChange={handler}/>
                                <Alert show={apiError.apellidos && apiError.apellidos.length > 0} alert="#F3D8DA" msg={apiError.apellidos}/>
                            </div>                                
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="dpto" className="form-label">* Departamento</label>                  
                                <input type="text" className="form-control" id="dpto"  placeholder="" value={frmData.dpto} onChange={handler}/>
                                <Alert show={apiError.dpto && apiError.dpto.length > 0} alert="#F3D8DA" msg={apiError.dpto}/>
                            </div>                 
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="ciudad" className="form-label">* Ciudad</label>                  
                                <input type="text" className="form-control" id="ciudad"  placeholder="" value={frmData.ciudad} onChange={handler}/>
                                <Alert show={apiError.ciudad && apiError.ciudad.length > 0} alert="#F3D8DA" msg={apiError.ciudad}/>
                            </div>                 
                            <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="direccion" className="form-label">* Dirección</label>                  
                                <input type="text" className="form-control" id="direccion"  placeholder="" value={frmData.direccion} onChange={handler}/>
                                <Alert show={apiError.direccion && apiError.direccion.length > 0} alert="#F3D8DA" msg={apiError.direccion}/>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>                  
                                <input type="text" className="form-control" id="telefono"  placeholder="" value={frmData.telefono} onChange={handler}/>              
                            </div>             
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>                  
                                <input type="email" className="form-control" id="email"  placeholder="" value={frmData.email} onChange={handler}/>
                            </div>                                                         
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4 col-md-12 col-sm-12 ">
                                    <Button type="submit" className="m-1 p-2 btn-success w-100" id="btnGuardar" /* onClick={OnbtnGuardar} */ >{btnRef}</Button>   
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
                                        title="Clientes"
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
                    { showYesNo && <MsgYesNoDialog
                            Title='Clientes'
                            Message={`Este proceso cambia el estado del cliente, lo deshabilita si está habilitado o visceversa. ¿Quiero cambiarlo?`}
                            Icon='X'
                            BtnOkName='Sí, continuar'
                            BtnNokName='No, cancelar'
                            Show={showYesNo}
                            HanlerdClickNok={()=> setShowYesNo(false)}
                            HandlerClickOk={()=>borra()}
                            size="lg"
                        /> } 
                        { showInfo && <MsgDialog
                            Title='Clientes'
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

export default ClientePage;