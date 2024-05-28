import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import FormData from "../PosInventarioProductos/Dto/FormData";
import { getTipoNameByid, httpApiGet} from "../../lib";
import BarraMenu from "../../component/BarraMenu";
import ViewProductModal from "../../component/ViewProductModal";

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

const PosInventarioProductos = () => {
       
    const [pending, setPending] = useState(false);  
    let [idPos, setIdPos] = useState(0);  
    let [data, setData] = useState([]);   
    let [cpRecords, setCpRecords] = useState([]);       
    let [mensajeModal, setMensajeModal] = useState([]);  
    let [tipos, setTipos] = useState({});      
    const [row, setRow] = useState({});  
    const [showDetail, setShowDetail] = useState(false);                

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Pos.',
            selector: (row: FormData) => row.nmPos,
            width: "130px",
            sortable: true,
        },  
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
            width: "150px",
            wrap: true,
            sortable: true,
        },   
        {
            name: 'Descripción ',
            selector: (row: FormData) => row.descripcion,
            width: "200px",
            wrap: true,
            sortable: true,
        },               
        {
            name: 'Cant.',
            selector: (row: FormData) => row.cantidad,
            width: "100px",
            sortable: true,  
            format: (row: FormData) => row.cantidad.toLocaleString(),   
            right: true.toString(),                   
        },         
        {
            name: 'Valor ($)',
            selector: (row: FormData) => row.valorUnitario,
            width: "120px",
            sortable: true,    
            format: (row: FormData) => row.valorUnitario.toLocaleString(),    
            right: true.toString(),                                     
        }, 
        {
            name: 'Imp.(%)',
            selector: (row: FormData) => row.impuesto,
            width: "110px",     
            sortable: true,    
            format: (row: FormData) => row.impuesto.toLocaleString(),   
            right: true.toString(),                                      
        },         
        {
            name: 'Dcto (%)',
            selector: (row: FormData) => row.descuento,
            width: "120px",
            sortable: true,     
            right: true.toString(),                          
        },          
        {
            name: 'Cmpto',
            selector: (row: FormData) => row.nmPrdCmp,
            width: "130px",
            wrap: true,
            sortable: true,         
        },                                    
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#' className={`text-success`} title="Edita" onClick={()=>view(row)} >
                                <FaEye  style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                </div>,
            width: "150px",
        },                             
    ];

    const view = (row: FormData) =>{
        setRow({...row});
        setShowDetail(true);
    };

    const changeTextFiltro = (evnt: any) => {
        if (evnt.target.value.trim() === ""){
          setData([...cpRecords]);  
        }else{
            const reg = cpRecords.filter((data: FormData)=> {
                return    data.idPos && data.idPos.toString().includes(evnt.target.value)
                       || data.nmPos && data.nmPos.toUpperCase().includes(evnt.target.value.toUpperCase())
                       || data.idCodigo && data.idCodigo.toString().includes(evnt.target.value) 
                       || data.nombre && data.nombre.toUpperCase().includes(evnt.target.value.toUpperCase())  
                       || data.descripcion && data.descripcion.toUpperCase().includes(evnt.target.value.toUpperCase()); 
            }); 
            data = [...reg] ;
            setData([...data]);              
        }
    }

    const handleClose = () => setShowDetail(false);

    const getTipos = async () => {

        const response = await httpApiGet("UtiliatriesApi");
        if (response.statusCode >= 400){
            setOperacion(false);
            mensajeModal = [...response.messages];

            setMensajeModal(mensajeModal);            
            setShowInfo(true);
        }else{
            tipos = response.data;
            setTipos({...tipos});             
        }

    };
    
    const listar = async () =>{

        const response = await httpApiGet("Posinventarioproducto");
        if (response.statusCode >= 400){
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
        }else{          
            const dta: any = [];
            response.data.map((prd: any) => {
                let obj = {};
   
                const pos: any = getTipoNameByid(prd.idPos, tipos.sedes);
                const tp: any = getTipoNameByid(prd.tipoProducto, tipos.tipoProducto);
                const pcs: any = getTipoNameByid(prd.idProductoCompuesto, tipos.tipoPrdCompuesto);
                const um: any = getTipoNameByid(prd.unidadMedida, tipos.unidadMedida);
                const emb: any = getTipoNameByid(prd.embalaje, tipos.tipoEmbalaje);                    

                obj = {...prd, nmPos:pos, nmTp:tp, nmPrdCmp: pcs, nmUM: um, nmEmb: emb};
                dta.push(obj);
            });

            data = [...dta];
            setData(data);    
        }
    };

    const handler = (e: any) => {
        idPos = parseInt(e.target.value);
        setIdPos(idPos);
        if (idPos === -1){
            listar().then(()=>{
                cpRecords = [...data];
                setCpRecords(cpRecords);                
            });              
        }else{
            if (idPos === 0){
                cpRecords = [];
                setCpRecords([...cpRecords]);
            }else{
                listar().then(()=>{
                    cpRecords = data.filter((prd: any) => prd.idPos === idPos);  
                    setCpRecords([...cpRecords]);                     
                });           
            }
        }
    }

    useEffect(()=>{     
        getTipos();
    }, []); 

    return(
        <>
            <div className=' vh-100 m-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className=' d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    <div className="border p-1 rounded" style={{"color": "#2A3482"}}>
                        <a id="inicio"></a>
                        <label htmlFor="" className="h3 p-2 m-2">Inventario de productos x POS</label>
                        <div className="ms-2 mt-3 p-2 border rounded">    
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="pos" className="">Mostrar</label> 
                                <select className="form-select" aria-label="Default select example" id="idPos" value={idPos} onChange={handler}>
                                    <option value="0" >Seleccione opción</option>
                                    {
                                        tipos.sedes && tipos.sedes.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                                    }    
                                    <option value="-1" >Todos los productos de todos los P.O.S.</option>                                    
                                </select>          
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="filtro" className="">Filtrar <label style={{fontSize: "10px", fontStyle: "italic"}}>(por POS, código, nombre, descripción)</label></label>           
                                <input type="text" className="form-control" id="filtro"  placeholder="" onChange={changeTextFiltro}/>
                            </div>                        
                        </div> 

                            <DataTable 
                                title="Listado de productos"
                                className="border rounded"
                                columns={columnas}
                                data={cpRecords} 
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
                    </div>            
                </div>
                <div className='d-flex align-items-center justify-content-center bg-dark'>
                    <span className=' h3 text-white'>@Corys90</span>
                </div> 
                {showDetail && <ViewProductModal Data={row} Show={showDetail} onClose={handleClose}/>}                                       
            </div>

        </>
    )
};

export default PosInventarioProductos;