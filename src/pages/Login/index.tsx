
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { FaDoorOpen, FaKey, FaRegHandPaper, FaUserTie } from 'react-icons/fa';
import logo from '../../assets/logoPpal2.png';
import './style.css';
import { useDispatch } from "react-redux";
import { useState } from "react";
import MsgDialog from "../../component/MsgDialog";
import MsgModalSpinner from "../../component/MsgModalSpinner";
import { SetEntornoEmp } from '../../redux/store/Actions';
import * as env from '../../env';

const PageLogin = () => {

    const dispatch = useDispatch();
    let [formData, setFormData] = useState({user:"", pass:"", valid: "login"});
    const navigate = useNavigate();
    const [msgDlgShow, setMsgDlgShow] = useState(false);
    const [msgAlrtUsr, setMsgAlrtUsr] = useState(false);
    const [msgAlrtPwd, setMsgAlrtPwd] = useState(false);
    const [sHCarga, setSHCarga] = useState(false);    

    const changeText = (evnt: any) => {

        formData = {...formData, [evnt.target.id]: evnt.target.value.trim()}
        setFormData(formData);
        setMsgAlrtUsr(false);
        setMsgAlrtPwd(false);    
    }

    const keyPress = (evnt: any) => {
        if (evnt.key === "Enter"){
            sendForm(evnt);
        }      
    }       

    const sendForm = async(e: any) =>{

        e.preventDefault();

        let sw = 0;
        
        (formData.user === "") ? setMsgAlrtUsr(true) : sw++; 
        (formData.pass === "") ? setMsgAlrtPwd(true) : sw++; 

        if (sw === 2){

            setSHCarga(true);

/*             const response = await httpApiPPPD("/login", "POST", {
                "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
                "Content-Type" : "application/json"
            }, formData);
            if (response.code !== 200) {
                setMsgDlgShow(true);
            }else{
                jwt = response.message.jwtToken;
                setJwt(jwt);
                dispatch(SetJwt(jwt));
                dispatch(SetUser(formData.username));
                navigate("/landingpage");
            }   */ 
/*             dispatch(SetEntornoEmp({first_name: dta.payload.user.first_name, id_user: dta.payload.user.id_user,
                last_name: dta.payload.user.last_name, profile: dta.payload.user.profile, 
                token:  dta.payload.token, user: formData.user,
            })); */
            dispatch(SetEntornoEmp({first_name: "Usuario ", id_user: "0",
                last_name: "pruebas", profile: "a.b.c.d.e", 
                token:  "jwtOken", user: formData.user,
            }));            
            navigate("/landingpage");            
            setSHCarga(false);            
        }
    
    }

    return(
        <>
            <div className='container mt-5 shadow-lg p-3 mb-5 border rounded pageMobile'  style={{backgroundColor: "white"}}>
                <Container>
                    <div className='text-center'>
                        <img src={logo} alt="" className="img-fluid" style={{width: "50%"}}/>
                    </div>
                    <div className='m-3 text-center'><span className='h3'>Inicio de sesión</span></div>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label><FaUserTie /> Usuario</Form.Label>
                            <Form.Control type="user" placeholder="usuario" id="user" onChange={changeText} value={formData.username}/>
                            <Form.Text>
                                <Alert variant="danger" show={msgAlrtUsr} className="p-1 m-0">
                                    <FaRegHandPaper className='mb-1' /> Debe ingresar un usuario válido!!!
                                </Alert>
                                <div className=" text-end ">Ingrese con un usuario autorizado</div>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label> <FaKey /> Constraseña</Form.Label>
                            <Form.Control type="password" placeholder="contraseña"  id="pass" onChange={changeText} onKeyUp={keyPress} value={formData.password}/>
                            <Form.Text>
                                <Alert variant="danger" show={msgAlrtPwd} className="p-1 m-0">
                                        <FaRegHandPaper className='mb-1' /> Debe ingresar una contraseña válida!!!
                                </Alert>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mt-4 mb-4">
                            <Col className='text-center mt-3'>
                                <Button onClick={sendForm} className='w-75 border ' style={{backgroundColor: " #404E67", height:"60px"}}> <FaDoorOpen /> Ingresar</Button>
                            </Col>
                        </Form.Group>                                           
                    </Form>
                </Container>
            </div>
            {/*********** seccion de modales **********************/}
            {/*********** cuadro de dialogo para errores **********/}
            <MsgDialog
                Show={msgDlgShow}
                Title={`Inicio de sesión`}
                Icon="!"
                Message={["Usuario y/o password incorrecto. Por favor verifiquelo y vuelva a intentar."]}
                BtnOkName="Aceptar"
                BtnNokName=""
                HandlerClickOk={null}
                HanlerdClickNok={null}
            />
            <MsgModalSpinner 
                Show={sHCarga}
                text="Un momento porfavor, validando acceso y cargando valores..."
                color="#FF7588"
            />
        </>
    )

};

export default PageLogin;