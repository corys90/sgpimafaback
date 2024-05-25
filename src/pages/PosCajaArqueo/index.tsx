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
    id          : 0,
    idPos       : 0,
    idCaja      : 0, 
    valor       : 0,
    fechaArqueo :"",
    user        :"",
    revisorId   : 0,    
    estadoArqueo: 0, 
    createdAt   :"",
    updateAt    :"" ,
    nmPos       : "",       
    nmCja       : "",
    nmRev       : ""
};

const ApiErrMsg: ApiErrorMessage = {
    idPos       : [],
    idCaja      : [],
    fechaArqueo : [],
    valor       : [],
    revisorId   : [],
    estadoArqueo: [],    
};

const revisores = [{id: 1, nombre: "Administrador(a)"}, {id: 2, nombre: "Supervisor(a)"}, {id: 3, nombre: "Coordinador(a)"}];
const estadosArqueo = [{id: 1, nombre: "Cuadrada"}, {id: 2, nombre: "Faltante"}, {id: 3, nombre: "Sobrante"}];

const PosCajaArqueoPage = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar Arqueos");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    // eslint-disable-next-line prefer-const
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    const [showYesNo, setShowYesNo] = useState(false); 
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(false); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");      
    let [sltPos, setSltPos] = useState([]);     
    let [sltCaja, setSltCaja] = useState([]);      
    
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
            width: "170px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Caja',
            selector: (row: FormData) => row.nmCja,
            width: "100px",
            wrap: true,
            sortable: true,
        },        
        {
            name: 'Arqueo',
            selector: (row: FormData) => row.fechaArqueo,
            width: "200px",
            wrap: true,
            sortable: true,            
        },         
        {
            name: 'Valor',
            selector: (row: FormData) => row.valor,
            width: "150px",
            right: "true",
            sortable: true,
            format: (row: FormData)=> row.valor?.toLocaleString(),                       
        }, 
        {
            name: 'Estado',
            selector: (row: FormData) => {
                const estado: any = estadosArqueo.find((est: any)=> est.id === row.estadoArqueo);
                return estado.nombre;
            },
            width: "150px",
            right: "true",
            sortable: true,                     
        },        
        {
            name: 'Revisor',
            selector: (row: FormData) => row.revisorId,
            width: "150px",
            wrap: true,
            right: "true",            
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
        const response = await httpApiGet("poscajaarqueo");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((cja: any) => {
                let obj = {};
                //se busca el nombre del pos
                const pos: any = sltPos.find((ps: any) => ps.id === cja.idPos);
                //se busca el nombre de la caja                
                const cj: any = sltCaja.find((cj: any) => cj.id === cja.idCaja);
                //se busca el nombre del Revisor             
                const rv: any = sltCaja.find((cj: any) => cj.id === cja.idCaja);                
                obj = {...cja, nmPos: pos.nombre, nmCja:cj.nombre, nmRev: rv.nombre}
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
        setTituloBoton(!estadosVisibles ? "Ocultar Arqueos" : "Mostrar Arqueos");
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

        if (frmData.valor <= 0){
            apiError = {
                ...apiError,            
                valor:["Se requiere un valor válido"],
            }               
        }

        if (frmData.revisorId <= 0){
            apiError = {
                ...apiError,            
                revisorId:["Debe seleccionar un revisor"],
            }               
        }

        if (frmData.estadoArqueo <= 0){
            apiError = {
                ...apiError,            
                estadoArqueo:["Debe seleccionar un estado"],
            }               
        }
        
        if ((apiError.idCaja && (apiError.idCaja?.length > 0)) 
            || (apiError.idPos && (apiError.idPos?.length > 0))  
            || (apiError.valor && (apiError.valor?.length > 0)) 
            || (apiError.revisorId && (apiError.revisorId?.length > 0))       
            || (apiError.estadoArqueo && (apiError.estadoArqueo?.length > 0))         
            ){
            setApiError({...apiError});   
        }else{
            
            if (btnRef === "Guardar"){
                frmData.createdAt = fechaYhora;
                frmData.updateAt = fechaYhora;
                frmData.fechaArqueo = fechaYhora;

                //Consumir service de /PosTipoIdCliente, método Post
                const response = await httpApiPPPD("PosCajaArqueo", "POST", {
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
                frmData.updateAt = fechaYhora;
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`PosCajaArqueo/${frmData.id}`, "PUT", {
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

    const edita = (row: any) =>{
        setFormData({...row});
        setBtnRef("Actualizar");
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
                sltPos = [...fltr];
                setSltPos(sltPos);                   
            }
        }

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
        }        

        getTipoIdPos();
        getCajas();

    }, []); 

    return(

        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Arqueo de Caja</label>
                        <form className='row border p-2 m-2'>
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idPos" className="form-label">* Pos</label>                
                                <select className="form-select" aria-label="Default select example" id="idPos" value={frmData.idPos} onChange={handler}  disabled={(btnRef == "Actualizar")}>
                                    <option value="0" >Seleccione POS</option>
                                    {
                                        sltPos.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                </select>
                                <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                            </div> 
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="idPos" className="form-label">* Caja</label>   
                                <select className="form-select" aria-label="Default select example" id="idCaja" value={frmData.idCaja} onChange={handler}  disabled={(btnRef == "Actualizar")}>
                                    <option value="0" >Seleccione caja</option>
                                    {
                                        sltCaja.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                </select>
                                <Alert show={apiError.idCaja && apiError.idCaja.length > 0} alert="#F3D8DA" msg={apiError.idCaja}/>                    
                            </div>             
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="valor" className="form-label">* Valor arqueado</label>                  
                                <input type="number" className="form-control text-end" id="valor"  placeholder="" value={frmData.valor} onChange={handler} />
                                <Alert show={apiError.valor && apiError.valor.length > 0} alert="#F3D8DA" msg={apiError.valor} />
                            </div>       
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="estado" className="form-label">* Revisor</label> 
                                <select className="form-select" aria-label="Default select example" id="revisorId" value={frmData.revisorId} onChange={handler} >
                                    <option value="0" >Seleccione Revisor</option>
                                    {
                                        revisores.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                </select>               
                                <Alert show={apiError.revisorId && apiError.revisorId.length > 0} alert="#F3D8DA" msg={apiError.revisorId}/>                    
                            </div>                 
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="estadoArqueo" className="form-label">* Estado arqueo</label>                
                                <select className="form-select" aria-label="Default select example" id="estadoArqueo" value={frmData.estadoArqueo} onChange={handler} >
                                    <option value="0" >Seleccione estado</option>
                                    {
                                        estadosArqueo.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                </select>
                                <Alert show={apiError.estadoArqueo && apiError.estadoArqueo.length > 0} alert="#F3D8DA" msg={apiError.estadoArqueo}/>                    
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
                                        title="Historial de arqueos"
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

export default PosCajaArqueoPage;