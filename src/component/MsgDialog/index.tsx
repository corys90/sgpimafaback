import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import './style.css';
import { useState } from 'react';

const MsgDialog = (props: {Show: boolean, Title: string, Icon: boolean, Message: string[], 
                  BtnOkName: string, BtnNokName: string,
                  HandlerdClickOk: any, HandlerdClickNok: any, size: string}) => {

    const [icn] = useState(props.Icon ? "success" : "danger");

    const Icono = (props: {tipo: boolean})=>{
        if (props.tipo) 
            return <FaExclamationCircle className={`text-${icn}`} style={{fontSize:"5rem"}}/>
        else
            return <FaTimesCircle className={`text-${icn}`} style={{fontSize:"5rem"}}/>
    }
    
 return (
      <div>
        <Modal show={props.Show} centered={true} size={`${props.size}`} >
            <Modal.Header  className={`bg-${icn}`}  >
                <Modal.Title className='h3 text-center text-light'>
                    {                        
                        props.Title
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-row gap-3 align-middle' >
                    <div >
                        <Icono tipo={props.Icon}/>
                    </div>
                    <div className='d-flex align-items-center '>
                        <span>
                            <ul>
                                {
                                    props.Message.map((msg: string, idx: number )=> <li key={idx}>{msg}</li>)
                                }
                            </ul>
                        </span>
                    </div>
                </div>
            </Modal.Body>                
            <Modal.Footer className=''>
                {
                    (props.BtnOkName) 
                        ? 
                        <Button type="button" className="btn btn-success btnColorOk" onClick={props.HandlerdClickOk}>
                            {props.BtnOkName}
                        </Button>
                        : <div></div>
                }      
                {
                    (props.BtnNokName) 
                        ? 
                        <Button type="button" className="btn btn-danger btnColorNOk" onClick={props.HandlerdClickNok}>
                            {props.BtnNokName}
                        </Button>
                        : <div></div>
                }                                      
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default MsgDialog;