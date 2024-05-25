import { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegEye, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import Alert from "../../component/Alert";
import FormData from "./Dto/FormData";
import VerFactura from "../../component/VerFactura";
import { httpApiGet } from "../../lib";
import { GrTextAlignCenter } from "react-icons/gr";
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
            fontSize: "32px",
        },
    },
    headRow:{
        style: {
            color: "#2A3482",
            background:"#F5F5F5",
            fontSize: "14px"
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

/* const ApiErrMsg: any = {
    idFiltro               : [],
}; */

const PosFacturasList = () => {
    
    let [frmData, setFormData] = useState([]);          
    const [pending, setPending] = useState(false); 
    const [showMsg, setShowMsg] = useState(false);     
    let [verFactura, setVerFactura] = useState(false); 
    let [idFactura, setIdFactura] = useState(0);           
    let [tipoModal, setTipoModal] = useState(true);   
    let [mensajeModal, setMensajeModal] = useState([]);          
    let [sltPos, setSltPos] = useState([]);     
    let [filtro, setFiltro] = useState({tipoFiltro: "0", filtro: ""});                                    
    const [width, setWidth] = useState(window.innerWidth);

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [   
        /* {
            name: '',
            selector: (row: FormData, idx: number) => 
                <div className='d-flex gap-3 justify-center align-items-center' key={idx}>
                        <div><a href='#!' className=' text-danger'  title="Borra item" onClick={()=>borraItem(idx)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "50px",
            right: "true", 
            omit: (width > 1657)             
        },  */     
        {
            name: 'Factura',
            selector: (row: FormData) => row.idFactura,
            width: "100px",
            sortable: true,
            right:"true"
        },  
        {
            name: 'Cliente',
            selector: (row: FormData) => row.nit,
            width: "110px",
            sortable: true,
        }, 
        {
            name: 'Nombre',
            selector: (row: FormData) => row.razonSocial,
            width: "200px",    
            wrap: true,               
            sortable: true,        
        },        
        {
            name: 'Total',
            selector: (row: FormData) => row.total,
            width: "180px",
            right: "true",    
            sortable: true,
            format: (row: FormData) => row.total.toLocaleString()                  
        },  
        {
            name: 'Fecha',
            selector: (row: FormData) => row.fechaFactura?.substring(0, 10),
            width: "180px",
            sortable: true,          
        }, 
        {
            name: '',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <Button  className="bg-transparent border-0"  title="ver factura" onClick={()=>Ver(row.idFactura)}>
                                <FaRegEye className="text-warning" style={{width: "20px", height: "20px"}}/>
                            </Button>
                        </div>
                        <div>
                            <a  className=' text-danger'  title="edita factura" /* onClick={()=>edita(row.idFactura)} */>
                                <FaPencilAlt  className="text-success"   style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>                        
                        <div>
                            <a className=' text-danger'  title="Borra factura" /* onClick={()=>ver(row.idFactura)} */>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>                        
                </div>,
            width: "150px",
            right: "true",  
            /* omit: (width <= 1656) */                
        },                                                                               
    ];

    const listar = async (filtro: any) =>{

        let response;
        let uri;

        // limpia la grilla
        frmData = [];
        setFormData(frmData);

        if (filtro.tipoFiltro === '1'){
            uri = `Posfactura`;
        }else{
            if (filtro.tipoFiltro  === '2'){
                if (filtro.filtro === ""){
                    setShowMsg(true);
                    return;
                }
                const nf = parseInt(`${filtro.filtro}`);
                uri = `Posfactura/${nf}`;
            }else{
                if (filtro.tipoFiltro  === '3'){
                    if (filtro.filtro === ""){
                        setShowMsg(true);
                        return;
                    }
                    uri = `Posfactura/GetByClienteId/${filtro.filtro}`;
                }else{
                    return;
                }
            }
        }
        response = await httpApiGet(uri);        
        if (response.statusCode >= 400){
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            

        }else{
            frmData = [...response.data];        
            setFormData(frmData);                   
        }
    }

    const Mensajes = (tipo: boolean, msjs: any, size: string) => {

        setShowMsg(true);
        tipoModal = tipo;
        setTipoModal(tipoModal);
        setMensajeModal(msjs);
        setSizeModal(size);

    }
    
    const handler = (e: any) => {

        const value = e.target.value;
        const id = e.target.id;
        filtro  = {...filtro, [id]: value};
        setFiltro({...filtro});
        if (id === "filtro"){
            setShowMsg(false);        
        }
    }

    const getUnidadMedida = async (umId: number)=>{
        const response = await httpApiGet(`PosUnidadesMedida/${umId}`);
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            return response.data[0].nombre;                
        }
    }  

    const Ver = (idf: number)=>{

        idFactura = idf;
        setIdFactura(idFactura);
        verFactura = true,
        setVerFactura(verFactura);

    }
    
    useEffect(()=>{
            
        const handleResize = () => {

            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []) 

    return(
        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="">
                        <div className="col-lg-12 col-md-12  col-sm-12 ">
                            <div className=" border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                                <a id="inicio"></a>

                                <label htmlFor="" className="h3 p-2 m-2">Listado de facturas generadas</label>
                                <fieldset className='row border rounded p-2 m-2'>

                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3 " style={{backgroundColor: "#F4F6F6"}}>
                                        <div className="  row d-flex border rounded">
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                <label htmlFor="idPos" className="form-label">Filtrar por </label>                
                                                <select className="form-select" aria-label="Default select example" id="tipoFiltro" value={filtro.tipoFiltro} onChange={handler} >
                                                    <option value="0" >Seleccione</option> 
                                                    <option value="1" >Todas las facturas</option>                                         
                                                    <option value="2" >Nro. Factura</option> 
                                                    <option value="3" >Nro. Identificación Cliente</option>                                                                                 
                                                </select>          
                                            </div> 
                                            <div className="col-lg-6 col-md-12 col-sm-12">
                                                <label htmlFor="idCliente" className="form-label">Valor filtro</label> 
                                                <div className="w-100 d-flex gap-2 ">
                                                    <div className="w-100">
                                                        <input type="text" className="form-control" id="filtro"  placeholder="" value={filtro.filtro} disabled={(filtro.tipoFiltro === "0") || (filtro.tipoFiltro === "1")} onChange={handler}/>                    
                                                    </div>                         
                                                    <div className="">                    
                                                        <Button className=" btn-secondary " disabled={(filtro.tipoFiltro === "0")}  onClick={() => listar(filtro)} > <FaSearch /></Button>   
                                                    </div>                      
                                                </div> 
                                                <Alert show={showMsg} alert="#F3D8DA" msg={["Debe digitar un valor"]} />                  
                                            </div>                                
                                        </div>
                                    </div>
                                    {/* zona de detalle del produto */}
                                    <div className=" mt-3 mb-3 p-2 rounded">          
                                        <DataTable 
                                            title=""
                                            className="border rounded"
                                            columns={columnas}
                                            data={frmData} 
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

                                </fieldset>                                   
                            </div>            
                        </div>
                        {verFactura && <VerFactura
                                    Show={verFactura}
                                    HandlerdClickCerrar={()=>setVerFactura(false)}
                                    Factura={idFactura}
                                /> }              
                    </div>            
                </div>
                <div className='d-flex align-items-center justify-content-center ' style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>



    )
};

export default PosFacturasList;