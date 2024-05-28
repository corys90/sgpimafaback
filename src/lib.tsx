import * as env from './env';

export async function httpApiPPPD(endp: string, metodo: string, cabeceras: any, bd: any) {
    try {
        const recurso = `${env.REACT_APP_API_URL_PROD}${endp}`;
        const response = await fetch(recurso, {
                method: metodo,
                headers: cabeceras,
                body: JSON.stringify(bd)
        });    
        const data = await response.json();
        return (data);
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({code: 400, message: "Error en la petición api"});
    }
}

export async function httpApiDelete(endp: string, metodo: string) {
    
    let data: any = null;

    try {
        const recurso = `${env.REACT_APP_API_URL_PROD}${endp}`;
        const response = await fetch(recurso, {
                method: metodo
        }); 

        if ((response.status) && (response.status === 204)){
            data = "";            
        }else{

            data = await response.json();
        }       

        return ({code: response.status, message: data});
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({code: 400, message: "Error en la petición api"});
    }
}

export async function httpApiGet(endp: string) {
    
    try {
        const recurso = `${env.REACT_APP_API_URL_PROD}${endp}`;
        const response = await fetch(recurso, {
                method: 'GET',
                headers: {
                    "content-type": "application/json; charset=utf-8"
                }

        });     
        const data = await response.json();
        return (data);
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({StatusCode: 500, Messages: ["Error a la petición API. Contacte al administrador"], Data: []});
    }
}

export function formatDate(date: Date) {

    // ✅ funciones de apoyo para format date as DD/MM/YYYY
    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }   

    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].reverse().join('-');
}
// Fin funcione sde apoyo

export const getFechaYhora = () =>{

    // Obtiene la fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
    const hh = (new Date().getHours()) < 10 ? `0${new Date().getHours()}`:`${new Date().getHours()}`;
    const mm = (new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}`:`${new Date().getMinutes()}`; 
    const fechaYhora = `${formatDate(new Date())}T${hh}:${mm}:00`;   

    return (fechaYhora);
}

export const getTipoNameByid = (id: number, lista: []) =>{
    
    let nm = "";    
    lista.map((element: any) => {
        if (id === element.id){
            nm = element.nombre;
            return;
        }
    });

    return (nm);
}
