import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { FaBell } from 'react-icons/fa';

function ToastAutoHide(props: {show: boolean, message: string, onTimeOff: any, class: any, timeoff: number, type: boolean}) {
  const [show, setShow] = useState(false);

  const stl = {
      position: "fixed",
      top: "10%",
      right: "8.8%",
  };

  useEffect(()=>{

    setShow(props.show);

  },[props.show]);

  return (
    <div className={props.class} style={stl}>
        <Toast onClose={props.onTimeOff} 
              show={show} delay={props.timeoff} 
              style={{backgroundColor: props.type ? "#d3f3d2": "#f5e4e8" }} 
              autohide>
          <Toast.Body>
            {
              (props.type) 
                ?  <div className='d-flex gap-1'>
                       <div><FaBell className='text-success fw-bold'/></div>
                       <div className='text-success'>{props.message}</div>
                  </div>
                :
                    <div className='d-flex gap-1'>
                        <div><FaBell className='text-danger fw-bold'/></div>
                        <div className='text-danger'>{props.message}</div>
                    </div>
            }
          </Toast.Body>
        </Toast>
    </div>
  );
}

export default ToastAutoHide;