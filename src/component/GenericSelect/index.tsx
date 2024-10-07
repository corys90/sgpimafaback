import { useEffect, useState } from "react";
import { httpApiGet } from "../../lib";

const GenericSelect = (props:{Url?: string, Value: string, ClassName: string, onSelect: any,
                              ValueField: string, ValueText: string, id: string, Data?: any}) =>{

    let [sltData, setSltData] = useState([]);
    const [placeholder, setPlaceHolder] = useState("Cargando...");
    const [value, setValue] = useState({id: "", value: props.Value, text: ""});

    const getApi = async ()=>{
        const response = await httpApiGet(props.Url);
        if (response.statusCode >= 400){
            setPlaceHolder("Error: sin datos que mostrar");
        }else{
            if (response.data.length > 0){
                setPlaceHolder("Seleccione opción");
                setSltData(response.data);                
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

        props.onSelect(value);
    }

    useEffect(()=>{
        if (props.Url){
            getApi();
        }
    }, []);

    useEffect(()=>{

        if (props.Data){
            sltData = props.Data;
            setSltData([...sltData]);  
            setPlaceHolder("Seleccione opción");            
        }
        
    }, [props.Data]);    

    return(
        <>
            <select 
                id={props.id}
                className={props.ClassName}
                value={props.Value} 
                onChange={handler}  
                disabled={false}
                title={placeholder}
                defaultValue={-2}
            >
                <option value="0" >{placeholder} </option>
                {
                    sltData.map((opc: any, idx: number )=> <option key={idx} value={opc[props.ValueField]} >{`${opc[props.ValueText]}`}</option>)
                }                          
            </select>
        </>
    );
}

export default GenericSelect;