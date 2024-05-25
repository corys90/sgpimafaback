import Modal from 'react-bootstrap/Modal';
import ViewFacturaComponent from '../../pages/PosFacturasList/ViewFacturaComponent';
import { Button } from 'react-bootstrap';

const VerFactura = (props: {Show: boolean, HandlerdClickCerrar: any, Factura: number}) => {

 return (
      <div>
        <Modal show={props.Show} centered={true} animation={true} size='xl'>
            <Modal.Header  className={`bg-light`}  >
                <Modal.Title className='fw-bold'  style={{"color": "#2A3482"}}>
                    <h4>Datos de la factura</h4>
                </Modal.Title>
                <Button className="m-1 p-2 " onClick={props.HandlerdClickCerrar}   style={{"backgroundColor": "#2A3482"}}>Cerrar</Button>    
            </Modal.Header>
            <Modal.Body>
                    <ViewFacturaComponent Factura={props.Factura}/>
            </Modal.Body>                
            <Modal.Footer >  
                  <Button className="m-1 p-2 " onClick={props.HandlerdClickCerrar}   style={{"backgroundColor": "#2A3482"}}>Cerrar</Button>                  
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default VerFactura;