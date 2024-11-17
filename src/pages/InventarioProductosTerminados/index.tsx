
import DataTable from "react-data-table-component";
import { FaEye, FaSync } from "react-icons/fa";
import FormData from "../PosInventarioProductos/Dto/FormData";
import { exportToExcel, getFechaYhora, httpApiGet, responseApi} from "../../lib";
import BarraMenu from "../../component/BarraMenu";
import ViewProductModal from "../../component/ViewProductModal";
import MsgDialog from "../../component/MsgDialog";
import FooterBar from "../../component/FooterBar";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as State from  "../../redux/store/InicialState";
import LoaderSpinner from "../../component/LocalMsgModalSpinner";

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

const conditionalRowStyles =[ {
    when: (row: { estado: number; }) => row.estado === 1,
    style:{
        color: "#E8E8E8",
        backgroundColor: "white",
    }
}];

const InventarioProductosTerminados= () => {
       
    const emp:State.data = useSelector((state: any) => state.emp);   
    const [loaders, setLoaders] = useState(false);      
    let [data, setData] = useState([]);   
    let [mensajeModal, setMensajeModal] = useState([]);    
    const [row, setRow] = useState<FormData>();  
    const [showDetail, setShowDetail] = useState(false);    
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion] = useState(false);    
    const [cpRecords, setCpRecords] = useState([]);              

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [

        {
            name: 'Código',
            selector: (row: FormData) => row.idCodigo,      
            sortable: true,
            cell: (row: FormData) => <div className="w-100 text-end">{row.idCodigo.toLocaleString()}</div>,    
            width: "110px",                  
        }, 
        {
            name: 'Nombre ',
            selector: (row: FormData) => row.nombre,
            width: "200px",
            wrap: true,
            sortable: true,
        },   
        {
            name: 'Descripción ',
            selector: (row: FormData) => row.descripcion,
            width: "350px",
            sortable: true,
            cell: (row: FormData) => <div className="w-100 ">{row.descripcion}</div>,                
        },               
        {
            name: 'Cantidad',
            selector: (row: FormData) => row.cantidad,
            width: "110px",
            sortable: true,  
            cell: (row: FormData) => <div className="w-100 text-end">{row.cantidad.toLocaleString()}</div>,                  
        },         
        {
            name: 'Valor ($)',
            selector: (row: FormData) => row.valorUnitario,
            width: "110px",
            sortable: true,  
            cell: (row: FormData) => <div className="w-100 text-end">{row.valorUnitario.toLocaleString()}</div>,                                     
        }, 
        {
            name: 'Imp.(%)',
            selector: (row: FormData) => row.impuesto,
            width: "100px",
            sortable: true,  
            cell: (row: FormData) => <div className="w-100 text-end">{row.impuesto.toLocaleString()}</div>,                                    
        },         
        {
            name: 'Dcto (%)',
            selector: (row: FormData) => row.descuento,
            width: "110px",
            sortable: true,  
            cell: (row: FormData) => <div className="w-100 text-end">{row.descuento.toLocaleString()}</div>,                               
        },          
                               
        {
            name: 'Acciones',
            selector: (row: FormData) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#' className={`text-success`} title="Ver detalle" onClick={()=>view(row)} >
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
                return    data.idCodigo && data.idCodigo.toString().includes(evnt.target.value)
                       || data.nombre && data.nombre.toUpperCase().includes(evnt.target.value.toUpperCase())  
                       || data.descripcion && data.descripcion.toUpperCase().includes(evnt.target.value.toUpperCase()); 
            }); 
            data = [...reg] ;
            setData([...data]);              
        }
    }

    const handleClose = () => setShowDetail(false);
    
    const exportTo = () => {

        exportToExcel(`InventarioXPos-${getFechaYhora()}.xls`, data);

    }

    const listar = async () =>{

        setLoaders(true);

        const response: responseApi = await httpApiGet(`InventarioProductosTerminados`);

        if (response.statusCode >= 400){
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);     
            setShowInfo(true);
        }else{          
            const dta: any = [];
            response.data.map((prd: any) => {
                const obj = {...prd};                
                dta.push(obj);
            });

            data = [...dta];
            setData(data);  
            setCpRecords([...data]);  
        }

        setLoaders(false);        
    };

    useEffect(()=>{

        listar();

    }, []);

    return(
        <div className="container" >
            <BarraMenu />      
            <div className="">
                <div className='container border rounded' style={{"color": "#2A3482"}}>
                    <div className="border p-1 rounded" style={{color: "#2A3482"}} >
                        <a id="inicio"></a>
                        <div className="h3 p-2 m-2 text-center">Inventario de productos terminados</div>
                        <div className="ms-2 mt-3 p-2 border rounded">    
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12 mb-1">
                                    <label htmlFor="filtro" className="">Filtrar <label style={{fontSize: "10px", fontStyle: "italic"}}>(por Código, nombre, descripción)</label></label>           
                                    <input type="text" className="form-control" id="filtro"  placeholder="" onChange={changeTextFiltro}/>
                                </div>   
                                <div className="col-lg-4 col-md-12 col-sm-12 mb-1 text-end">
                                    <Button className="m-1 p-2 btn-secondary" onClick={exportTo} >Exportar a excel</Button>                                             
                                </div>                                                  
                            </div> 
                            <div className="row ">
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-1">
                                    <label htmlFor="filtro" className=""></label>           
                                </div>                                   
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-1 text-end">
                                    <Button className="m-1 p-2 btn-success" onClick={listar} ><FaSync className="mx-2"/>  Actualizar</Button>                                             
                                </div>                                                  
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
                            />
                        </div>
                    </div>                 
                </div>            
            </div>
            <FooterBar/>     
            {showDetail && <ViewProductModal Data={row} Show={showDetail} onClose={handleClose}/>}                
            { showInfo && <MsgDialog
                Title='Inventario de matererias primas'
                Message={mensajeModal}
                Icon={operacion}
                BtnOkName='Aceptar'
                BtnNokName=''
                Show={showInfo}
                HandlerdClickOk={()=> setShowInfo(false)}
                HandlerdClickNok={null}
                size="md"
            />} 
            <LoaderSpinner Show={loaders} color={"red"} text={"Cargando, espere..."}/>           
        </div>
    )
};

export default InventarioProductosTerminados;