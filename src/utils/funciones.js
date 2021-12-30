import global from '@/utils/global'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {

    async popAlert(icono, titulo, confirmacion, cancelar, tiempo, textobotonOk) {

        if (confirmacion || cancelar)
            tiempo = null;
        
        let resultado = await Swal.fire({
            position: 'center',
            icon: icono,  // 'error', 'warning', 'success'
            title: titulo,
            showConfirmButton: confirmacion,
            showCancelButton: cancelar,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: textobotonOk,
            timer: tiempo
        })
        return resultado.isConfirmed;
        
    },
    async generarPDFmuestra(pModelo) {

        console.log(pModelo);

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDA4MDAzNzgsImV4cCI6MTY0MDg4Njc3OCwiZGF0YSI6eyJ1c2VyX2lkIjozfX0.KjnD11bknSuMSnvXVh8StqFAqsH66541wyfOz-Ymsk0";

        let opciones = { 'headers': { 'Authorization': 'Bearer ' + localStorage.token} };

        // Componer el envío
        let envio = {
            "objeto": pModelo
        }
        let resultado = await axios.post(global.ENDPOINT_PATH + 'sistema/generarpdfvacio.php', envio, opciones);
            
        if(global.DEBUG)
            console.log("sistema.generarPDFmuestra", "datos devueltos back", resultado);
    
        return resultado.data;          
            
    },
    convertHex(color) {
        
        console.log("funciones recibido", color)
        color = color.replace('#', '')
        const r = parseInt(color.substring(0, 2), 16)
        const g = parseInt(color.substring(2, 4), 16)
        const b = parseInt(color.substring(4, 6), 16)
        // return `rgba(${r}, ${g}, ${b}, ${this.opacity / 100})`
        return `rgba(${r}, ${g}, ${b})`
    }


}

