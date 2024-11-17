import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaCashRegister, FaPrint, FaRegCheckCircle } from "react-icons/fa";
import './style.css';

const MsgFacturaDialog = (props: {Show: boolean, Title: string, FacturaNro: string, HandlerdClickImprimir: any, HandlerdClickCerrar: any, size: string}) => {
   
 return (
      <div>
        <Modal show={props.Show} centered={true} size={`${props.size}`} animation={true} >
            <Modal.Header  className={`bg-success`}  >
                <Modal.Title className='h3 text-center text-light'>
                    {                        
                        props.Title
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-column gap-3 justify-content-center align-middle'>
                    <div className='text-center' >
                        <h2><FaRegCheckCircle className=' text-success'  style={{fontSize:"5rem"}} /></h2>
                    </div>
                    <div className='d-flex flex-column h4 '>
                        <div className='text-center'><label htmlFor="">Se ha generado la factura Nro: <strong className='text-danger fw-bolder'>{props.FacturaNro}</strong></label></div>
                        <p></p>
                        <div className='text-center'><label htmlFor="">¿Seleccione lo que desee hacer?</label></div>
                    </div>
                </div>
            </Modal.Body>                
            <Modal.Footer className=' d-flex justify-content-between h3'>
                {/* <Button type="button" className="btn btn-primary w-25 p-3" onClick={props.HandlerdClickPagar}>
                     <FaCashRegister className='h3 me-2' /> <label htmlFor="" className='h5'>Pagar</label>
                </Button> */}

                <Button type="button" className="btn btn-secondary w-25 p-3 " onClick={props.HandlerdClickImprimir}>
                     <FaPrint className='h3 me-2'  /> <label htmlFor="" className='h5'>Imprimir</label>
                </Button>

                <Button type="button" className="btn btn-success w-25 p-3 " onClick={props.HandlerdClickCerrar}>
                     <label htmlFor="" className='h5'>Cerrar</label>
                </Button>                        
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default MsgFacturaDialog;