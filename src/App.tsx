import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLogin from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import SedePosPage from "./pages/SedePosPage";
import TipoEstadoPosCajaPage from "./pages/TipoEstadoPosCajaPage";
import TipoEstadoCajaPage from "./pages/TipoEstadoCajaPage";
import TipoPagosAFavorPage from "./pages/TipoPagosAFavor";
import TipoProducto from "./pages/TipoProducto";
import TiposDeEmbalajes from "./pages/TiposDeEmbalajes";
import TiposUnidadesMedidas from "./pages/TiposUnidadesMedidas";
import ProductoCompuesto from "./pages/ProductoCompuesto";
import VendedorPage from "./pages/Vendedor";
import ClientePage from "./pages/Cliente";
import TipoClientePage from "./pages/TipoIdClientePage";
import PosCajaPage from "./pages/PosCaja";
import PosCajaArqueoPage from "./pages/PosCajaArqueo";
import PosCajaEstadoPage from "./pages/PosCajaEstado";
import PosInventarioProductos from "./pages/PosInventarioProductos";
import PosFacturas from "./pages/PosFacturas";
import PosCajaPagoFacturaPage from "./pages/PosCajaPagoFacturaPage";
import PosFacturasList from "./pages/PosFacturasList";
import InventarioProductos from "./pages/InventarioProductos";

function App() {

  return (
    <>
      <BrowserRouter>      
        <Routes>
          <Route path="/posfacturacionlist" element={<PosFacturasList />}/>             
          <Route path="/pospagofacturacionpage" element={<PosCajaPagoFacturaPage />}/>              
          <Route path="/posfacturacion" element={<PosFacturas />}/>            
          <Route path="/inventario" element={<InventarioProductos />}/>       
          <Route path="/posinventario" element={<PosInventarioProductos />}/>              
          <Route path="/poscajaestadopage" element={<PosCajaEstadoPage />}/>                  
          <Route path="/arqueocajapage" element={<PosCajaArqueoPage />}/>                
          <Route path="/poscajapage" element={<PosCajaPage />}/>            
          <Route path="/clientepage" element={<ClientePage />}/>            
          <Route path="/vendedorpage" element={<VendedorPage />}/>            
          <Route path="/composicionpage" element={<ProductoCompuesto />}/>              
          <Route path="/unidadespage" element={<TiposUnidadesMedidas />}/> 
          <Route path="/tipoclientepage" element={<TipoClientePage />}/>                           
          <Route path="/tipoembalajepage" element={<TiposDeEmbalajes />}/>             
          <Route path="/tipoproductopage" element={<TipoProducto />}/>             
          <Route path="/tipoestadopagospage" element={<TipoPagosAFavorPage />}/>                
          <Route path="/tipoestadocajapage" element={<TipoEstadoCajaPage />}/>                
          <Route path="/tipoestadoposcajapage" element={<TipoEstadoPosCajaPage />}/>          
          <Route path="/sedepospage" element={<SedePosPage />}/>
          <Route path="/landingpage" element={<LandingPage />}/>
          <Route path="/" element={<PageLogin />}/>
        </Routes>              
      </BrowserRouter>
    </>
  )
}

export default App;
