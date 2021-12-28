<template>
<div class="container-fluid">

    <!-- TABS -->
    <ul class="nav nav-pills" role="tablist">
        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#datos-docu">Metadatos</a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#datos-secciones">Formato</a></li>
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

                        <div class="card-title">
                            <nav class="navbar navbar-expand-md navbar-light">
                                <div class="col text-right">
                                    <button id="btnGuardar" class="btn" @click="Grabar()">Grabar <i class="far fa-save"></i></button>
                                </div>                                                
                            </nav>
                        </div>   

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) T&iacute;tulo:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <input type="text" class="form-control" v-model="oMetadatos.titulo">
                            </div>
                        </div> 

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) Versi&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <input type="text" class="form-control" v-model="oMetadatos.version">
                            </div>
                        </div>

                    </form>

                </div>

            </div>

        </div>

        <!-- SECCIONES -->
        <div id="datos-secciones" class="container tab-pane fade"><br>

            <div class="card text-center" style="border: 0px;">
                
                <div class="card-header">
                    <h3>Formato del documento</h3>
                </div>
                <div class="card-body">

                    <!-- ENCABEZADO -->
                    <div class="card text-center">
                        
                        <div class="card-body">

                            <table class="text-left">
                                <tr>
                                    <td>

                                        <tr>
                                            <td>
                                                <input type="number" id="altura-header" name="altura-header" min="0" :max="maxHeader" v-model="oHeader.height">
                                                <label for="altura-header">Altura del encabezado</label><br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="number" id="altura-subheader" name="altura-subheader" min="0" :max="maxSubHeader" v-model="oSubHeader.height">
                                                <label for="altura-subheader">Altura del sub-encabezado</label><br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="number" id="altura-body" name="altura-body" min="0" :max="maxBody" v-model="oBody.height">
                                                <label for="altura-body">Altura del cuerpo</label><br>                                                
                                            </td>
                                        </tr>                                        
                                        
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <input type="number" id="altura-subtotal" name="altura-subtotal" min="0" :max="maxSubTotal" v-model="oSubTotal.height">
                                                <label for="altura-subtotal">Altura del sub-total</label><br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="number" id="altura-pie" name="altura-pie" min="0" :max="maxPier" v-model="oPie.height">
                                                <label for="altura-pie">Altura del pie</label><br>                                                
                                            </td>
                                        </tr>  


                                    </td>

                                    <td>
                                        <img id="logoimg" src="@/assets/img/true-logo.png" width="100" height="100">
                                    </td>
                                    <td>
                                        <input type="checkbox" id="logo" name="logo" v-model="oHeader.logo.SiNo">
                                        <label for="logo">Incluir logo en el encabezado</label><br>
                                    </td>
                                </tr>


                            </table>

                        </div>
                        <div class="fullpage" dropzone="true" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

                            <div class="encabezado" :style="`${'height:' + oHeader.height + 'px'}`">
                                <img id="logoimg" v-if="oHeader.logo.SiNo" src="@/assets/img/true-logo.png" width="24" height="24" @dragstart="startDrag($event)">
                            </div>

                            <div class="subencabezado" :style="`${'height:' + oSubHeader.height + 'px'}`"></div>

                            <div class="cuerpo" :style="`${'height:' + oBody.height + 'px'}`"></div>

                            <div class="subtotales" :style="`${'height:' + oSubTotal.height + 'px'}`"></div>

                            <div class="pie" :style="`${'height:' + oPie.height + 'px'}`"></div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </div>



</div>
</template>

<script>
export default {
    name: 'NewDoc',
    data() {
        return {
            oMetadatos: {
                titulo: '',
                version: 0
            },
            oHeader: {
                backcolor: "rgb(146, 181, 224)",
                height: 200,
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
                backcolor: "rgb(146, 181, 224)",
                height: 50,                
            },
            oBody: {
                backcolor: "rgb(146, 181, 224)",
                height: 600,                
            },
            oSubTotal: {
                backcolor: "rgb(146, 181, 224)",
                height: 50,                
            },
            oPie: {
                backcolor: "rgb(146, 181, 224)",
                height: 150,                
            },

        }
    },
    methods: {
        cero(e) {
            e.preventDefault();
        },
        startDrag (evt) {

            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('id', evt.target.id)
            console.log(evt, evt.target);

        },
        onDrop (evt) {
            
            const id = evt.dataTransfer.getData('id')
            
            document.getElementById(id).style="position: fixed; top:" + evt.clientY + "px"
            document.getElementById(id).style="position: fixed; left:" + evt.clientX + "px"

            console.log(evt.clientX, evt.clientY, id);


        }


    },
    computed: {
        maxHeader:{
            get() {
                return (842 - this.oSubHeader.height - this.oBody.height - this.oSubTotal.height - this.oPie.height)
            }
        },
        maxSubHeader:{
            get() {
                return (842 - this.oHeader.height - this.oBody.height - this.oSubTotal.height - this.oPie.height)
            }
        },        
        maxBody:{
            get() {
                return (842 - this.oHeader.height - this.oSubHeader.height - this.oSubTotal.height - this.oPie.height)
            }
        },
        maxSubTotal:{
            get() {
                return (842 - this.oHeader.height - this.oSubHeader.height - this.oBody.height - this.oPie.height)
            }
        },        
        maxPie:{
            get() {
                return (842 - this.oHeader.height - this.oSubHeader.height - this.oBody.height - this.oSubTotal.height)
            }
        }        
    }   



}
</script>

<style scoped>

    .fullpage {
        /* height: 3508px;
        width: 2480px;         */
        height: 842px;
        width: 595px;
        background-color: rgb(238, 228, 228);
        float:right;
        border: 1px solid black;
    }

    .encabezado {
        width: 100%;
        background-color: rgb(122, 220, 43)
    }

    .subencabezado {
        width: 100%;
        background-color: rgb(216, 36, 75)
    }

    .cuerpo {
        width: 100%;
        background-color: rgb(48, 55, 177)
    }

    .subtotales {
        width: 100%;
        background-color: rgb(220, 108, 43)
    }

    .pie {
        width: 100%;
        background-color: rgb(8, 17, 1)
    }

    .card-body {
        height: 150px;
        text-align: center;

    }




</style>
