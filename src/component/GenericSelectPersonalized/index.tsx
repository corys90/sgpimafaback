import { useEffect, useState } from "react";
import { httpApiGet } from "../../lib";

const GenericSelectPersonalized = (props:{Url?: string, Value: string, ClassName: string, onSelect: any, disabled?: boolean,
                                    ValueField: string, ValueText: string, id: string, all?: string, Data?: []}) =>{

    const [sltPos, setSltPos] = useState([]);
    const [placeholder, setPlaceHolder] = useState("Cargando...");
    const [value, setValue] = useState({id: "", value: "", text: ""});
    let [lastItems, setLastitems] = useState(0);

    const getApi = async ()=>{
        const response = await httpApiGet(props.Url);
        if (response.statusCode >= 400){
            setPlaceHolder("Error: sin datos que mostrar");
        }else{
            if (response.data.length > 0){
                setPlaceHolder("Seleccione opción");
                setSltPos(response.data);  
                lastItems = response.data.length + 1;    
                setLastitems(lastItems);          
            }else{
                setPlaceHolder("No hay datos...");             
            }  
        }
    };

    const handler = (e: any)=>{

        value.id = e.target.id;
        value.value = e.target.value;
        value.text = e.target.options[e.target.options.selectedIndex].text;
        setValue({...value});

        props.onSelect(value, sltPos.length + 1);
    }

    useEffect(()=>{


        setValue({...value, value: props.Value});
        //console.log("props select: ", value);
        if (props.Data){
            setSltPos(props.Data);  
            setPlaceHolder("Seleccione opción");   
            setLastitems(props.Data.length + 1);         
        }else{
            getApi();
        }
        
    }, [props]); 

    return(
        <>
            <select 
                id={props.id}
                className={props.ClassName}
                value={value.value} 
                onChange={handler}  
                disabled={props.disabled ? props.disabled : false}
                title={placeholder}
            >
                <option value="0" >{placeholder} </option>       
                {props.all && <option value={lastItems} >{props.all}</option> }                                  
                {
                    sltPos.map((opc: any, idx: number )=> <option key={idx} value={opc[props.ValueField]} >{`${opc[props.ValueText]}`}</option>)
                }  
                                     
            </select>
        </>
    );
}

export default GenericSelectPersonalized;