import * as env from './env';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
        return ({statusCode: 400, messages: ["Error en la petición api"], data: []});
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

        return ({statusCode: response.status, messages: data, Data: []});
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({statusCode: 400, messages: ["Error en la petición api"], data: []});
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
        return ({statusCode: 500, messages: ["Error a la petición API. Contacte al administrador"], data: []});
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

export const exportToExcel = (fineName: string, datos: any) => {

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fineName + fileExtension);
}

