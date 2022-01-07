import global from '@/utils/global'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {

    async popAlert(icono, titulo, confirmacion, cancelar, tiempo, textobotonOk) {

        if (confirmacion || cancelar)
            tiempo = null;
        
        let resultado = await Swal.fire({
            position: 'center',
            icon: icono,  // 'error', 'warning', 'success', 'question'
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

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDEyOTE5MzksImV4cCI6MTY0MTM3ODMzOSwiZGF0YSI6eyJ1c2VyX2lkIjozfX0._5pUv_4gB5SNjrBbnh77oDtGrx5d0A2oGi1ScuL81QU";

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
    async getListaFuentes() {

        let Google_api_key = "AIzaSyBsPrBMGtuGI9yONrIChthSCvFTMeMWccE";

        let resultado = await axios.get('https://webfonts.googleapis.com/v1/webfonts?sort=ALPHA&key=' + Google_api_key);
        return resultado

    },
    generarUUID1() {
    var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    generarUUID2 (prefix, moreEntropy) {
        //  discuss at: http://locutus.io/php/uniqid/
        // original by: Kevin van Zonneveld (http://kvz.io)
        //  revised by: Kankrelune (http://www.webfaktory.info/)
        //      note 1: Uses an internal counter (in locutus global) to avoid collision
        //   example 1: var $id = uniqid()
        //   example 1: var $result = $id.length === 13
        //   returns 1: true
        //   example 2: var $id = uniqid('foo')
        //   example 2: var $result = $id.length === (13 + 'foo'.length)
        //   returns 2: true
        //   example 3: var $id = uniqid('bar', true)
        //   example 3: var $result = $id.length === (23 + 'bar'.length)
        //   returns 3: true
        if (typeof prefix === 'undefined') {
            prefix = ''
        }
        var retId
        var _formatSeed = function (seed, reqWidth) {
            seed = parseInt(seed, 10).toString(16) // to hex str
            if (reqWidth < seed.length) {
                // so long we split
                return seed.slice(seed.length - reqWidth)
            }
            if (reqWidth > seed.length) {
                // so short we pad
                return Array(1 + (reqWidth - seed.length)).join('0') + seed
            }
             return seed
        }
        var $global = (typeof window !== 'undefined' ? window : global)
        $global.$locutus = $global.$locutus || {}
        var $locutus = $global.$locutus
        $locutus.php = $locutus.php || {}
        if (!$locutus.php.uniqidSeed) {
            // init seed with big random int
            $locutus.php.uniqidSeed = Math.floor(Math.random() * 0x75bcd15)
        }
        $locutus.php.uniqidSeed++
        // start with prefix, add current milliseconds hex string
        retId = prefix
        retId += _formatSeed(parseInt(new Date().getTime() / 1000, 10), 8)
        // add seed hex string
        retId += _formatSeed($locutus.php.uniqidSeed, 5)
        if (moreEntropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10).toFixed(8).toString()
        }
        return retId
    }



}
