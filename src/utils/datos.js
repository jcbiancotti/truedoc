import global from '@/utils/global'
import axios from 'axios'

export default {

    async existe (pCorreo) {

        // Comprueba se el correo existe en la tabla de usuarios
        // correo: correo@ejemplo.com

        if(global.DEBUG)
            console.log("datos.existe", "parametros", pCorreo);

        // No requiere el token
        let resultado = await axios.post(global.ENDPOINT_PATH + "auth/existe.php", {'correo': pCorreo});

        if(global.DEBUG)
            console.log("datos.existe", "datos devueltos back", resultado);

        return resultado.data;

    },
    async leerLista(pTabla, pClave, pModelo, pOrden) {

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDE4MjQwODcsImV4cCI6MTY0MTkxMDQ4NywiZGF0YSI6eyJ1c2VyX2lkIjozfX0.XG89MhPaSEprLGp-BEqhXXq7A7KKcAXvfw9RKktSD_k";

        let opciones = { 'headers': { 'Authorization': 'Bearer ' + localStorage.token} };

        // Objeto consulta
        let consulta = 
        {
            "operacion":"READ",
            "tabla":pTabla,
            "clave":pClave,
            "modelo":pModelo,
            "orden":pOrden
        }        
        let resultado = await axios.post(global.ENDPOINT_PATH + 'datos/data_manager.php', consulta, opciones);
            
        if(global.DEBUG)
            console.log("datos.leerLista", "datos devueltos back", resultado);
    
        return resultado.data;          
            
    }




}