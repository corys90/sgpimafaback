import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const LinkToolTip = (props: { id: string, url: string, title: string, text: string, icon: any }) =>{
    return(
        <>
            <OverlayTrigger
                placement="right"
                overlay={
                    <Tooltip id={props.id}>{props.text}</Tooltip>
                }
            >
                <Link className={`dropdown-item `} to={props.url} style={{"color": "#2A3482"}}> {props.icon} {props.title}</Link>
            </OverlayTrigger>        
        </>
    );
};

export default LinkToolTip;