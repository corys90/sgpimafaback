import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import Alert from "../../component/Alert";
import ApiErrorMessage from "../PosInventarioProductos/Dto/ApiErrorMessage";
import FormData from "../PosInventarioProductos/Dto/FormData";
import MsgDialog from "../../component/MsgDialog";
import { formatDate, getFechaYhora, httpApiGet, httpApiPPPD} from "../../lib";
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
            fontSize: "16px",
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
    id                  : 0,
    idCodigo            : 0,
    tipoProducto        : 0,
    idProductoCompuesto : 0,
    nombre              : "",
    descripcion         : "",   
    cantidad            : 0,
    valorUnitario       : 0,
    unidadMedida        : 0,
    lote                : "",
    color               : "",
    olor                : "",
    textura             : "",
    tamano              : "",
    peso                : 0,
    embalaje            : 0,
    temperatura         : 0,
    stockMinimo         : 0,
    descuento           : 0,
    impuesto            : 0,
    valorImp            : 0,
    fechaCreacion       : "",
    diasVencimiento     : 0,
    fechaVencimiento    : "",
    nmPos               : "",
    nmPrdCmp            : ""
};

const ApiErrMsg: ApiErrorMessage = {
    id                  : [],
    idCodigo            : [],
    tipoProducto        : [],
    idProductoCompuesto : [],
    nombre              : [],
    descripcion         : [],   
    cantidad            : [],
    valorUnitario       : [],
};

const InventarioProductos = () => {
    
    const [estadosVisibles, setEstadosVisibles] = useState(false);
    const [tituloBoton, setTituloBoton] = useState("Mostrar productos");
    let [frmData, setFormData] = useState(form);    
    const [pending, setPending] = useState(false); 
    // eslint-disable-next-line prefer-const
    let [apiError, setApiError] = useState(ApiErrMsg); 
    let [data, setData] = useState([]);   
    let [cpRecords, setCpRecords] = useState([]);       
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(false); 
    let [mensajeModal, setMensajeModal] = useState([]);       
    const [btnRef, setBtnRef] = useState("Guardar");                     

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Código',
            selector: (row: FormData) => row.idCodigo,
            width: "110px",        
            sortable: true,
            right: true.toString(),                   
        }, 
        {
            name: 'Nombre ',
            selector: (row: FormData) => row.nombre,
            wrap: true,
            sortable: true,
            grow: 2
        },   
        {
            name: 'Descripción ',
            selector: (row: FormData) => row.descripcion,
            wrap: true,
            sortable: true,
            grow: 3
        },               
        {
            name: 'Cant.',
            selector: (row: FormData) => row.cantidad,
            sortable: true,  
            format: (row: FormData) => row.cantidad.toLocaleString(),   
            right: true.toString(),                   
        },         
        {
            name: 'Valor ($)',
            selector: (row: FormData) => row.valorUnitario,
            sortable: true,    
            format: (row: FormData) => row.valorUnitario.toLocaleString(),    
            right: true.toString(),  
            grow: 2                                   
        }, 
        {
            name: 'Imp.(%)',
            selector: (row: FormData) => row.impuesto,  
            sortable: true,    
            format: (row: FormData) => row.impuesto.toLocaleString(),   
            right: true.toString(),  
            grow: 2                                    
        },         
        {
            name: 'Dcto (%)',
            selector: (row: FormData) => row.descuento,
            sortable: true,     
            right: true.toString(), 
            grow: 2                         
        },          
        {
            name: 'Cmpto',
            selector: (row: FormData) => row.nmPrdCmp,
            wrap: true,
            sortable: true,  
            grow: 3       
        },                                    
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className={`text-warning`} title="Edita" onClick={()=>edita(row)} >
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                        {/* <div><a href='#!' className=' text-danger'  title="Borra" onClick={()=>borraSiNo(idx)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> */}
                </div>,
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

    const getOption = (opt: number) => {
        const slt = document.getElementById('idProductoCompuesto');
        const opc = slt[opt];
        return(opc.text);
    }

    const listar = async () =>{
        const response = await httpApiGet("inventarioproducto");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            const dta: any = [];
            response.data.map((prd: any) => {
                let obj = {};          
                //const pcs: any = sltPrdCmp.find((pc: any) => pc.id === prd.idProductoCompuesto);
                obj = {...prd, nmPrdCmp: getOption(prd.idProductoCompuesto)};
                dta.push(obj);    
            });

            data = [...dta];
            setData(data);    
            cpRecords = [...data];
            setCpRecords(cpRecords);
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
        frmData = {...inputsJson, id: 0, idPos: 0, idCodigo: 0, tipoProducto: 0, idProductoCompuesto: 0,
            cantidad: 0, valorUnitario: 0, unidadMedida: 0, tamano: 0, peso: 0, embalaje: 0, temperatura: 0, 
            stockMinimo: 0, descuento: 0, impuesto: 0, valorImp: 0, diasVencimiento: 0                        
        }
        setFormData(frmData);
        setBtnRef("Guardar");
        setApiError(ApiErrMsg);
    } 
    
    const OnbtnGuardar = async () => {
        
        console.log(frmData);
        let msg = ""; 
        mensajeModal =  [];

        if (frmData.idCodigo && frmData.idCodigo <= 0){
            apiError = {
                ...apiError,            
                idCodigo:["Debe digitar un código válido"],
            }               
        }

        if (frmData.tipoProducto && frmData.tipoProducto <= 0){
            apiError = {
                ...apiError,            
                tipoProducto:["Seleccione un tipo de producto"],
            }               
        }

        if (frmData.idProductoCompuesto <= 0){
            apiError = {
                ...apiError,            
                idProductoCompuesto:["Debe seleccionar la composición del producto"],
            }               
        }

        if (frmData.nombre.trim() === ""){
            apiError = {
                ...apiError,            
                nombre:["Debe escribir un nombre para el producto"],
            }               
        }

        if (frmData.cantidad <= 0){
            apiError = {
                ...apiError,            
                cantidad:["Debe escribir un valor válido"],
            }               
        }      
          
        if (frmData.valorUnitario <= 0){
            apiError = {
                ...apiError,            
                valorUnitario:["Debe escribir un valor válido"],
            }               
        }          

        if ((apiError.idCodigo && (apiError.idCodigo.length > 0))  
            || (apiError.tipoProducto && (apiError.tipoProducto.length > 0)) 
            || (apiError.idProductoCompuesto && (apiError.idProductoCompuesto.length > 0))       
            || (apiError.nombre && (apiError.nombre.length > 0))
            || (apiError.valorUnitario && (apiError.valorUnitario.length > 0))){
            setApiError({...apiError});   
        }else{
            if (btnRef === "Guardar"){
                frmData.createdAt = getFechaYhora();
                frmData.updateAt = getFechaYhora();
                frmData.fechaCreacion = getFechaYhora();
                // calcular aquí la fecha de vencimiento según fecha de creación
                frmData.fechaVencimiento = getFechaYhora();

                //Consumir service de /Posinventarioproducto, método Post
                const response = await httpApiPPPD(`inventarioproducto`, "POST", {
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

                frmData.updateAt = getFechaYhora();                
                // calcular aquí la fecha de vencimiento según fecha de creación
                frmData.fechaVencimiento = getFechaYhora();

                //Consumir service de /Posinventarioproducto, método Put
                const response = await httpApiPPPD(`inventarioproducto/${frmData.id}`, "PUT", {
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
                    msg = "Se ha actualizado la información del producto exitosamente!!!"
                    mensajeModal.push(msg);
                    OnbtnLimpiar();
                }  
            }
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }
    }  

    const edita = (row: FormData) =>{         
        frmData = {...row, fechaCreacion: row.fechaCreacion.substring(0, 10), fechaVencimiento: row.fechaVencimiento.substring(0, 10)}
        setFormData({...frmData});
        setBtnRef("Actualizar");  
    };

    const changeTextFiltro = (evnt: any) => {
        if (evnt.target.value.trim() === ""){
          setData([...cpRecords]);  
        }else{
            const reg = cpRecords.filter((data: FormData)=> {
                return    data.nmPrdCmp && data.nmPrdCmp.toString().toUpperCase().includes(evnt.target.value.toUpperCase())
                       || data.nmPos && data.nmPos.toUpperCase().includes(evnt.target.value.toUpperCase())
                       || data.idCodigo && data.idCodigo.toString().includes(evnt.target.value) 
                       || data.nombre && data.nombre.toUpperCase().includes(evnt.target.value.toUpperCase())  
                       || data.descripcion && data.descripcion.toUpperCase().includes(evnt.target.value.toUpperCase()); 
            }); 
            data = [...reg] ;
            setData([...data]);              
        }
    }

    const handlerGenSelect = (opt: {id: string, value: string, text: string}) => {

        frmData[opt.id] = parseInt(opt.value);
        setFormData({ ...frmData});
        apiError = {
            ...apiError,
            [opt.id]: [],
        }
        setApiError({...apiError});

    } 

    useEffect(()=>{       
    }, []); 

    return(
        <div className=' vh-100 m-5 border rounded-3 shadow '>
            <BarraMenu /> 
            <div  className=' d-flex justify-content-evenly align-items-center bg-body-tertiary '>
                <div className="border p-1 rounded " style={{"color": "#2A3482"}}>
                    <a id="inicio"></a>
                    <label htmlFor="" className="h3 p-2 m-2">Inventario General de Productos</label>
                    <form className='row border p-2 m-2 '>

                        <label htmlFor="" className="m-2 h5">Datos básicos (obligatorios)</label>
                        <hr className="pb-2" />

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="idCaja" className="form-label">* Código producto</label>                               
                            <input type="number" min={0} className="form-control text-end" id="idCodigo"  placeholder="" value={frmData.idCodigo} onChange={handler}  disabled={(btnRef == "Actualizar")}/>
                            <Alert show={apiError.idCodigo && apiError.idCodigo.length > 0} alert="#F3D8DA" msg={apiError.idCodigo}/>                    
                        </div>    

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="tipoProducto" className="form-label">* Tipo producto</label>                
                            <GenericSelect 
                                    Url="PosTipoProducto" 
                                    ValueField="id"
                                    ValueText="nombre"
                                    Value={`${frmData.tipoProducto}`} 
                                    onSelect={handlerGenSelect} 
                                    ClassName="form-select" 
                                    id={`tipoProducto`}
                            />                            
                            <Alert show={apiError.tipoProducto && apiError.tipoProducto.length > 0} alert="#F3D8DA" msg={apiError.tipoProducto}/>                    
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="idProductoCompuesto" className="form-label">* Producto compuesto</label>                
                            <GenericSelect 
                                    Url="PosProductoCompuesto" 
                                    ValueField="id"
                                    ValueText="nombre"
                                    Value={`${frmData.idProductoCompuesto}`} 
                                    onSelect={handlerGenSelect} 
                                    ClassName="form-select" 
                                    id={`idProductoCompuesto`}
                            />      
                            <Alert show={apiError.idProductoCompuesto && apiError.idProductoCompuesto.length > 0} alert="#F3D8DA" msg={apiError.idProductoCompuesto}/>                    
                        </div>  

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">* Nombre producto</label>                  
                            <input type="text" className="form-control" id="nombre"  placeholder="" value={frmData.nombre} onChange={handler}/>
                            <Alert show={apiError.nombre && apiError.nombre.length > 0} alert="#F3D8DA" msg={apiError.nombre} />
                        </div>   

                        <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">* Descripción</label>                  
                            <input type="text" className="form-control" id="descripcion"  placeholder="" value={frmData.descripcion} onChange={handler}/>
                            <Alert show={apiError.descripcion && apiError.descripcion.length > 0} alert="#F3D8DA" msg={apiError.descripcion} />
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">* Cantidad</label>                  
                            <input type="number" className="form-control text-end" id="cantidad"  placeholder="" value={frmData.cantidad} onChange={handler}/>
                            <Alert show={apiError.cantidad && apiError.cantidad.length > 0} alert="#F3D8DA" msg={apiError.cantidad} />
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">* Valor unitario ($)</label>                  
                            <input type="number" className="form-control text-end" id="valorUnitario"  placeholder="" value={frmData.valorUnitario} onChange={handler}/>
                            <Alert show={apiError.valorUnitario && apiError.valorUnitario.length > 0} alert="#F3D8DA" msg={apiError.valorUnitario} />
                        </div>                                  
        
                        <label htmlFor="" className="m-2 h5">Información adicional</label>
                        <hr />

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="estado" className="form-label">Unidad de medida</label>                
                            <GenericSelect 
                                    Url="PosUnidadesMedida" 
                                    ValueField="id"
                                    ValueText="nombre"
                                    Value={`${frmData.unidadMedida}`} 
                                    onSelect={handlerGenSelect} 
                                    ClassName="form-select" 
                                    id={`unidadMedida`}
                            /> 
                            {/* <Alert show={apiError.unidadMedida && apiError.unidadMedida.length > 0} alert="#F3D8DA" msg={apiError.unidadMedida}/>    */}                 
                        </div> 
                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Lote</label>                  
                            <input type="text" className="form-control" id="lote"  placeholder="" value={frmData.lote} onChange={handler}/>
        {/*                     <Alert show={apiError.lote && apiError.lote.length > 0} alert="#F3D8DA" msg={apiError.lote} /> */}
                        </div>  

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Color</label>                  
                            <input type="text" className="form-control" id="color"  placeholder="" value={frmData.color} onChange={handler}/>
        {/*                     <Alert show={apiError.color && apiError.color.length > 0} alert="#F3D8DA" msg={apiError.color} /> */}
                        </div>

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Olor</label>                  
                            <input type="text" className="form-control" id="olor"  placeholder="" value={frmData.olor} onChange={handler}/>
        {/*                     <Alert show={apiError.olor && apiError.olor.length > 0} alert="#F3D8DA" msg={apiError.olor} /> */}
                        </div>   

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Textura</label>                  
                            <input type="text" className="form-control" id="textura"  placeholder="" value={frmData.textura} onChange={handler}/>
                            {/* <Alert show={apiError.textura && apiError.textura.length > 0} alert="#F3D8DA" msg={apiError.textura} /> */}
                        </div>   

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Tamaño (cms)</label>                  
                            <input type="text" className="form-control text-end" id="tamano"  placeholder="" value={frmData.tamano} onChange={handler}/>
                            {/* <Alert show={apiError.tamano && apiError.tamano.length > 0} alert="#F3D8DA" msg={apiError.tamano} /> */}
                        </div>   

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Peso (Grms)</label>                  
                            <input type="number" className="form-control text-end" id="peso"  placeholder="" value={frmData.peso} onChange={handler}/>
        {/*                     <Alert show={apiError.peso && apiError.peso.length > 0} alert="#F3D8DA" msg={apiError.peso} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="estado" className="form-label">Embalaje</label>                
                            <GenericSelect 
                                    Url="PosTipoEmbalaje" 
                                    ValueField="id"
                                    ValueText="descripcion"
                                    Value={`${frmData.embalaje}`} 
                                    onSelect={handlerGenSelect} 
                                    ClassName="form-select" 
                                    id={`embalaje`}
                            />  
        {/*                     <Alert show={apiError.embalaje && apiError.embalaje.length > 0} alert="#F3D8DA" msg={apiError.embalaje}/>    */}                 
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Temperatura (°C)</label>                  
                            <input type="number" className="form-control text-end" id="temperatura"  placeholder="" value={frmData.temperatura} onChange={handler}/>
                            {/* <Alert show={apiError.temperatura && apiError.temperatura.length > 0} alert="#F3D8DA" msg={apiError.temperatura} /> */}
                        </div>

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Stock Mínimo</label>                  
                            <input type="number" className="form-control text-end" id="stockMinimo"  placeholder="" value={frmData.stockMinimo} onChange={handler}/>
        {/*                     <Alert show={apiError.stockMinimo && apiError.stockMinimo.length > 0} alert="#F3D8DA" msg={apiError.stockMinimo} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Descuento (%)</label>                  
                            <input type="number" className="form-control text-end" id="descuento"  placeholder="" value={frmData.descuento} onChange={handler}/>
        {/*                     <Alert show={apiError.descuento && apiError.descuento.length > 0} alert="#F3D8DA" msg={apiError.descuento} /> */}
                        </div>  

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Impuestos (%)</label>                  
                            <input type="number" className="form-control text-end" id="impuesto"  placeholder="" value={frmData.impuesto} onChange={handler}/>
        {/*                     <Alert show={apiError.impuesto && apiError.impuesto.length > 0} alert="#F3D8DA" msg={apiError.impuesto} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Valor Impuesto ($)</label>                  
                            <input type="number" className="form-control text-end" id="valorImp"  placeholder="" value={frmData.valorImp} onChange={handler} disabled/>
                            {/* <Alert show={apiError.valorImp && apiError.valorImp.length > 0} alert="#F3D8DA" msg={apiError.valorImp} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Fecha de creación</label>                  
                            <input type="date" className="form-control" id="fechaCreacion"  placeholder="" value={frmData.fechaCreacion} onChange={handler}/>
        {/*                     <Alert show={apiError.fechaCreacion && apiError.fechaCreacion.length > 0} alert="#F3D8DA" msg={apiError.fechaCreacion} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Días de vencimiento</label>                                                                                                                                                                    
                            <input type="number" className="form-control text-end" id="diasVencimiento"  placeholder="" value={frmData.diasVencimiento} onChange={handler}/>
        {/*                     <Alert show={apiError.diasVencimiento && apiError.diasVencimiento.length > 0} alert="#F3D8DA" msg={apiError.diasVencimiento} /> */}
                        </div> 

                        <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nombre" className="form-label">Fecha de Vencimiento</label>                  
                            <input type="date" className="form-control" id="fechaVencimiento"  placeholder="" value={frmData.fechaVencimiento} onChange={handler} disabled/>
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
                    estadosVisibles && 
                            <div className="ms-2 mt-3 p-2 border rounded table-responsive">     
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3 offset-lg-6">
                                    <label htmlFor="filtro" className="">Filtrar <label style={{fontSize: "10px", fontStyle: "italic"}}>(por código, nombre, descripción, Cmpto)</label></label>           
                                    <input type="text" className="form-control" id="filtro"  placeholder="" onChange={changeTextFiltro}/>
                                </div>
                                <DataTable 
                                    title="Listado de productos"
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
                    }           
                    { showInfo && <MsgDialog
                        Title='Inventario'
                        Message={mensajeModal}
                        Icon={operacion}
                        BtnOkName='Aceptar'
                        BtnNokName=''
                        Show={showInfo}
                        HandlerdClickOk={()=> setShowInfo(false)}
                        HandlerdClickNok={null}
                        size="md"
                    />}
                </div>            
            </div>
            <div className='d-flex align-items-center justify-content-center bg-dark'>
                <span className=' h3 text-white'>@Corys90</span>
            </div>                        
        </div>

    )
};

export default InventarioProductos;