import { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaRegEye, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import Alert from "../../component/Alert";
import FormData from "./Dto/FormData";
import VerFactura from "../../component/VerFactura";
import { getFechaYhora, httpApiGet } from "../../lib";
import BarraMenu from "../../component/BarraMenu";
import FooterBar from "../../component/FooterBar";
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

const dataFiltro = [
    {id:1, forma:"Todos los recibos de ventas"}, 
    {id:2, forma:"Nro. recibo de venta"}, 
    {id:3, forma:"Identificación del cliente por rango de fechas"}, 
    {id:4, forma:"Solo los del rango de fechas"}
];

const PosFacturasList = () => {
    
    let [frmData, setFormData] = useState([]);          
    const [pending, setPending] = useState(false); 
    const [showMsg, setShowMsg] = useState(false);     
    let [verFactura, setVerFactura] = useState(false); 
    let [idFactura, setIdFactura] = useState(0);            
    let [mensajeModal, setMensajeModal] = useState([]);              
    let [filtro, setFiltro] = useState({tipoFiltro: "0", Valfiltro: "", fechaI: "", fechaF: ""});                                    

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

    const listar = async () =>{

        let response;
        let uri;

        // limpia la grilla
        frmData = [];
        setFormData(frmData);

        console.log("Filtro: ", filtro);

        if (filtro.tipoFiltro === '1'){
            uri = `PosFacturacion`;
        }else{
            if (filtro.tipoFiltro  === '2'){
                if (filtro.Valfiltro === ""){
                    setShowMsg(true);
                    return;
                }
                const nf = parseInt(`${filtro.Valfiltro}`);
                uri = `PosFacturacion/${nf}`;
            }else{
                if (filtro.tipoFiltro  === '3'){
                    if (filtro.Valfiltro === ""){
                        setShowMsg(true);
                        return;
                    }
                    uri = `PosFacturacion/GetByClienteId/${filtro.Valfiltro}`;
                }else{
                    if(filtro.tipoFiltro  === '4'){
                        if ((filtro.fechaI === "") || (filtro.fechaI === "")){
                            setShowMsg(true);
                            return;
                        }
                        uri = `PosFacturacion/${filtro.fechaI}/${filtro.fechaI}`;                        
                    }else{
                        return;
                    }
                }
            }
        }

        response = await httpApiGet(uri);        
        if (response.statusCode >= 400){
            mensajeModal = [...response.messages];
            setMensajeModal(mensajeModal);            

        }else{
            console.log(response.data);
            frmData = [...response.data];        
            setFormData(frmData);                   
        }
    }
    
    const handler = (e: any) => {

        const value = e.target.value;
        const id = e.target.id;
        filtro  = {...filtro, [id]: value};
        setFiltro({...filtro});
        if (id === "Valfiltro"){
            setShowMsg(false);        
        }
    }

    const handlerPersonalizedSelect = (e: any) => {

        const id: string = e.id;
        const value: string = e.value;

        filtro = {...filtro, [id]: value };
        if ((value === "3") || (value === "4")){
            filtro.fechaI =  filtro.fechaF = getFechaYhora().substring(0, 10);
            console.log(filtro);
        }else{
            filtro.fechaI =  filtro.fechaF = "";
        }
        setFiltro({...filtro});
    }

    const Ver = (idf: number)=>{

        idFactura = idf;
        setIdFactura(idFactura);
        verFactura = true,
        setVerFactura(verFactura);

    }
    
    useEffect(()=>{
    }, []) 

    return(
        <>
            <div className='container'>
                <BarraMenu /> 
                <div>
                    <div  className="container border rounded " style={{"color": "#2A3482"}}>
                        <div className="">
                            <div className="col-lg-12 col-md-12  col-sm-12 ">
                                <div className=" border p-1 rounded w-100" style={{"color": "#2A3482"}}>
                                    <a id="inicio"></a>

                                    <label htmlFor="" className="h3 p-2 m-2">Listado de ventas generadas</label>
                                    <fieldset className='row border rounded p-2 m-2'>

                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3 " style={{backgroundColor: "#F4F6F6"}}>
                                            <div className="  row d-flex border rounded">

                                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                                    <label htmlFor="idPos" className="form-label">Filtrar por </label>                
                                                    <GenericSelectPersonalized 
                                                        Data={dataFiltro} 
                                                        ValueField="id"
                                                        ValueText="forma"
                                                        Value={`${filtro.tipoFiltro}`} 
                                                        onSelect={handlerPersonalizedSelect} 
                                                        ClassName="form-select" 
                                                        id={`tipoFiltro`}
                                                        PersonalizedText="Seleccione opción"
                                                    />         
                                                </div> 

                                                <div className="col-lg-2 col-md-12 col-sm-12">
                                                    <label htmlFor="idCliente" className="form-label">Valor filtro</label> 
                                                    <div className="w-100 d-flex gap-2 ">
                                                        <div className="w-100">
                                                            <input type="number" min={0} className="form-control text-end" id="Valfiltro"  placeholder="" 
                                                                    value={filtro.Valfiltro} disabled={(filtro.tipoFiltro === "0") || (filtro.tipoFiltro === "1") || (filtro.tipoFiltro === "4")} 
                                                                    onChange={handler}
                                                            />                    
                                                        </div>                                              
                                                    </div> 
                                                    <Alert show={showMsg} alert="#F3D8DA" msg={["Digite dato del filtro"]} />                  
                                                </div>   

                                                <div className="col-lg-2 col-md-12 col-sm-12">
                                                    <label htmlFor="fechaIni" className="form-label">Fecha inicial</label> 
                                                    <div className="w-100 d-flex gap-2 ">
                                                        <div className="w-100">
                                                            <input type="date" className="form-control" id="fechaI"  placeholder="" 
                                                                    value={filtro.fechaI} disabled={(filtro.tipoFiltro === "0") || (filtro.tipoFiltro === "1") || (filtro.tipoFiltro === "2")} 
                                                                    onChange={handler}
                                                            />                    
                                                        </div>                                             
                                                    </div>              
                                                </div>  

                                                <div className="col-lg-2 col-md-12 col-sm-12">
                                                    <label htmlFor="fechaFin" className="form-label">Fecha final</label> 
                                                    <div className="w-100 d-flex gap-2 ">
                                                        <div className="w-100">
                                                            <input type="date" className="form-control" id="fechaF"  placeholder="" 
                                                                    value={filtro.fechaF} disabled={(filtro.tipoFiltro === "0") || (filtro.tipoFiltro === "1") || (filtro.tipoFiltro === "2")} 
                                                                    onChange={handler}
                                                            />                    
                                                        </div>                                          
                                                    </div>             
                                                </div>  

                                                <div className="col-lg-2 col-md-12 col-sm-12 mt-2">
                                                    <div className="d-flex justify-content-center align-items-center h-100">
                                                        <div className="w-100">
                                                            <Button className=" btn-success w-100" disabled={(filtro.tipoFiltro === "0")} onClick={() => listar()} ><FaSearch /> Filtrar</Button>  
                                                        </div>
                                                    </div>
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
                </div>

                <FooterBar/>                        
            </div>
        </>



    )
};

export default PosFacturasList;