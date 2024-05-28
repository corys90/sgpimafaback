import Modal from 'react-bootstrap/Modal';
import FormData from "../../pages/PosInventarioProductos/Dto/FormData";

const ViewProductModal = (props: {Data: any, Show: boolean, onClose: any}) => {
    console.log("view: ", props.Data);
 return (
      <div>
        <Modal show={props.Show} centered={true} animation={true} size='xl' onHide={props.onClose}>
            <Modal.Header className='bg-success' closeButton >
                <Modal.Title className='h3 text-center text-light'>
                    <h5>Detalle del producto</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <fieldset className='row border p-2 m-2 ' disabled>
                    <label htmlFor="" className="m-2 h5">Datos básicos (obligatorios)</label>
                    <hr className="pb-2" />

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Pos</label>                
                        <input value={`${props.Data.nmPos}`} className="form-control" id={`idPos`}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idCaja" className="form-label">* Código producto</label>                               
                        <input className="form-control text-end" id="idCodigo"  placeholder="" value={props.Data.idCodigo} />                   
                    </div>    

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Tipo producto</label>                
                        <input value={props.Data.nmTp} className="form-control" id={`tipoProducto`}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Producto compuesto</label>                
                        <input value={props.Data.nmPrdCmp} className="form-control" id={`idProductoCompuesto`}/>               
                    </div>  

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Nombre producto</label>                  
                        <input  className="form-control" id="nombre"  placeholder="" value={props.Data.nombre}/>
                    </div>   

                    <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Descripción</label>                  
                        <input  className="form-control" id="descripcion"  placeholder="" value={props.Data.descripcion} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Cantidad</label>                  
                        <input  className="form-control text-end" id="cantidad"  placeholder="" value={props.Data.cantidad.toLocaleString()} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Valor unitario ($)</label>                  
                        <input  className="form-control text-end" id="valorUnitario"  placeholder="" value={props.Data.valorUnitario.toLocaleString()} />
                    </div>                                  

                    <label htmlFor="" className="m-2 h5">Información adicional</label>
                    <hr />

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="estado" className="form-label">Unidad de medida</label>                
                        <input  className="form-control text-end" id="unidadMedida"  placeholder="" value={props.Data.nmUM} />            
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Lote</label>                  
                        <input  className="form-control text-end" id="lote"  placeholder="" value={props.Data.lote}/>
                    </div>  

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Color</label>                  
                        <input  className="form-control" id="color"  placeholder="" value={props.Data.color} />
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Olor</label>                  
                        <input  className="form-control" id="olor"  placeholder="" value={props.Data.olor} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Textura</label>                  
                        <input type="text" className="form-control" id="textura"  placeholder="" value={props.Data.textura} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Tamaño (cms)</label>                  
                        <input  className="form-control text-end" id="tamano"  placeholder="" value={props.Data.tamano.toLocaleString()} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Peso (Grms)</label>                  
                        <input  className="form-control text-end" id="peso"  placeholder="" value={props.Data.peso.toLocaleString()} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="estado" className="form-label">Embalaje</label>                
                        <input  className="form-control text-end" id="embalaje"  placeholder="" value={props.Data.nmEmb} />                                      
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Temperatura (°C)</label>                  
                        <input className="form-control text-end" id="temperatura"  placeholder="" value={props.Data.temperatura.toLocaleString()}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Stock Mínimo</label>                  
                        <input className="form-control text-end" id="stockMinimo"  placeholder="" value={props.Data.stockMinimo}/>
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Descuento (%)</label>                  
                        <input className="form-control text-end" id="descuento"  placeholder="" value={props.Data.descuento.toLocaleString()}/>
                    </div>  

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Impuestos (%)</label>                  
                        <input className="form-control text-end" id="impuesto"  placeholder="" value={props.Data.impuesto.toLocaleString()} />

                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Valor Impuesto ($)</label>                  
                        <input className="form-control text-end" id="valorImp"  placeholder="" value={props.Data.valorImp.toLocaleString()} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Fecha de creación</label>                  
                        <input  type="date"  className="form-control text-end" id="fechaCreacion"  placeholder="" value={props.Data.fechaCreacion.substring(0, 10)} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Días de vencimiento</label>                                                                                                                                                                    
                        <input  className="form-control text-end" id="diasVencimiento"  placeholder="" value={props.Data.diasVencimiento.toLocaleString()} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Fecha de Vencimiento</label>                  
                        <input type="date" className="form-control text-end" id="fechaVencimiento"  placeholder="" value={props.Data.fechaVencimiento.substring(0, 10)} />
                    </div>                  
                </fieldset> 
            </Modal.Body>                
            <Modal.Footer className=' d-flex justify-content-between h3'>                       
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default ViewProductModal;