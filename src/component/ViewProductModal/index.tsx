import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ViewProductModal = (props: {Data: any, Show: boolean, onClose: any}) => {

 return (
      <div>
        <Modal show={props.Show} centered={true} animation={true} size='xl' onHide={props.onClose}>
            <Modal.Header className='bg-success ' >
                <Modal.Title className='h3 text-center text-light w-100'>
                    <div className='d-flex '>
                        <div className='w-75 d-flex  align-items-center'><h5>Detalle del producto</h5></div>
                        <div className='w-25 d-flex justify-content-end border-0 '><input type='button' onClick={props.onClose} value={"X"} className='text-white bg-success border-0'/></div>                        
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <fieldset className='row border p-2 m-2 ' disabled>
                    <label htmlFor="" className="m-2 h5">Datos básicos (obligatorios)</label>
                    <hr className="pb-2" />

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Pos</label>                
                        <input value={`${props.Data.nmPos}`} className="form-control" id={`idPos`} onChange={()=>null}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idCaja" className="form-label">* Código producto</label>                               
                        <input className="form-control text-end" id="idCodigo"  placeholder="" value={props.Data.idCodigo} onChange={()=>null} />                   
                    </div>    

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Tipo producto</label>                
                        <input value={props.Data.nmTp} className="form-control" id={`tipoProducto`} onChange={()=>null}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="idPos" className="form-label">* Producto compuesto</label>                
                        <input value={props.Data.nmPrdCmp} className="form-control" id={`idProductoCompuesto`} onChange={()=>null}/>               
                    </div>  

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Nombre producto</label>                  
                        <input  className="form-control" id="nombre"  placeholder="" value={props.Data.nombre} onChange={()=>null}/>
                    </div>   

                    <div className="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Descripción</label>                  
                        <input  className="form-control" id="descripcion"  placeholder="" value={props.Data.descripcion}  onChange={()=>null}/>
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Cantidad</label>                  
                        <input  className="form-control text-end" id="cantidad"  placeholder="" value={props.Data.cantidad.toLocaleString()} onChange={()=>null} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">* Valor unitario ($)</label>                  
                        <input  className="form-control text-end" id="valorUnitario"  placeholder="" value={props.Data.valorUnitario.toLocaleString()} onChange={()=>null} />
                    </div>                                  

                    <label htmlFor="" className="m-2 h5">Información adicional</label>
                    <hr />

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="estado" className="form-label">Unidad de medida</label>                
                        <input  className="form-control text-end" id="unidadMedida"  placeholder="" value={props.Data.nmUM} onChange={()=>null} />            
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Lote</label>                  
                        <input  className="form-control text-end" id="lote"  placeholder="" value={props.Data.lote} onChange={()=>null}/>
                    </div>  

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Color</label>                  
                        <input  className="form-control" id="color"  placeholder="" value={props.Data.color} onChange={()=>null} />
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Olor</label>                  
                        <input  className="form-control" id="olor"  placeholder="" value={props.Data.olor} onChange={()=>null} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Textura</label>                  
                        <input type="text" className="form-control" id="textura"  placeholder="" value={props.Data.textura}  onChange={()=>null} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Tamaño (cms)</label>                  
                        <input  className="form-control text-end" id="tamano"  placeholder="" value={props.Data.tamano?.toLocaleString()} onChange={()=>null} />
                    </div>   

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Peso (Grms)</label>                  
                        <input  className="form-control text-end" id="peso"  placeholder="" value={props.Data.peso?.toLocaleString()} onChange={()=>null} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="estado" className="form-label">Embalaje</label>                
                        <input  className="form-control text-end" id="embalaje"  placeholder="" value={props.Data.nmEmb} onChange={()=>null} />                                      
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Temperatura (°C)</label>                  
                        <input className="form-control text-end" id="temperatura"  placeholder="" value={props.Data.temperatura?.toLocaleString()} onChange={()=>null}/>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Stock Mínimo</label>                  
                        <input className="form-control text-end" id="stockMinimo"  placeholder="" value={props.Data.stockMinimo?.toLocaleString()} onChange={()=>null}/>
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Descuento (%)</label>                  
                        <input className="form-control text-end" id="descuento"  placeholder="" value={props.Data.descuento?.toLocaleString()} onChange={()=>null}/>
                    </div>  

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Impuestos (%)</label>                  
                        <input className="form-control text-end" id="impuesto"  placeholder="" value={props.Data.impuesto?.toLocaleString()} onChange={()=>null} />

                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Valor Impuesto ($)</label>                  
                        <input className="form-control text-end" id="valorImp"  placeholder="" value={props.Data.valorImp?.toLocaleString()} onChange={()=>null} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Fecha de creación</label>                  
                        <input  type="date"  className="form-control text-end" id="fechaCreacion"  placeholder="" value={props.Data.fechaCreacion.substring(0, 10)} onChange={()=>null} />
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Días de vencimiento</label>                                                                                                                                                                    
                        <input  className="form-control text-end" id="diasVencimiento"  placeholder="" value={props.Data.diasVencimiento?.toLocaleString()}  onChange={()=>null}/>
                    </div> 

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor="nombre" className="form-label">Fecha de Vencimiento</label>                  
                        <input type="date" className="form-control text-end" id="fechaVencimiento"  placeholder="" value={props.Data.fechaVencimiento.substring(0, 10)} onChange={()=>null} />
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