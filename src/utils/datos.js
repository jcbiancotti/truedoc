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

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDMwMjg5NDksImV4cCI6MTY0MzExNTM0OSwiZGF0YSI6eyJ1c2VyX2lkIjozfX0.tGog9ZYUWJGnGuTcJgV23lXKJ9x_C6c2_sLksCfupNY";

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
            
    },
    async grabarHeadDocumento(pModelo) {

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDMwMjg5NDksImV4cCI6MTY0MzExNTM0OSwiZGF0YSI6eyJ1c2VyX2lkIjozfX0.tGog9ZYUWJGnGuTcJgV23lXKJ9x_C6c2_sLksCfupNY";

        let opciones = { 'headers': { 'Authorization': 'Bearer ' + localStorage.token} };

        let envio = {
            "operacion":"ADD",
            "tabla":'sys_head_documentos',
            "modelo": ["id", "titulo", "version", "activa"],
            "objeto": pModelo
        }    
        let resultado = await axios.post(global.ENDPOINT_PATH + 'datos/data_manager.php', envio, opciones);
 
        if(global.DEBUG)
            console.log("datos.grabarHeadDocumento", "datos devueltos back", resultado);
    
        return resultado.data;          
            
    },
    async grabarDocumento(pModelo) {

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDMwMjg5NDksImV4cCI6MTY0MzExNTM0OSwiZGF0YSI6eyJ1c2VyX2lkIjozfX0.tGog9ZYUWJGnGuTcJgV23lXKJ9x_C6c2_sLksCfupNY";

        let opciones = { 'headers': { 'Authorization': 'Bearer ' + localStorage.token} };

        let envio = {
            "operacion":"ADD",
            "tabla":'sys_documentos',
            "modelo": ["id", "descripcion", "objeto", "propiedad", "valor"],
            "objeto": pModelo
        }    
        let resultado = await axios.post(global.ENDPOINT_PATH + 'datos/data_manager.php', envio, opciones);
 
        if(global.DEBUG)
            console.log("datos.grabarDocumento", "datos devueltos back", resultado);
    
        return resultado.data;          
            
    }




}