<template>
<div class="container-fluid">

    <telon :hidden="telon"/>

    <!-- TABS -->
    <ul class="nav nav-pills" role="tablist">
        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#datos-docu">Metadatos</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-formato">Formato</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-encabezado">Contenido del encabezado</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-subencabezado">Contenido del sub-encabezado</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-cuerpo">Contenido del cuerpo</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-subtotales">Contenido del subt-total</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-pie">Contenido del pie</a></li>
        <li class="nav-item"><a class="nav-link">Grabar</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">

        <!-- METADATOS -->
        <div id="datos-docu" class="container tab-pane fade show active"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Metadatos</h3>
                </div>
                <div class="card-body">

                    <form action @submit.prevent="cero">

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) T&iacute;tulo:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.titulo">
                            </div>
                        </div> 

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) Versi&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.version">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) Orientaci&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <select class="form-control" v-model="modelo.oMetadatos.orientacion">
                                    <option value="V">Vertical</option>
                                    <option Value="H">Horizontal</option>
                                </select>
                            </div>
                        </div>

                    </form>

                </div>

            </div>

        </div>

        <!-- FORMATO -->
        <div id="datos-formato" class="container tab-pane fade"><br>

            <div class="card text-center mb-12">
                
                <div class="card-header">
                    <h3>Formato del documento</h3>
                </div>
                <div class="card-body">

                    <table class="text-left">
                        <tr>
                            <td>
                                <div class="fullpage" :style="`${'width:' + cancho + 'px;height:' + calto + 'px'}`">

                                    <div ref="encabezado" id="encabezado" class="encabezado" :style="`${'height:' + modelo.oHeader.height + 'px;max-height:' + maxHeader + 'px;background-color:' + modelo.oHeader.backcolor}`" v-resize="onResize">
                                        <p>Encabezado</p>
                                    </div>

                                    <div ref="subencabezado" id="subencabezado" class="subencabezado" :style="`${'height:' + modelo.oSubHeader.height + 'px;max-height:' + maxSubHeader + 'px;background-color:' + modelo.oSubHeader.backcolor}`" v-resize="onResize">
                                        <p>Sub-encabezado</p>
                                    </div>

                                    <div ref="cuerpo" id="cuerpo" class="cuerpo" :style="`${'height:' + modelo.oBody.height + 'px;max-height:' + maxBody + 'px;background-color:' + modelo.oBody.backcolor}`" v-resize="onResize">
                                        <p>Cuerpo</p>
                                    </div>

                                    <div ref="subtotales" id="subtotales" class="subtotales" :style="`${'height:' + modelo.oSubTotales.height + 'px;max-height:' + maxSubTotales + 'px;background-color:' + modelo.oSubTotales.backcolor}`" v-resize="onResize">
                                        <p>Sub-totales</p>
                                    </div>

                                    <div ref="pie" id="pie" class="pie" :style="`${'height:' + modelo.oPie.height + 'px;max-height:' + maxPie + 'px;background-color:' + modelo.oPie.backcolor}`" v-resize="onResize">
                                        <p>Pie del documento</p>
                                    </div>

                                </div>                                        
                            </td>
                            <td >
                                <!-- HEADER -->
                                <tr>
                                    <td>
                                        <label for="altura-header">Altura del encabezado</label><br>
                                    </td>
                                    <td>
                                        <input type="number" id="porce-header" name="porce-header" style="width:80px" min="0" :max="maxPorceHeader" v-model="porceHeader">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oHeader.backcolor" compo="encabezado" :destino="poneColor"/>
                                    </td>
                                </tr>
                                <!-- SUBHEADER -->
                                <tr>
                                    <td>
                                        <label for="altura-subheader">Altura del sub-encabezado</label><br>
                                    </td>
                                    <td>
                                        <input type="number" id="porce-subheader" name="porce-subheader" style="width:80px" min="0" :max="maxPorceSubHeader" v-model="porceSubHeader">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oSubHeader.backcolor" compo="subencabezado" :destino="poneColor"/>
                                    </td>                                    
                                </tr>
                                <!-- BODY -->
                                <tr>
                                    <td>
                                        <label for="altura-body">Altura del cuerpo</label><br>                                                
                                    </td>
                                    <td>
                                        <input type="number" id="porce-body" name="porce-body" style="width:80px" min="0" :max="maxPorceBody" v-model="porceBody">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oBody.backcolor" compo="cuerpo" :destino="poneColor"/>
                                    </td>                                        
                                </tr>    
                                <!-- SUBTOTALES-->
                                <tr>
                                    <td>
                                        <label for="altura-subtotales">Altura del sub-total</label><br>
                                    </td>
                                    <td>
                                        <!-- <input type="number" id="altura-subtotales" name="altura-subtotales" style="width:80px" min="0" :max="maxSubTotales" step="1.00" v-model="modelo.oSubTotales.height"> -->
                                        <input type="number" id="porce-subtotales" name="porce-subtotales" style="width:80px" min="0" :max="maxPorceSubTotales" v-model="porceSubTotales">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oSubTotales.backcolor" compo="subtotales" :destino="poneColor"/>
                                    </td>                                        
                                </tr>
                                <!-- PIE -->
                                <tr>
                                    <td>
                                        <label for="altura-pie">Altura del pie</label><br>                                                
                                    </td>
                                    <td>
                                        <!-- <input type="number" id="altura-pie" name="altura-pie" style="width:80px" min="0" :max="maxPie" v-model="modelo.oPie.height"> -->
                                        <input type="number" id="porce-pie" name="porce-Pie" style="width:80px" min="0" :max="maxPorcePie" step="1.00" v-model="porcePie">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oPie.backcolor" compo="pie" :destino="poneColor"/>
                                    </td>                                        
                                </tr>  
                                <tr>
                                    <p class="btn" @click="muestraPDF()">Generar documento de muestra</p>
                                    <!-- <p class="btn" @click="mensaje()">PRUEBA</p>
                                    <p>
                                        <vue-excel-xlsx class="btn"
                                            :data="datos"
                                            :columns="columnas"
                                            :filename="'filename'"
                                            :sheetname="'sheetname'"
                                            >
                                            Download
                                        </vue-excel-xlsx>
                                    </p>
                                    <p class="btn" @click="ponerTelon(true)">Poner Telon</p> -->


                                </tr>
                            </td>
                        </tr>
                    </table>

                </div>

            </div>
        </div>

        <!-- ENCABEZADO -->
        <div id="datos-encabezado" class="container tab-pane fade"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Contenido del encabezado</h3>
                </div>
                <div class="card-body">

                    <table>
                        <tr>
                            <td>
                                <div class="fullpage-header" :style="`${'height:' + modelo.oHeader.height + 'px;background-color:' + modelo.oHeader.backcolor}`">



                                </div> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img id="logoimg" src="@/assets/img/true-logo.png" width="100" height="100">
                            </td>
                            <td>
                                <input type="checkbox" id="logo" name="logo" v-model="modelo.oHeader.logo.SiNo">
                                <label for="logo">Incluir logo en el encabezado</label><br>
                            </td>                            
                        </tr>
                    </table>


                </div>

            </div>

        </div>

        <!-- SUB-ENCABEZADO -->
        <div id="datos-subencabezado" class="container tab-pane fade"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Contenido del sub-encabezado</h3>
                </div>
                <div class="card-body">

                </div>

            </div>

        </div>

        <!-- CUERPO -->
        <div id="datos-cuerpo" class="container tab-pane fade"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Contenido del cuerpo</h3>
                </div>
                <div class="card-body">

                </div>

            </div>

        </div>        

        <!-- SUBTOTAL -->
        <div id="datos-subtotales" class="container tab-pane fade"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Contenido del sub-total</h3>
                </div>
                <div class="card-body">

                </div>

            </div>

        </div>

        <!-- PIE -->
        <div id="datos-pie" class="container tab-pane fade"><br>

            <div class="card text-center">
                
                <div class="card-header">
                    <h3>Contenido del pie</h3>
                </div>
                <div class="card-body">

                </div>

            </div>

        </div>



    </div>



</div>
</template>

<script>

import funciones from '@/utils/funciones'
import truecolor from '@/components/visuales/trueColor'
import resize from 'vue-resize-directive'
import telon from '@/components/visuales/telon'

export default {
    name: 'NewDoc',
    components:{
        truecolor,
        telon
    },
    directives:{
        resize
    },
    data() {
        return {
            telon: true,
            ancho: 595,
            alto: 842,
            modelo: {
                oMetadatos: {
                    titulo: '',
                    version: 0,
                    orientacion: 'V',
                },
                oHeader: {
                    backcolor: "#FFFFFF",
                    height: 200,
                    hPorce: (200/842*100),
                    logo: {
                        SiNo: false,
                        posY: 10,
                        posX: 10,
                        height: 100,
                        width: 100,
                        img: ''
                    },
                },
                oSubHeader: {
                    backcolor: "#FFFFFF",
                    height: 30,  
                    hPorce: (30/842*100),              
                },
                oBody: {
                    backcolor: "#FFFFFF",
                    height: 482,
                    hPorce: (842/842*100),                
                },
                oSubTotales: {
                    backcolor: "#FFFFFF",
                    height: 30, 
                    hPorce: (30/842*100),               
                },
                oPie: {
                    backcolor: "#FFFFFF",
                    height: 100,
                    hPorce: (100/842*100),                
                }
            },
            ro1: null,
            ro2: null,
            ro3: null,
            ro4: null,
            ro5: null,
            columnas: [
                {
                    label: "Product",
                    field: "product",
                },
                {
                    label: "Price",
                    field: "price",
                    dataFormat: this.priceFormat
                },
                {
                    label: "Quantity",
                    field: "quantity",
                },
            ],
            datos: [
                {
                    product: "Beverage",
                    price: 10,
                    quantity: 2
                },
                {
                    product: "Snack",
                    price: 12,
                    quantity: 6
                },
                {
                    product: "Beverage",
                    price: 10,
                    quantity: 5
                },
                {
                    product: "Snack",
                    price: 12,
                    quantity: 3
                }
            ],



        }
    },
    methods: {
        cero(e) {
            e.preventDefault();
        },
        onResize(e) {

            let componente = e[0].target.id;
            let valor = e[0].target.style.height.replace("px", "");

            if(componente == 'encabezado')
                this.modelo.oHeader.height = valor;

            if(componente == 'subencabezado')
                this.modelo.oSubHeader.height = valor;
            
            if(componente == 'cuerpo')
                this.modelo.oBody.height = valor;   
                
            if(componente == 'subtotales')
                this.modelo.oSubTotales.height = valor;         
                
            if(componente == 'pie')
                this.modelo.oPie.height = valor;                 

        },
        poneColor(componente, valor) {

            if(componente == 'encabezado')
                this.modelo.oHeader.backcolor = valor;
                
            if(componente == 'subencabezado')
                this.modelo.oSubHeader.backcolor = valor;
            
            if(componente == 'cuerpo')
                this.modelo.oBody.backcolor = valor;   
                
            if(componente == 'subtotales')
                this.modelo.oSubTotales.backcolor = valor;         
                
            if(componente == 'pie')
                this.modelo.oPie.backcolor = valor; 

        },
        mensaje() {

            this.ponerTelon(true);

            funciones.popAlert('success', 'Genero la excel?', false, false, 8000, "Sí, hazlo")
            .then((result) => {

                this.ponerTelon(false);

                if(result == true) {


                    console.log("Ok")


                }


            });
            

        },
        priceFormat(value){
            return value + '€ ';
        },
        ponerTelon(accion){
            this.telon = !accion;
        },
        muestraPDF() {

            try {

                funciones.popAlert('question', 'Deseas obtener un ejemplo del documento?', true, true, 8000, "Sí")
                .then((result) => {

                    if(result==true) {
                        this.ponerTelon(true);

                        funciones.generarPDFmuestra(this.modelo)
                        .then((result) => {

                            if(result.success == 1 && result.status==201) {
                                
                                var objbuilder = '';
                                                    
                                objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
                                objbuilder += (result.data);
                                objbuilder += ('" type="application/pdf" class="internal">');
                                objbuilder += ('<embed src="data:application/pdf;base64,');
                                objbuilder += (result.data);
                                objbuilder += ('" type="application/pdf"/>');
                                objbuilder += ('</object>');

                                var win = window.open("#","_blank");
                                win.document.write('<html><title>'+ this.titulo +'</title><body style="margin-top:0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">');
                                win.document.write(objbuilder);
                                win.document.write('</body></html>');

                                this.mensaje = "Documento generado!";

                            } else {
                                this.mensaje = "Error! No se ha podido generar el documento. Inténtalo más tarde";
                                console.log(result);
                            }

                        }).finally(() => {
                            this.ponerTelon(false);              
                        })

                    }

                })      

            } catch (error) {
                funciones.popAlert('error', 'Ups! No he podido generar el documento!', false, false, 4000);
                console.log(error);
            }

        }        
        



    },
    mounted() {
        this.ro1 = new ResizeObserver(this.onResize).observe(this.$refs.encabezado)
        this.ro2 = new ResizeObserver(this.onResize).observe(this.$refs.subencabezado)
        this.ro3 = new ResizeObserver(this.onResize).observe(this.$refs.cuerpo)
        this.ro4 = new ResizeObserver(this.onResize).observe(this.$refs.subtotales)
        this.ro5 = new ResizeObserver(this.onResize).observe(this.$refs.pie)
        
    },
    beforeUnmount() {
        // this.ro1.unobserve(this.$refs.encabezado)
        // this.ro2.unobserve(this.$refs.subencabezado)
        // this.ro3.unobserve(this.$refs.cuerpo)
        // this.ro4.unobserve(this.$refs.subtotales)
        // this.ro5.unobserve(this.$refs.pie)
    },
    computed: {
        calto:{
            get() {
                let resu = 842;
                if(this.modelo.oMetadatos.orientacion == 'H')
                    resu = 595;
                return resu;
            }
        },
        cancho:{
            get() {
                let resu = 595;
                if(this.modelo.oMetadatos.orientacion == 'H')
                    resu = 842;
                return resu;
            }
        },        
        maxHeader:{
            get() {
                return (this.calto - this.modelo.oSubHeader.height - this.modelo.oBody.height - this.modelo.oSubTotales.height - this.modelo.oPie.height)
            }
        },
        maxSubHeader:{
            get() {
                return (this.calto - this.modelo.oHeader.height - this.modelo.oBody.height - this.modelo.oSubTotales.height - this.modelo.oPie.height)
            }
        },        
        maxBody:{
            get() {
                return (this.calto - this.modelo.oHeader.height - this.modelo.oSubHeader.height - this.modelo.oSubTotales.height - this.modelo.oPie.height)
            }
        },
        maxSubTotales:{
            get() {
                return (this.calto - this.modelo.oHeader.height - this.modelo.oSubHeader.height - this.modelo.oBody.height - this.modelo.oPie.height)
            }
        },        
        maxPie:{
            get() {
                return (this.calto - this.modelo.oHeader.height - this.modelo.oSubHeader.height - this.modelo.oBody.height - this.modelo.oSubTotales.height)
            }
        },
        porceHeader:{
            get() {
                return (this.modelo.oHeader.height / this.calto * 100)
            },
            set(valor) {
                this.modelo.oHeader.height = this.calto * valor / 100
            }            
        },
        maxPorceHeader:{
            get() {
                return (this.maxHeader / this.calto * 100)
            }           
        },        
        porceSubHeader:{
            get() {
                return (this.modelo.oSubHeader.height / this.calto * 100)
            },
            set(valor) {
                this.modelo.oSubHeader.height = this.calto * valor / 100
            }  
        },
        maxPorceSubHeader:{
            get() {
                return (this.maxSubHeader / this.calto * 100)
            }   
        },       
        porceBody:{
            get() {
                return  (this.modelo.oBody.height / this.calto * 100)
            },
            set(valor) {
                this.modelo.oBody.height = this.calto * valor / 100
            }  
        },
        maxPorceBody:{
            get() {
                return (this.maxBody / this.calto * 100)
            }   
        },         
        porceSubTotales:{
            get() {
                return  (this.modelo.oSubTotales.height / this.calto * 100)
            },
            set(valor) {
                this.modelo.oSubTotales.height = this.calto * valor / 100
            }  
        },    
        maxPorceSubTotales:{
            get() {
                return (this.maxSubTotales / this.calto * 100)
            }   
        },                
        porcePie:{
            get() {
                return  (this.modelo.oPie.height / this.calto * 100)
            },
            set(valor) {
                this.modelo.oPie.height = this.calto * valor / 100
            }  
        },        
        maxPorcePie:{
            get() {
                return (this.maxPie / this.calto * 100)
            }   
        },           
    }

}
</script>

<style scoped>

    .card-body {
        width: 100%;
        height: auto;
        overflow: auto;        
    }
    .resizable-content {
        height: 100%;
        width: 100%;
        background-color: aqua;
    }

    .fullpage {
        /* height: 3508px; */
        /* width: 2480px;         */
        /* height: 842px; */
        /* width: 595px; */
        background-color: rgb(213, 213, 213);
        float:right;
        border: 1px solid black;
        text-align: center;
    }
    .fullpage-header {
        /* height: 3508px;        */
        width: 1240px;         
        /* height: 842px; */
        /* width: 595px; */
        background-color: rgb(213, 213, 213);
        float:right;
        border: 1px solid black;
        text-align: center;
    }
    .encabezado {
        width: 100%;
        background-color: rgb(122, 220, 43);
        resize: vertical;
        border: 2px solid black;
    }
    .encabezado p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .subencabezado {
        width: 100%;
        background-color: rgb(216, 36, 75);
        resize: vertical;
        border: 2px solid black;        
    }
    .subencabezado p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .cuerpo {
        width: 100%;
        background-color: rgb(48, 55, 177);
        resize: vertical;
        border: 2px solid black;        
    }
    .cuerpo p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .subtotales {
        width: 100%;
        background-color: rgb(220, 108, 43);
        resize: vertical;
        border: 2px solid black;          
    }
    .subtotales p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .pie {
        width: 100%;
        background-color: rgb(8, 17, 1);
        resize: vertical;
        border: 2px solid black;
    }
    .pie p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }


</style>
