import Modal from 'react-bootstrap/Modal';
import PosCajaPagoFactura from '../../pages/PosCajaPagoFactura';

const ModalPago = (props: {Show: boolean, HandlerdClickCerrar: any, Factura: any, Pago: any}) => {

 return (
      <div>
        <Modal show={props.Show} centered={true} animation={true} size='xl'>
            <Modal.Header  className={`bg-success`}  >
                <Modal.Title className='h3 text-center text-light'>
                    <h1>Pagar factura</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <PosCajaPagoFactura HandlerdClickCerrar={props.HandlerdClickCerrar} Factura={props.Factura} Pago={props.Pago} />
            </Modal.Body>                
            <Modal.Footer className=' d-flex justify-content-between h3'>                       
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default ModalPago;