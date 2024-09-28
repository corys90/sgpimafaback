
import { FaBarcode, FaBity, FaBorderStyle, FaBox, FaBoxOpen, FaBuffer, FaBuilding, FaCashRegister, FaChartLine, FaCheckDouble,  FaClipboardCheck,  FaClipboardList,  FaCodiepie,  FaCog,  FaDonate,  FaFileInvoiceDollar, FaHouseUser, FaMoneyBillAlt, FaMoneyCheckAlt, FaPortrait, FaPowerOff, FaTools, FaUnsplash, FaUserNinja, FaUserTie, FaUsers, FaVoteYea, FaWpforms} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import logoEmp from '../../assets/logoPpal2.png';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaHourglassStart } from "react-icons/fa6";


const BarraMenu = () => {

    const navigate = useNavigate();
    const emp: any = useSelector((state: any) => state.emp);    

    useEffect(()=>{

        if (emp.first_name === ""){
            navigate('/');
        }

    },[]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg d-flex flex-column text-center fw-bold " style={{color: "#2A3482", backgroundColor: "#F4F4F4"}} >
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
                                    <li><Link className={`dropdown-item `} to="/inventario"   style={{"color": "#2A3482"}}   > <FaBarcode /> De productos</Link></li>   
                                    <li><Link className={`dropdown-item `} to="/posinventario"   style={{"color": "#2A3482"}}   > <FaBox /> De productos x POS</Link></li>  
                                    <li><Link className={`dropdown-item `} to="/posmovimientoinventario"   style={{"color": "#2A3482"}}   > <FaBoxOpen /> Ingreso inventario</Link></li>                                  
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoproductopage" ><FaBity /> De tipo producto</Link></li>  
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/tipoembalajepage" ><FaCodiepie /> De embalajes</Link></li>     
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/unidadespage" ><FaBuffer /> De unidades</Link></li> 
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/composicionpage" ><FaBorderStyle /> De composición</Link></li>                                                                                                                                                    
                                </ul>                             
                            </li>

                            {/* Menú servicios*/} 
                            <li className="nav-item dropdown  me-3 ">
                                <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}   style={{"color": "#2A3482"}}    id="navbarDropdownReferencia" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                    <FaCheckDouble />Ventas
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/posfacturacion" ><FaFileInvoiceDollar /> Facturación</Link></li>
                                    <li><Link className={`dropdown-item `}   style={{"color": "#2A3482"}}   to="/pospagofacturacionpage" ><FaMoneyBillAlt /> Pagos posteriores</Link></li>                    
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
        </div>
    
    );
};

export default BarraMenu;