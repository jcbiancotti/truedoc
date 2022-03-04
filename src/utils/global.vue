<script>

const EMPRESA = 'True Software España';
const PRODUCCION = false;
const TABLE_SCHEMA = 'true0001';
let ENDPOINT_PATH;
const DEBUG = true;
let usuario = {
    logged: false,
    userId: 0,
    userEmail: '',
    userName: '',
    userFullName: '',
    userRoles: [],
}        

if(PRODUCCION == true) {
    ENDPOINT_PATH = 'http://biancotti.es/trueback/';
} else {
    ENDPOINT_PATH = 'http://localhost/trueback/';
}

export default
{
    PRODUCCION,
    TABLE_SCHEMA,
    ENDPOINT_PATH,
    DEBUG,
    EMPRESA,
    usuario,

}
 </script> 
