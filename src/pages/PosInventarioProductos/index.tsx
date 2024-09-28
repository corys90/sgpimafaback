import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import FormData from "../PosInventarioProductos/Dto/FormData";
import { exportToExcel, getFechaYhora, httpApiGet} from "../../lib";
import BarraMenu from "../../component/BarraMenu";
import ViewProductModal from "../../component/ViewProductModal";
import MsgDialog from "../../component/MsgDialog";
import FooterBar from "../../component/FooterBar";
import { Button } from "react-bootstrap";
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
    const [row, setRow] = useState({});  
    const [showDetail, setShowDetail] = useState(false);    
    const [showInfo, setShowInfo] = useState(false);    
    const [operacion, setOperacion] = useState(false);                 

    // sección relacionada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Pos.',
            selector: (row: FormData) => row.idPos,
            width: "90px",
            sortable: true,
            right: true
        },  
        {
            name: 'Producto',
            selector: (row: FormData) => row.idCodigo,
            width: "110px",        
            sortable: true,
            right: true.toString(),                   
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
            width: "300px",
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
            selector: (row: FormData) => row.idProductoCompuesto,
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
                return    data.idCodigo && data.idCodigo.toString().includes(evnt.target.value)
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
    
    const listar = async (pos: number, numPOS: number) =>{

        let response = 0;

        if (pos === numPOS){
            response = await httpApiGet(`Posinventarioproducto`);
        }else{
            response = await httpApiGet(`Posinventarioproducto/getProductosByPos/${pos}`);            
        }

        if (response.statusCode >= 400){
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            
        }else{          
            const dta: any = [];
            response.data.map((prd: any) => {
                const obj = {...prd};                
                dta.push(obj);
            });

            data = [...dta];
            setData(data);    
        }
    };

    const handler = (e: any, MaxLeng: number) => {
        idPos = parseInt(e.value);
        setIdPos(idPos);
        if (idPos === 0){
            data = [];
            setData([...data]);
        }else{
            listar(idPos, MaxLeng);           
        }
    }

    const exportTo = () => {

        exportToExcel(`InventarioXPos-${getFechaYhora()}.xls`, data);

    }     

    useEffect(()=>{     

    }, []); 

    return(
        <div className="container" >
            <BarraMenu />      
            <div className="">
                <div className='container border rounded' style={{"color": "#2A3482"}}>
                    <div className="border p-1 rounded" style={{color: "#2A3482"}} >
                        <a id="inicio"></a>
                        <div className="h3 p-2 m-2 text-center">Inventario de productos x POS</div>
                        <div className="ms-2 mt-3 p-2 border rounded">    
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="pos" className="">Mostrar</label> 
                                <GenericSelectPersonalized 
                                        Url="SedePos" 
                                        ValueField="id"
                                        ValueText="nombre"
                                        Value={`${idPos}`} 
                                        onSelect={handler} 
                                        ClassName="form-select" 
                                        id={`idPos`}
                                        all="Todos los P.O.S."
                                    />           
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="filtro" className="">Filtrar <label style={{fontSize: "10px", fontStyle: "italic"}}>(por POS, código, nombre, descripción)</label></label>           
                                <input type="text" className="form-control" id="filtro"  placeholder="" onChange={changeTextFiltro}/>
                            </div>                        
                        </div> 
                        <div className="col-lg-12 col-md-12 col-sm-12  mb-1 ">
                            <div className="mt-3 offset-lg-10 offset-md-10 w-100">
                                <Button className="m-1 p-2 btn-secondary " onClick={exportTo} >Exportar a excel</Button>                                             
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
                            progressPending={pending}
                            progressComponent={loader()}             
                        />

                        </div>
                    </div>                 
                </div>            
            </div>
            <FooterBar/>     
            {showDetail && <ViewProductModal Data={row} Show={showDetail} onClose={handleClose}/>}                
            { showInfo && <MsgDialog
                Title='Inventario por POS'
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
    )
};

export default PosInventarioProductos;