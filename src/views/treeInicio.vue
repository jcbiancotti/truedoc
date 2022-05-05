<template>

<div class="inicio">

    <telon :hidden="hiddentelon"/>

    <div class="wrapper text-start">

        <!-- LISTA DE PLANTILLAS -->
        <nav id="main-tree">
    
            <div class="card-body">

                <!-- NIVEL 0 -->
                <ul class="nivel0">

                    <!-- Opciones del submenu NIVEL 0 -->
                    <div v-for="item1 of aDocumentos" :key="item1.id">
                    <li>

                        <p>
                            <span class="iconos inline-icon btn-img material-icons">radio_button_unchecked</span>
                            {{item1.titulo}} (v.{{item1.version}})
                            <span @click="Editar(item1.id)" class="iconos inline-icon btn-img material-icons">edit</span>
                            <span @click="Borrar(item1.id)" class="iconos inline-icon btn-img material-icons">delete</span>
                            <span @click="Clonar(item1.id)" class="iconos inline-icon btn-img material-icons">content_copy</span>
                            
                        </p>

                    </li>
                    </div>

                </ul>

            </div>

        </nav>

    </div>


</div>

</template>

<script>

import funciones from '@/utils/funciones'
import datos from '@/utils/datos'
import telon from '@/components/visuales/telon'

export default {
    name: 'Home',
    data(){
        return {
            hiddentelon: true,
            aDocumentos: [],
            // Modelo del documento
            modelo: {
                oMetadatos: {
                    docuId: '', 
                    titulo: '',
                    version: 0,
                    activa: false,
                    orientacion: 'V',
                    ancho: 595,
                    alto: 842,
                },
                oHeader: {
                    backcolor: "#FFFFFF",
                    height: (842*20/100),
                    hPorce: 20,
                    logo: {
                        SiNo: false,
                        posY: 10,
                        posX: 10,
                        height: 100,
                        width: 100,
                        img: '',
                        pHeight: 33,
                        pWidth: 10,
                    },
                    textos: [],
                },
                oSubHeader: {
                    backcolor: "#FFFFFF",
                    height: (842*5/100),  
                    hPorce: 5,
                    textos: [],
                },
                oBody: {
                    backcolor: "#FFFFFF",
                    height: (842*55/100),
                    hPorce: 55,   
                    textos: [], 
                },
                oSubTotales: {
                    backcolor: "#FFFFFF",
                    height: (842*5/100), 
                    hPorce: 5,  
                    textos: [],
                },
                oPie: {
                    backcolor: "#FFFFFF",
                    height: (842*15/100),
                    hPorce: 15,
                    textos: [],
                },
                oCampos: [],

            },

        }
    },
    components:{
        telon,

    },
    methods: {
        leerDocumentos() {

            try {

                this.aDocumentos = [];

                this.hiddentelon = false;

                datos.leerLista("sys_documentos", "true", ["clave","id", "titulo","version","activa"], "")
                .then((result) => {

                    if(global.DEBUG)
                        console.log("leerDocumentos", "datos devueltos datos.leerLista", result);


                    if(result.success == 1) {

                        if(result.status == 200) {

                            for(let x = 0; x < result.data.length; x++) {

                                let act = false;
                                if(result.data[x].activa == 1) {
                                    act = true;
                                }
                                
                                this.aDocumentos.push({
                                    clave: result.data[x].clave,
                                    id: result.data[x].id,
                                    titulo: result.data[x].titulo,
                                    version:result.data[x].version,
                                    activa:result.data[x].activa,
                                    isActiva: act
                                });
                                
                            }

                        } 

                    }

                }).finally(() => {
                    this.hiddentelon = true;
                });

            } catch(error) {
                console.log(error)
            }


        },
        Editar(pId) {
            this.$router.push("/editdoc/" + pId)
        },    
        Borrar(pId) {

            funciones.popAlert('warning', 'Quieres borrar la definición de este documento?', true, true, 8000, "Sí, bórralo!")
            .then((result) => {

                if(result==true) {

                    try {

                        this.hiddentelon = false;

                        datos.borrarDocumento("id='" + pId + "'")
                        .then((result) => {

                            if(result.success == 1 && result.status == 200) {
                                funciones.popAlert('success', 'Documento eliminado!', false, false, 3000, "Ok")
                                .then(() => {
                                    this.leerDocumentos();
                                })

                            } else {
                                funciones.popAlert('error', 'No se ha podido eliminar el documento en este momento', true, false, 8000, "Ok")
                            }

                        }).finally(() => {
                            this.hiddentelon = true;
                        })
                        
                    } catch (error) {
                        console.log(error);
                    }
                    
                }

            })

        },
        Clonar(pId) {

            funciones.popAlert('question', 'Quieres hacer una copia de la definición de este documento?', true, true, 8000, "Sí, cópialo")
            .then((result) => {

                if(result==true) {

                    this.hiddentelon = false; 

                    try {

                        datos.leerLista('sys_documentos', "id='" + pId + "'", ['objeto'], '')
                        .then((result) => {

                            if(result.success == 1 && result.status == 200) {

                                this.modelo = JSON.parse(result.data[0].objeto.split('&quot;').join('"'));

                                if(this.modelo.oHeader.logo.img != '') {

                                    funciones.rutaAdjunto("SYS" + this.modelo.oMetadatos.docuId + this.modelo.oHeader.logo.img)
                                    .then((result) => {

                                        if(result.success == 1 && result.status == 200) {
                                            this.logopreview = result.data[0];

                                            console.log("Ruta Lectura", this.logopreview);

                                        }

                                    }) 

                                }

                                let tmp = this.modelo;
                            
                                tmp.oMetadatos.docuId = funciones.generarUUID2();
                                tmp.oMetadatos.titulo = "Copia de " + this.modelo.oMetadatos.titulo;
                                tmp.oMetadatos.version = 0;
                                tmp.oMetadatos.activa = false;

                                // Almacenar propiedades del documento
                                let almacenar = {id: tmp.oMetadatos.docuId, titulo: tmp.oMetadatos.titulo, version: tmp.oMetadatos.version, activa: tmp.oMetadatos.activa, objeto: JSON.stringify(this.modelo, null, '\t')};
                                datos.grabarDocumento(almacenar)
                                .then(() => {

                                    // Subir imagen del logo
                                    if(this.modelo.oHeader.logo.img) {

                                        let nRuta = 'SYS' + this.modelo.oMetadatos.docuId;

                                        funciones.readAsBlob(this.logopreview, this.modelo.oHeader.logo.img)
                                        .then((result) =>{
                                                
                                            console.log("In promise", nRuta, result);

                                            funciones.subirAdjunto(nRuta, result)
                                            .then((result) => {

                                                if(result.success == 1 && result.status == 200) {

                                                    funciones.popAlert("success", "Datos almacenados!", true, false, 3000, "ok")
                                                    .then(() => {
                                                        this.leerDocumentos();
                                                    })

                                                } else {
                                                    funciones.popAlert("error", "No se ha podido grabar en este momento! (ce001)", true, false, 3000, "ok");
                                                }

                                            })

                                        });


                                    } else {

                                        funciones.popAlert("success", "Nuevo documento creado!", false, false, 3000, "ok")
                                        .then(() => {
                                            this.leerDocumentos();
                                        });

                                    }

                                })

                            }

                        }).finally(() => {
                            this.hiddentelon = true;
                        })

                    } catch(error) {
                        console.log(error);
                    }

                }

            })

        },

    },
    mounted() {
        this.leerDocumentos();

    }

}
</script>
