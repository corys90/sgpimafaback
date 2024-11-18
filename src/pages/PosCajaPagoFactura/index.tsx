import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "./Dtos/ApiErrorMessage";
import FormData from "./Dtos/FormData";
import MsgDialog from "../../component/MsgDialog";
import { formatDate, getFechaYhora, httpApiDelete, httpApiGet, httpApiPPPD } from "../../lib";
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
            fontSize: "22px",
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
    idCaja          : 0, 
    idFactura       : 0,
    formaPago       : 0,
    valorRecibido   : 0,
    valorDevuelto   : 0,
    valorPagado     : 0,
    fechaPago       : "",
    user            : "",
    createdAt       : "",
    updatedAt       : "",
    nmPos           : "",
    nmCja           : ""   
};

const ApiErrMsg: ApiErrorMessage = {
    idPos           : [],
    idCaja          : [],
    idFactura       : [],    
    formaPago       : [],      
    valorRecibido   : [],
    valorPagado     : [],
    fechaPago       : [], 
};

const formaPago = [{id:1, forma:"Efectivo"}, {id:2, forma:"Tarjeta Débito"}, {id:3, forma:"Tarjeta Crédito"}, {id:4, forma:"Transferencia digital"}];

const PosCajaPagoFactura = (props:{HandlerdClickCerrar?: any, Factura?: any, Pago?: any}) => {
    
    const emp:State.data = useSelector((state: any) => state.emp);  
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar Pagos");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(false); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Pagar");      

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Id.',
            selector: (row: FormData) => row.id,
            width: "70px",
            sortable: true,
            right: "true",
        },  
        {
            name: 'POS',
            selector: (row: FormData) => row.nmPos,
            width: "130px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Caja',
            selector: (row: FormData) => row.nmCja,
            width: "80px",
            wrap: true,
            sortable: true,
        },        
        {
            name: 'Factura',
            selector: (row: FormData) => row.idFactura,
            width: "100px",
            right: "true",
            sortable: true, 
            format : (row)=> row.idFactura.toLocaleString().padStart(7, '0')                               
        }, 
        {
            name: 'Pago',
            selector: (row: FormData) => formaPago[row.formaPago - 1].forma,
            width: "110px",
            wrap: true,
            sortable: true,            
        },         
        {
            name: 'Valor Factura',
            selector: (row: FormData) => row.valorPagado,
            width: "140px",
            right: "true",
            sortable: true,  
            format : (row)=> row.valorPagado.toLocaleString()                 
        }, 
        {
            name: 'Recibido',
            selector: (row: FormData) => row.valorRecibido,
            width: "110px",
            right: "true",
            sortable: true,  
            format : (row)=> row.valorRecibido.toLocaleString()                   
        }, 
        {
            name: 'Devto/Saldo',
            selector: (row: FormData) => row.valorDevuelto,
            width: "130px",
            right: "true",
            sortable: true,  
            format : (row)=> row.valorDevuelto.toLocaleString()                   
        }, 
        {
            name: 'Fecha',
            selector: (row: FormData) => row.fechaPago?.substring(0, 10),
            width: "110px",
            sortable: true,                     
        },                                           
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        {/* <div>
                            <a href='#inicio' className={"text-warning"} title="Edita" onClick={()=>edita(row)}>
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> */} 
                        <div>
                            <a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(row)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "110px",
        },                             
    ];

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
        console.log(frmData);
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

    const handlerCalculo = ()=>{

        const vr = parseInt(`${frmData.valorRecibido}`);
        const vf = parseInt(`${frmData.valorPagado}`);
        frmData.valorDevuelto = vr - vf;
        setFormData({ ...frmData}); 

    }

    const listar = async () =>{
        let response;
        if (props.Factura === 0){
            response = await httpApiGet(`PosCajaPagofactura`);
        }else{
            response = await httpApiGet(`PosCajaPagofactura/byFactura/${props.Factura}`);            
        }

        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((pgo: any) => {
                let obj = {};
                //se busca el nombre del pos
                const pos: any = emp.tipologia.sedes.find((ps: any) => ps.id === pgo.idPos);
                //se busca el nombre de la caja                
                const cj: any = emp.tipologia.cajas.find((cj: any) => cj.id === pgo.idCaja);               
                obj = {...pgo, nmPos: pos.nombre, nmCja:cj.nombre}
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
        setTituloBoton(!estadosVisibles ? "Ocultar Pagos" : "Mostrar Pagos");
        setEstadosVisibles(!estadosVisibles);
    }

    const OnbtnLimpiar = () => {
        
        // borra las cajas de datos de entrada
        //const inputsArray = Object.entries(frmData);
        //const clearInputsArray = inputsArray.map(([key]) => [key, '']); // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        //const inputsJson = Object.fromEntries(clearInputsArray); //Convertimos el arreglo de arreglos nuevamente a formato json
        //frmData = {...inputsJson, id: 0, idCaja: 0, idPos: 0, valor: 0, revisorId: 0, estadoArqueo: 0, formaPago: 0}
        frmData.valorRecibido = 0;
        frmData.valorDevuelto = 0;
        setFormData(frmData);
        setBtnRef("Pagar");
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

        if (frmData.idFactura <= 0){
            apiError = {
                ...apiError,            
                idFactura:["Se requiere una factura válida"],
            }               
        }

        if (frmData.valorRecibido <= 0){
            apiError = {
                ...apiError,            
                valorRecibido:["Debe ser un valor válido Mayor igual a 0"],
            }               
        }

        if (frmData.valorPagado <= 0){
            apiError = {
                ...apiError,            
                valorPagado:["Debe seleccionar un estado"],
            }               
        }
        
        if (frmData.fechaPago == ""){
            apiError = {
                ...apiError,            
                fechaPago:["Debe seleccionar una fecha"],
            }               
        }   
        
        if (frmData.formaPago <= 0){
            apiError = {
                ...apiError,            
                formaPago:["Debe seleccionar una forma de pago"],
            }               
        }          

        if ((apiError.idCaja && (apiError.idCaja?.length > 0)) 
            || (apiError.idPos && (apiError.idPos?.length > 0))
            || (apiError.idFactura && (apiError.idFactura?.length > 0))       
            || (apiError.valorRecibido && (apiError.valorRecibido?.length > 0)
            || (apiError.valorPagado && (apiError.valorPagado?.length > 0))
            || (apiError.fechaPago && (apiError.fechaPago?.length > 0))))
            {
            setApiError({...apiError});   
        }else{
            
            if (btnRef === "Pagar"){
                frmData.createdAt = frmData.updatedAt = getFechaYhora();

                // Si el valor devuelto es negativo, no guardarlo
                frmData = {...frmData, valorDevuelto: (frmData.valorDevuelto < 0) ? 0: frmData.valorDevuelto};
                setFormData(frmData);

                //Consumir service de /Poscajapagofactura, método Post
                const response = await httpApiPPPD("PosCajaPagofactura", "POST", {
                    "Content-Type" : "application/json"
                }, frmData);

                if (response.statusCode >= 400){
                    setOperacion(false);
                    mensajeModal = [...response.messages];

                }else{
                    setOperacion(true);
                    // actualiza la grilla
                    estadosVisibles && listar();
                    msg = "Se ha guardado el pago exitosamente!!!";
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }else{
                frmData.updatedAt = fechaYhora;
                //Consumir service de /PosTipoIdCliente, método Put
                const response = await httpApiPPPD(`PosCajaPagofactura/${frmData.id}`, "PUT", {
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

    const borraSiNo = async (row: FormData)=>{

        const response = await httpApiDelete(`PosCajaPagofactura/${row.id}`, "Delete");

        if (response.code >= 400){
            setOperacion(false);
            mensajeModal = [...response.message];
            setMensajeModal([...mensajeModal]);
            setShowInfo(true);
        }else{
            listar();         
        }
    }

    console.log(emp);

    useEffect(()=>{
2
        frmData.idFactura = parseInt(`${props.Factura}`);
        frmData.valorPagado = parseInt(`${props.Pago}`);    
        frmData.fechaPago = getFechaYhora().substring(0, 10);    
        setFormData({...frmData});

    }, []); 

    return(
        <div className="border p-1 rounded" style={{"color": "#2A3482"}}>
            <a id="inicio"></a>
            {/* <label htmlFor="" className="h3 p-2 m-2">Pago factura</label> */}
            <form className='row border p-2 m-2'>
                <div className="col-lg-4  col-sm-12 mb-3">
                    <label htmlFor="idPos" className="form-label">* Pos</label>                
                    <GenericSelectPersonalized 
                        Data={emp.tipologia.sedes} 
                        ValueField="id"
                        ValueText="nombre"
                        Value={`${frmData.idPos}`} 
                        onSelect={handlerPersonalizedSelect} 
                        ClassName="form-select" 
                        id={`idPos`}
                        disabled={(btnRef == "Actualizar")}
                    /> 
                    <Alert show={apiError.idPos && apiError.idPos.length > 0} alert="#F3D8DA" msg={apiError.idPos}/>                    
                </div> 
                <div className="col-lg-4  col-sm-12 mb-3">
                    <label htmlFor="idPos" className="form-label">* Caja</label>   
                    <GenericSelectPersonalized 
                        Data={emp.tipologia.cajas.filter((item: any) => item.idPos === parseInt(frmData.idPos.toString()))} 
                        ValueField="id"
                        ValueText="nombre"
                        Value={`${frmData.idCaja}`} 
                        onSelect={handlerPersonalizedSelect} 
                        ClassName="form-select" 
                        id={`idCaja`}
                        disabled={(parseInt(frmData.idPos.toString()) === 0)}
                    />                     
                    <Alert show={apiError.idCaja && apiError.idCaja.length > 0} alert="#F3D8DA" msg={apiError.idCaja}/>                    
                </div>             
                <div className="col-lg-4 col-sm-12 mb-3">
                    <label htmlFor="idPos" className="form-label">&nbsp;</label>  
                    <div className="form-label text-center h3 border border-3 rounded">Venta Nro. {frmData.idFactura}</div>                    
                </div>    
                <div className="col-lg-4  col-sm-12 mb-3">
                    <label htmlFor="idPos" className="form-label">* Forma de pago</label>   
                    <select className="form-select" aria-label="Default select example" id="formaPago" value={frmData.formaPago} onChange={handler}>
                        <option value="0" >Seleccione forma de pago</option>
                        {
                            formaPago.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.forma}`}</option>)
                        }    
                    </select>
                    <Alert show={apiError.formaPago && apiError.formaPago.length > 0} alert="#F3D8DA" msg={apiError.formaPago}/>                    
                </div> 
                
                <div className="col-lg-4 col-md-12 col-sm-12 mb-3 offset-lg-4">
                    <label htmlFor="valor" className="form-label">Fecha de pago</label>                  
                    <input type="date" className="form-control text-end" id="fechaPago"  placeholder="" value={frmData.fechaPago} onChange={handler} />
                    <Alert show={apiError.fechaPago && apiError.fechaPago.length > 0} alert="#F3D8DA" msg={apiError.fechaPago} />
                </div> 

                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <div className="form-label text-center h3 border border-3 rounded">Valor factura</div> 
                    <div className="form-label text-center h3 border border-3 rounded" style={{backgroundColor: "#EEEDEC"}}>${frmData.valorPagado?.toLocaleString()}</div>                                      
                </div> 

                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <div className="form-label text-center h3 border border-3 rounded">Valor recibido</div>               
                    <input type="text" className="border rounded border-3 text-center w-100 fw-bold h3" id="valorRecibido"  placeholder="" value={frmData.valorRecibido}  
                        onChange={handler} onKeyUp={handlerCalculo} inputMode="numeric"
                        style={{height: "40px"}}
                    />
                    <Alert show={apiError.valorRecibido && apiError.valorRecibido.length > 0} alert="#F3D8DA" msg={apiError.valorRecibido} />
                </div>   
                
                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <div className="form-label text-center h3 border border-3 rounded text-danger">Valor devuelto</div> 
                    <div className="form-label text-center h3 border border-3 rounded text-danger" style={{backgroundColor: "#EEEDEC"}}>${frmData.valorDevuelto?.toLocaleString()}</div> 
                </div>            
         
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-4 col-md-12 col-sm-12 ">
                        <Button className="m-1 p-2 btn-success w-100" id="btnGuardar" onClick={OnbtnGuardar} >{btnRef}</Button>   
                    </div>   
                    <div className="col-lg-4 col-md-12 col-sm-12 ">
                        <Button className="m-1 p-2 btn-danger w-100 " id="btnLimpiar" onClick={props.HandlerdClickCerrar} >Cerrar</Button>      
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
                            title="Historial de pagos"
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
                Title='Pagos de factura'
                Message={mensajeModal}
                Icon={operacion}
                BtnOkName='Aceptar'
                BtnNokName=''
                Show={showInfo}
                HandlerdClickOk={()=> setShowInfo(false)}
                size="md"
                HandlerdClickNok={null}
            />}
        </div>
    )
};

export default PosCajaPagoFactura;