<template>
<div class="container-fluid">

    <form action @submit.prevent="cero">

        <table>
            <tr>

                <td class="align-top text-left" style="width:25%;">
                    <span>Fuente:</span>
                    <truefuentes id="txtFuente" :valor="txtFuente" @getData="getData"/>
                </td> 

                <td class=" align-top align-text-top text-left" style="width:15%;">
                    <label class="content-input">
                        <input type="checkbox" v-model="txtEstilo" :disabled="!enbEstilo">Negrita
                        <i></i>
                        <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="z-index:9999" v-if="!enbEstilo">No</span>
                    </label>  
                </td>
                <td class="align-top text-left" style="width:15%;">
                    <label class="content-input">
                        <input type="checkbox" v-model="txtItalica" :disabled="!enbItalica">It&aacute;lica
                        <i></i>
                        <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="z-index:9999" v-if="!enbItalica">No</span>
                    </label>
                </td>
                <td class="align-top text-left" style="width:15%;">
                    <label class="content-input" style="display:block">Subrayado
                        <input type="checkbox" v-model="txtSubrayado">
                        <i></i>
                    </label>       
                </td>
                <td class="align-top" style="width:15%;">
                    <span>Color del texto:</span>
                    <truecolor :color="txtColor" compo="txtColorEncabezado" :destino="poneColor"/>
                </td>
                <td class="align-top" style="width:15%;">
                    <span>Tama&ntilde;o (pts.):</span>
                    <input ref="tamanio" id="tamanio" type="number" class="form-control" style="width:100%;" min="1" :max="`${modelo.oHeader.height}`" v-model="txtTamanio">
                </td>                                
            </tr>
            <tr>
                <td colspan="3" class="align-top text-left">
                    <span>Literal del texto:</span>
                    <div style="height: auto;overflow: hidden;">
                        <input type="text" id="txtTexto" v-model="txtTexto" 
                            :style="`${
                                'height:100%' +
                                ';width:100%' +
                                ';font-family:' + txtFuente + 
                                ';font-weight:' + cssEstilo + 
                                ';font-style:' + cssItalica + 
                                ';text-decoration:' + cssSubrayado + 
                                ';font-size:' + txtTamanio + 'pt;color:' + txtColor + 
                                ';background-color:' + txtBkColor}`" 
                            placeholder="Escribe aquí el texto que deseas incluir" 
                        >
                    </div>                    
                </td>
                <td>
                    <div class="input-group">
                        <div style="width:100%;">
                            <span>Posici&oacute;n Y</span>
                            <input type="number" id="txtPos-y"  class="form-control" style="width:100%;" min="0" :max="`${modelo.oHeader.height - txtTamanio}`" v-model="txtPosY">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="input-group">
                        <div style="width:100%;">
                            <span>Posici&oacute;n X</span>
                            <input type="number" id="txtPos-x"  class="form-control" style="width:100%;" min="0" :max="`${modelo.oMetadatos.ancho - 10}`" v-model="txtPosX">
                        </div>
                    </div>
                </td>
                <td>
                    <span @click="agregarTexto(modelo)" class="iconos inline-icon btn-img material-icons" title="Agregar a la lista">save_alt</span>
                    <span @click="resetTexto()" class="iconos inline-icon btn-img material-icons" title="Descartar">clear</span>
                </td>                            
            </tr>
            <tr>
                <td colspan="6">
                    <p style="font-size: 8pt;">Para indicar que es un campo de una tabla debes encerrarlo entre corchetes. Por ejemplo: Fecha [facturas.fecha_factura]</p>
                </td>
            </tr>
        </table>

        <!-- <div class="table-responsive"> -->
        <div class="tableFixHead table-responsive">
        <table >                           
            <thead>
                <tr>
                    <th scope="col">Visible</th>
                    <th scope="col">Texto</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>

            <tr v-for="txt of modelo[objeto].textos" :key="txt.id">
                <td>
                    <label class="content-input">
                        <input type="checkbox" v-model="txt.mostrar">
                        <i></i>
                    </label>                                                                              
                </td>
                <td>
                    <p :style="`${'max-width:100%;height:auto;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + txt.tamanio + 'pt;color:' + txt.color + ';background-color:' + txtBkColor}`">
                        {{txt.texto}}
                    </p>
                </td>
                <td>
                    <span @click="borrarTexto(txt.id)" class="iconos inline-icon btn-img material-icons" title="Eliminar de la lista">delete</span>
                    <span @click="editarTexto(txt.id)" class="iconos inline-icon btn-img material-icons" title="Editar este registro">mode_edit</span>
                </td>
            </tr>

        </table>
        </div>

    </form>

</div>
</template>

<script>
import global from '@/utils/global'
import funciones from '@/utils/funciones'
import truecolor from '@/components/visuales/trueColor'
import truefuentes from '@/components/visuales/truefuentes'

export default {
    name: 'Textos',
    data() {
        return {
            hayerror: 0,
            txtID: funciones.generarUUID2(),
            txtEstaba: false,
            txtMostrar: true,
            txtTexto: '',
            txtEstilo: false,
            enbEstilo: true,
            txtItalica: false,
            enbItalica: true,
            txtSubrayado: false,
            txtFuente: 'roboto',
            txtTamanio: 12,
            txtColor: '#000000',
            txtPosY: 10,
            txtPosX: 10,    
            
        }
    },
    components:{
        truecolor,
        truefuentes,
    },
    props:{
        objeto: String,
        modelo: Object
    },
    methods: {
        cero(e) {
            e.preventDefault();
        },
        poneColor(componente, valor) {

           if(global.DEBUG)
                console.log('ponerColor Valor recibido del componente', componente, valor);

            if(componente == 'txtColorEncabezado')
                this.txtColor = valor;                
                

        },
        getData(quien, valor, b, i) {

            if(global.DEBUG)
                console.log('getData Valor recibido del componente', quien, valor, b, i);

            if(quien == 'txtFuente') {
                this.txtFuente = valor;
                this.enbEstilo = b;
                this.enbItalica = i;

                if(this.enbEstilo == false) {
                    this.txtEstilo = false;
                }
                if(this.enbEstilo == false) {
                    this.txtItalica = false;
                }

            }

            if(quien == 'txtEstilo')
                this.txtEstilo = valor;  
                        
            if(quien == 'txtItalica') 
                this.txtItalica = valor;  

            if(quien == 'txtSubrayado') 
                this.txtSubrayado = valor;  

 
        },
        getModelo() {
            return funciones.getModelo(this.campoTipo, this.campoAncho);
        },        
        agregarTexto(pObjeto) {
            
            if(this.txtTexto == '') {
                this.hayerror = 1;
                return                
            }
            
            this.txtPreview = funciones.getPreview(this.modelo.oCampos, this.txtTexto);

             let existe = pObjeto[this.objeto]['textos'].findIndex(x => x.id === this.txtID);

            if(existe == -1) {
                // No existe, se crea
                let idx = funciones.generarUUID2();

                pObjeto[this.objeto]['textos'].push({
                    id: idx, 
                    estaba: false, 
                    mostrar: true, 
                    texto: this.txtTexto, 
                    fuente: this.txtFuente,
                    tamanio: this.txtTamanio,
                    color: this.txtColor, 
                    estilo: this.txtEstilo, 
                    enbEstilo: this.enbEstilo,
                    italica: this.txtItalica, 
                    enbItalica: this.enbItalica,
                    subrayado: this.txtSubrayado, 
                    cssestilo: this.cssEstilo, 
                    cssitalica: this.cssItalica, 
                    csssubrayado: this.cssSubrayado,                     
                    posY: this.txtPosY, 
                    posX: this.txtPosX,
                    preview: this.txtPreview
                })

            } else {
                // Ya existe, se actualiza
                pObjeto[this.objeto]['textos'][existe].estaba = this.estaba; 
                pObjeto[this.objeto]['textos'][existe].mostrar = this.txtMostrar; 
                pObjeto[this.objeto]['textos'][existe].texto = this.txtTexto; 
                pObjeto[this.objeto]['textos'][existe].fuente = this.txtFuente;
                pObjeto[this.objeto]['textos'][existe].tamanio = this.txtTamanio;
                pObjeto[this.objeto]['textos'][existe].color = this.txtColor; 
                pObjeto[this.objeto]['textos'][existe].estilo = this.txtEstilo; 
                pObjeto[this.objeto]['textos'][existe].enbEstilo = this.enbEstilo; 
                pObjeto[this.objeto]['textos'][existe].italica = this.txtItalica; 
                pObjeto[this.objeto]['textos'][existe].enbItalica = this.enbItalica; 
                pObjeto[this.objeto]['textos'][existe].subrayado = this.txtSubrayado;
                pObjeto[this.objeto]['textos'][existe].cssestilo = this.cssEstilo; 
                pObjeto[this.objeto]['textos'][existe].cssitalica = this.cssItalica; 
                pObjeto[this.objeto]['textos'][existe].csssubrayado = this.cssSubrayado;                 
                pObjeto[this.objeto]['textos'][existe].posY = this.txtPosY; 
                pObjeto[this.objeto]['textos'][existe].posX = this.txtPosX;
                pObjeto[this.objeto]['textos'][existe].preview = this.txtPreview;
            }

            this.txtID = funciones.generarUUID2();
            this.hayerror = 0;
            this.resetTexto();

        },
        borrarTexto(pId) {

            funciones.popAlert('warning', 'Quieres eliminar este texto?', true, true, 8000, "Sí, bórralo!")
            .then((result) => {

                let tmp = [];
                if(result==true) {

                    tmp = this.modelo[this.objeto]['textos'].filter((tx) => {
                        return tx.id != pId; 
                    }) 

                    this.$emit("getData", "textos", this.objeto, tmp);

                    this.resetTexto();

                }

            })
        },
        editarTexto(pId) {

            let x = this.modelo[this.objeto]['textos'].findIndex(x => x.id === pId)

            // Cargar el texto para edición
            this.txtID = this.modelo[this.objeto]['textos'][x].id;
            this.txtEstaba = this.modelo[this.objeto]['textos'][x].estaba;
            this.txtMostrar = this.modelo[this.objeto]['textos'][x].mostrar;
            this.txtTexto = this.modelo[this.objeto]['textos'][x].texto; 
            this.txtFuente = this.modelo[this.objeto]['textos'][x].fuente;
            this.txtTamanio = this.modelo[this.objeto]['textos'][x].tamanio;
            this.txtColor = this.modelo[this.objeto]['textos'][x].color;
            this.txtEstilo = this.modelo[this.objeto]['textos'][x].estilo;
            this.txtItalica = this.modelo[this.objeto]['textos'][x].italica;
            this.txtSubrayado = this.modelo[this.objeto]['textos'][x].subrayado;
            this.txtPosY = this.modelo[this.objeto]['textos'][x].posY;
            this.txtPosX = this.modelo[this.objeto]['textos'][x].posX;
            this.txtPreview = this.modelo[this.objeto]['textos'][x].preview;

            let fte = funciones.datosFuente(this.txtFuente);
            this.enbEstilo = fte.b;
            this.enbItalica = fte.i;

            if(fte.b == false) {
                this.txtEstilo = false;
            }
            if(fte.i == false) {
                this.txtItalica = false;
            }

        },
        resetTexto() {

            let tmpFte = funciones.datosFuente(this.txtFuente, false);

            this.enbEstilo = tmpFte.b;
            this.enbItalica = tmpFte.i;

            if(this.enbEstilo == false) {
                this.txtEstilo = false;
            }
            if(this.enbEstilo == false) {
                this.txtItalica = false;
            }

            this.txtID = funciones.generarUUID2();
            this.txtEstaba = false;
            this.txtMostrar = true;
            this.txtTexto = ''; 
            this.txtPosY = 10;
            this.txtPosX = 10;
            // this.txtEstilo = false;
            // this.enbEstilo = true;
            // this.txtItalica = false;
            // this.enbItalica = true;
            this.txtSubrayado = false;
            this.txtTamanio = 12;
            this.txtPreview = '';

            this.hayerror = 0;

            document.getElementById('txtTexto').focus();

        },
      


    },
    computed: {
        txtBkColor: {
            get() {
                return this.modelo[this.objeto].backcolor;
            }
        },
        cssEstilo: {
            get() {
                if(this.txtEstilo == true) {
                    return 'bold';
                } else {
                    return 'normal';
                }
            }
        },
        cssItalica: {
            get() {
                if(this.txtItalica == true) {
                    return 'italic';
                } else {
                    return 'normal';
                }
            }
        },
        cssSubrayado: {
            get() {
                if(this.txtSubrayado == true) {
                    return 'underline';
                } else {
                    return 'none';
                }
            }
        },        
    }


}
</script>

<style>

</style>

