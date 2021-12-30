<script>

const EMPRESA = 'True Software España';
const PRODUCCION = false;
let ENDPOINT_PATH;
const DEBUG = true;

if(PRODUCCION == true) {
       ENDPOINT_PATH = 'http://biancotti.es/trueback/';
} else {
       ENDPOINT_PATH = 'http://localhost/trueback/';
}

export default
{
       PRODUCCION,
       ENDPOINT_PATH,
       DEBUG,
       EMPRESA,

}
 </script> 
