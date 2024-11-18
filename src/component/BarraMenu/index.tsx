
import { FaBarcode, FaBity, FaBorderStyle, FaBox, FaBoxOpen, FaBuffer, FaBuilding, FaCaretSquareLeft, FaCashRegister, FaChartLine, FaCheckDouble,  FaCity,  FaClipboardCheck,  FaClipboardList,  FaCodiepie,  FaCog,  FaDev,  FaDolly,  FaDonate,  FaDropbox,  FaFileAlt,  FaFileInvoiceDollar, FaFileSignature, FaHouseUser, FaMoneyBillAlt, FaMoneyCheckAlt, FaPortrait, FaPowerOff, FaTools, FaUnsplash, FaUserNinja, FaUserTie, FaUsers, FaVoteYea, FaWpforms} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import logoEmp from '../../assets/logoPpal2.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaHourglassStart } from "react-icons/fa6";
import * as State from  "../../redux/store/InicialState";
import LinkToolTip from "../ToolTip";
import { SetEntornoEmp } from "../../redux/store/Actions";


const BarraMenu = () => {

    const navigate = useNavigate();
    const emp:State.data  = useSelector((state: any) => state.emp);    
    const dispatch = useDispatch();

/*     const fijoHeader = {
        color: "#2A3482",
        backgroundColor: "#F4F4F4",
        position: "fixed",
        zIndex: 1000,

    } */

    useEffect(()=>{
        
        const init = async () =>{
            const ss = await sessionStorage.getItem("entorno");
            if (ss){
                const sesionData = JSON.parse(ss);
                console.log(sesionData);
                dispatch(SetEntornoEmp({...sesionData}));
            } else{
                navigate('/');  
            }                   
        }

        init();
    },[]);

    return (
        <nav className="navbar navbar-expand-lg d-flex flex-column text-center fw-bold" style={{color: "#2A3482", backgroundColor: "#F4F4F4"}}  >
            <div className="h3 p-2 border text-wrap w-100"  style={{color: "#2A3482", backgroundColor: "#E3E2E4"}} >
                Sistema de Información y Gestión de Inventarios y Puntos de Ventas
            </div>
            <div className="d-flex flex-wrap w-100 " >

                {/* Imagén marca fluida */}
                <div className=" m-2 " style={{width: "5%"}} >
                    <img src={logoEmp} alt="" className="img-fluid" />
                </div>

                {/* Ícono de hamburguesa en modo responsive*/}
                <div>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>                    
                </div>
                <div className="collapse navbar-collapse "   style={{"color": "#2A3482"}} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                        {/* Home*/} 
                        <li className="nav-item dropdown me-3 " >
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}  id="navbarDropdownDashboard" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                <FaClipboardCheck /> Inventario
                            </Link>  
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                <li><LinkToolTip id="inv-1" url="/inventario" title="Registro de productos de inventario"  text="Registra y actualiza productos del ineventario" icon={<FaBarcode /> }/></li>  
                                <li><LinkToolTip id="inv-3" url="/posmovimientoinventario" title="Ingresos a inventarios de los P.O.S."  text="Registra los movimientos de ingreso a los inventarios de los P.O.S." icon={<FaBoxOpen /> }/></li>                                                                      
                                <li><LinkToolTip id="inv-2" url="/posinventario" title="Listado de productos por P.O.S."  text="Lista los productos del inventario por P.O.S." icon={<FaBox /> }/></li>
                                <li><LinkToolTip id="inv-4" url="/posmovimientoinventarioout" title="Egresos de inventarios de los P.O.S."  text="Registra las salidas de productos del inventario de los P.O.S." icon={ <FaDropbox /> }/></li>
                                <li><hr className="dropdown-divider"/></li> 
                                <li><LinkToolTip id="inv-5" url="/devolucionposplanta" title="Devolución a planta"  text="Registra las devoluciones de productos a Planta" icon={<FaCaretSquareLeft />}/></li>                                     
                                <li><hr className="dropdown-divider"/></li> 
                                <li><LinkToolTip id="inv-6" url="/tipoproductopage" title="Registro del tipo de producto"  text="Registra las tipos de productos del inventario" icon={<FaBity /> }/></li>                                       
                                <li><LinkToolTip id="inv-7" url="/tipoembalajepage" title="Registro de embalajes"  text="Registra los tipos de embalajes de los productos" icon={<FaCodiepie />}/></li>                                           
                                <li><LinkToolTip id="inv-8" url="/unidadespage" title="Registro de unidades de medida"  text="Registra los tipos de unidades de medidas para los productos" icon={<FaBuffer />}/></li>    
                                <li><LinkToolTip id="inv-9" url="/composicionpage" title="Registro de tipos de composición de productos"  text="Registra los tipos de composición de los productos" icon={<FaBorderStyle />}/></li>                                                                                                                                               
                            </ul>                             
                        </li>

                        {/* Menú servicios*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownReferencia" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                <FaCheckDouble />Ventas
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                         
                                <li><LinkToolTip id="inv-9" url="/posfacturacion" title="Registro de ventas de productos"  text="Registra las ventas de productos" icon={<FaFileInvoiceDollar />}/></li>  
                                <li><LinkToolTip id="inv-9" url="/posfacturacion" title="Lista las ventas de productos"  text="Lista los productos vendidos" icon={<FaFileAlt />}/></li>        
                                <li><LinkToolTip id="inv-9" url="/posfacturacion" title="Devoluciones de productos"  text="Registra las de devoluciones de productos vendidos" icon={<FaDev />}/></li>  
                                <li><hr className="dropdown-divider"/></li> 
                                <li><LinkToolTip id="inv-9" url="/pospagofacturacionpage" title="Pagos posteriores de facturas de venta"  text="Registra los pagos de facturas de ventas realizadas a clientes" icon={<FaMoneyBillAlt />}/></li>                                                      
                            </ul>    
                        </li>

                        {/* Menú contacto*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownInventario" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                    <FaChartLine /> Gestión
                            </Link>  
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/posfacturacionlist" ><FaClipboardList /> De facturación</Link></li>            
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/pospagofacturacionpage" ><FaMoneyCheckAlt /> De pagos</Link></li>  
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/arqueocajapage" ><FaDonate /> De arqueos</Link></li>                                 
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/clientepage" ><FaPortrait /> De clientes</Link></li>     
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/vendedorpage" ><FaUserNinja /> De vendedor</Link></li> 
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/poscajaestadopage" ><FaUnsplash /> De novedades de caja</Link></li>                                                                                                                                                 
                            </ul>                                
                        </li>

                        {/* Menú nosotros*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownConsultas" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                    <FaCog /> Seguridad
                            </Link> 
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/landingpage" ><FaUsers /> De Usuarios</Link></li>                                                          
                            </ul>                                
                        </li>

                        {/* Menú nosotros*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownConsultas" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                    <FaCog /> Configuración
                            </Link> 
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/sedepospage" ><FaBuilding /> De sedes POS </Link></li>          
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/poscajapage" ><FaCashRegister /> De cajas de POS</Link></li>                                                                                     
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoestadoposcajapage" ><FaHourglassStart /> De estados del POS</Link></li>  
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoestadocajapage" ><FaWpforms /> De estados de caja</Link></li> 
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoestadopagospage" ><FaVoteYea /> De estados de pagos</Link></li> 
                                <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoclientepage" ><FaUserTie /> De tipos de clientes</Link></li>                                
                            </ul>                                
                        </li>

                                                    {/* Menú servicios*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownReferencia" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                            <FaCity />Producción
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">
                                <li><LinkToolTip id="inv-9" url="/movimientoinventarioproduccion" title="Ingreso de materias primas"  text="Registra la materia prima a inventario de producción" icon={<FaDolly />}/></li>                                 
                                <li><LinkToolTip id="inv-9" url="/inventarioproduccion" title="Inventario de materias primas"  text="Lista el inventario de producción" icon={<FaClipboardCheck />}/></li> 
                                <li><hr className="dropdown-divider"/></li>  
                                <li><LinkToolTip id="inv-9" url="/movimientoinventarioproductosterminados" title="Ingreso de productos terminados"  text="Registra los productos terminados al inventario de producción" icon={<FaBox />}/></li> 
                                <li><LinkToolTip id="inv-9" url="/inventarioproductosterminados" title=" Inventario de productos terminados"  text="Registra los productos terminados al inventario de producción" icon={<FaFileSignature /> }/></li>                
                            </ul>    
                        </li>
                        
                    </ul>
                </div>

                <div className="d-flex gap-2  me-3 ">
                    <div className="d-flex align-items-center fw-bold ">
                        <label >Hola, {`${emp.user}`}</label>
                    </div>
                    <div className="h3 d-flex align-items-center justify-content-center">
                        <a href="/">
                            <FaPowerOff />
                        </a>
                    </div>            
                </div> 

            </div>
        </nav> 
    );
};

export default BarraMenu;