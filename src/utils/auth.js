import global from '@/utils/global'
import axios from 'axios'

export default {

    async getUserLogged() {

        localStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJhdWQiOiJ0cnVlc29mdHdhcmVfZXNwYVx1MDBmMWEiLCJpYXQiOjE2NDEyOTE5MzksImV4cCI6MTY0MTM3ODMzOSwiZGF0YSI6eyJ1c2VyX2lkIjozfX0._5pUv_4gB5SNjrBbnh77oDtGrx5d0A2oGi1ScuL81QU";

        if(!localStorage.token) {

            // No existe token
            if(global.DEBUG)
                console.log("getUserLogged", "No existe token en las variables de sesion");

            return null;

        } else {

            // Existe un token. Comprobar que es válido
            let resultado = await axios.post(global.ENDPOINT_PATH + "auth/user_info.php", {}, { 'headers': { 'Authorization': 'Bearer ' + localStorage.token} });

            if(resultado.data.success == 1 && resultado.data.status == 200){

                // Token válido, devuelve datos del usuario
                if(global.DEBUG)
                    console.log("getUserLogged", "Token valido, devuelve datos del usuario", resultado.data);
                
                return resultado.data;

            } else {

                // Token NO válido, borra las variables de sesion y devuelve null
                if(global.DEBUG)
                    console.log("getUserLogged", "Token NO valido, borra variables de sesion y devuelve null", resultado, "Token:", localStorage.token);

                //this.deleteUserLogged();
                return null;

            }

        }

    },
    deleteUserLogged() {

        if(global.DEBUG)
            console.log("deleteUserLogged", "Borrando todas las variables de sesion");

        localStorage.clear();

    },



}