import { useEffect, useState } from "react";
import { httpApiGet } from "../../lib";

const GenericSelect = (props:{Url: string, Value: number, className: string, onSelect: any}) =>{

    const [sltPos, setSltPos] = useState([]);
    const [placeholder, setPlaceHolder] = useState("Cargando...");
    const [value, setValue] = useState({value: props.Value, text: ""});

    const getPos = async ()=>{
        const response = await httpApiGet(props.Url);
        if (response.statusCode >= 400){
            setPlaceHolder("Error: sin datos que mostrar");
        }else{
            setSltPos(response.data);                   
        }
    };

    const handler = (e: any)=>{

        value.value = e.target.value;
        value.text = e.target.options[e.target.options.selectedIndex].text;
        setValue({...value});

        props.onSelect(value);
    }

    useEffect(()=>{
        console.log("UseEffect -> GenericSelect");
        getPos();
    }, []);

    return(
        <>
            <select 
                className={props.className}
                aria-label={placeholder} 
                id="idPos" 
                value={value.value} 
                onChange={handler}  
                disabled={false}
            >
                <option value="0" >Seleccione un P.O.S.</option>
                {
                    sltPos.map((opc: any, idx: number )=> <option key={idx} value={opc.id} >{`${opc.nombre}`}</option>)
                }                          
            </select>
        </>
    );
}

export default GenericSelect;