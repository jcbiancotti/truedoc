<template>
<div class="container-fluid">

    <telon :hidden="hiddentelon"/>

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
        <div id="datos-docu" class="container-fluid tab-pane fade show active"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

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
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.titulo" placeholder="Nombre para identificar el documento">
                            </div>
                        </div> 

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) Versi&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.version" placeholder="Versión del documento">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="w-50 text-right pr-4">
                                <label>(*) Orientaci&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left pl-4">
                                <select class="form-control" v-model="this.modelo.oMetadatos.orientacion" @change="changeOrientacion()">
                                    <option value="V">Vertical</option>
                                    <option Value="H">Horizontal</option>
                                </select>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
            </div>

        </div>

        <!-- FORMATO -->
        <div id="datos-formato" class="container-fluid tab-pane fade"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">
                
                <div class="card-header">
                    <h3>Formato del documento</h3>
                </div>
                <div class="card-body">

                    <table class="text-left">
                        <tr>
                            <td>
                                <div class="fullpage" :style="`${'width:' + ancho + 'px;height:' + alto + 'px'}`">

                                    <div ref="encabezado" id="encabezado" class="encabezado" :style="`${'height:' + hHeader + 'px;background-color:' + modelo.oHeader.backcolor}`">
                                       
                                        <img v-if="logopreview && modelo.oHeader.logo.SiNo" 
                                            :src="logopreview" 
                                            :height="`${logoHeight}`" 
                                            :width="`${logoWidth}`" 
                                            :style="`${'position:relative;left:' + (modelo.oHeader.logo.posX) + 'px;top:' + (modelo.oHeader.logo.posY) + 'px'}`"
                                        />                                        
                                         <p>Encabezado</p>
                                        <label class="txt-preview" v-for="txt of modelo.oHeader.textos" :key="txt.id"
                                            :style="`${'top:' + (txt.posY) + 'px;left:' + (txt.posX) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`" 
                                        >
                                            <span v-if="txt.mostrar">{{txt.texto}}</span>
                                        </label>                                         
                                    </div>

                                    <div ref="subencabezado" id="subencabezado" class="subencabezado" :style="`${'height:' + hSubHeader + 'px;background-color:' + modelo.oSubHeader.backcolor}`">
                                        <p>Sub-encabezado</p>
                                    </div>

                                    <div ref="cuerpo" id="cuerpo" class="cuerpo" :style="`${'height:' + hBody + 'px;background-color:' + modelo.oBody.backcolor}`">
                                        <p>Cuerpo</p>
                                    </div>

                                    <div ref="subtotales" id="subtotales" class="subtotales" :style="`${'height:' + hSubTotales + 'px;background-color:' + modelo.oSubTotales.backcolor}`">
                                        <p>Sub-totales</p>
                                    </div>

                                    <div ref="pie" id="pie" class="pie" :style="`${'height:' + hPie + 'px;background-color:' + modelo.oPie.backcolor}`">
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
                                        <input type="number" id="porce-header" name="porce-header" style="width:80px" min="0" :max="maxPorceHeader" v-model="modelo.oHeader.hPorce">%
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
                                        <input type="number" id="porce-subheader" name="porce-subheader" style="width:80px" min="0" :max="maxPorceSubHeader" v-model="modelo.oSubHeader.hPorce">%
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
                                        <input type="number" id="porce-body" name="porce-body" style="width:80px" min="0" :max="maxPorceBody" v-model="modelo.oBody.hPorce">%
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
                                        <input type="number" id="porce-subtotales" name="porce-subtotales" style="width:80px" min="0" :max="maxPorceSubTotales" v-model="modelo.oSubTotales.hPorce">%
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
                                        <input type="number" id="porce-pie" name="porce-Pie" style="width:80px" min="0" :max="maxPorcePie" step="1.00" v-model="modelo.oPie.hPorce">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oPie.backcolor" compo="pie" :destino="poneColor"/>
                                    </td>                                        
                                </tr>  
                                <tr>
                                    <p class="btn" @click="muestraPDF()">Generar documento de muestra</p>

                                </tr>
                            </td>
                        </tr>
                    </table>

                </div>

            </div>
            </div>

        </div>

        <!-- ENCABEZADO -->
        <div id="datos-encabezado" class="container-fluid tab-pane fade"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">
                
                <div class="card-header">
                    <h3>Contenido del encabezado</h3>
                </div>
                <div class="card-body">

                    <div class="contenido-encabezado">
                        <div>
                            <div class="fullpage-header" :style="`${'height:' + hHeader * 2 + 'px;width:' + ancho * 2 + 'px;background-color:' + modelo.oHeader.backcolor}`">

                                <img v-if="logopreview && modelo.oHeader.logo.SiNo" 
                                    :src="logopreview" 
                                    :height="`${logoHeight * 2}`" 
                                    :width="`${logoWidth * 2}`" 
                                    :style="`${'position:absolute;left:' + (modelo.oHeader.logo.posX * 2) + 'px;top:' + (modelo.oHeader.logo.posY * 2) + 'px'}`"
                                />

                                <label class="txt-preview" v-for="txt of modelo.oHeader.textos" :key="txt.id"
                                    :style="`${'top:' + (txt.posY * 2) + 'px;left:' + (txt.posX * 2) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio * 2) + 'pt;color:' + txt.color}`" 
                                >
                                    <span v-if="txt.mostrar">{{txt.texto}}</span>
                                </label>

                            </div> 
                        </div>
                        <div>
                            <div class="img-preview">
                                <img v-if="logopreview" :src="logopreview"  width="100" height="100" />
                                <img v-if="!logopreview" src="@/assets/img/true-logo-vacio.png" width="100" height="100">
                                <p>{{modelo.oHeader.logo.img}}</p>
                            </div>                            
                            <div class="opciones-preview">

                                <table>
                                    <tr>
                                        <td>
                                            <label for="file-logo" class="btn" title="Selecciona la imagen para el logotipo">
                                                Imagen
                                                <i class="far fa-file-image"></i>
                                                <input type="file" id="file-logo" accept=".png,.jpg,.bmp" @change="cargalogo" >
                                            </label>       
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                            <label class="content-input">
                                                <input type="checkbox" v-model="modelo.oHeader.logo.SiNo">Incluir en el encabezado
                                                <i></i>
                                            </label>                                                   
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="logo-alto">Tamaño - Altura</label>
                                        </td>
                                        <td>
                                            <input type="number" id="logo-alto" min='0' max='90' step="1.00" v-model="modelo.oHeader.logo.pHeight">
                                            <label for="logo-alto">% del encabezado</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="logo-ancho">Tamaño - Ancho</label>
                                        </td>
                                        <td>
                                            <input type="number" id="logo-ancho" min='0' max='90' step="1.00" v-model="modelo.oHeader.logo.pWidth">
                                            <label for="logo-ancho">% del ancho del encabezado</label>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="logo-y">Posicion Y</label>
                                        </td>
                                        <td>
                                            <input type="number" id="logo-y" min="0" :max="`${logoMaxY}`" v-model="modelo.oHeader.logo.posY">
                                            <label for="logo-y">desde el margen superior</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="logo-x">Posición X </label>
                                        </td>
                                        <td>
                                            <input type="number" id="logo-X" min="0" :max="`${logoMaxX}`" v-model="modelo.oHeader.logo.posX">
                                            <label for="logo-x"> desde el margen izquierdo</label>  
                                        </td>
                                    </tr>                                    
                                </table>

                            </div>
                        </div>

                    </div>

                    <!-- TEXTOS DEL ENCABEZADO -->
                    <form action @submit.prevent="cero">

                        <div class="text-left">
                            <h3>Textos</h3>
                        </div>
                        <table id="texto-tmp" class="texto-tmp">
                            <tr>
                                <td>
                                    <span>Fuente:<truefuentes id="txtFuente" :valor="txtFuente" @getData="getData"/></span>
                                </td>                                  
                                <td>
                                    <label class="content-input">
                                        <input type="checkbox" v-model="txtEstilo">Negrita
                                        <i></i>
                                    </label>                                    
                                </td>
                                <td>
                                    <label class="content-input">
                                        <input type="checkbox" v-model="txtItalica">It&aacute;lica
                                        <i></i>
                                    </label>                                                                           
                                </td>
                                <td>
                                    <label class="content-input">
                                        <input type="checkbox" v-model="txtSubrayado">Subrayado
                                        <i></i>
                                    </label>       
                                </td>
                                <td>
                                    <span>Color del texto:<truecolor :color="txtColor" compo="txtColorEncabezado" :destino="poneColor"/></span>
                                </td>
                                <td>
                                    <label for="tamanio">Tama&ntilde;o</label>
                                    <input type="number" id="tamanio" min="1" :max="`${hHeader}`" v-model="txtTamanio">
                                </td>                                
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtTexto"
                                        :class="{conerror : hayerror == 1, sinerror : hayerror == 0}"
                                        v-model="txtTexto"
                                        :style="`${'height:auto;font-family:' + txtFuente + ';font-weight:' + cssEstilo + ';font-style: ' + cssItalica + ';text-decoration:' + cssSubrayado + ';font-size:' + txtTamanio + 'pt;color:' + txtColor}`" 
                                        placeholder="Escribe aquí el texto que deseas incluir"
                                    >
                                </td>
                                <td>
                                    <label for="txtPos-y">Posici&oacute;n Y</label>
                                    <input type="number" id="txtPos-y" min="0" :max="`${hHeader - txtTamanio}`" v-model="txtPosY">
                                </td>
                                <td>
                                    <label for="txtPos-x">Posici&oacute;n X</label>
                                    <input type="number" id="txtPos-x" min="0" :max="`${ancho - 10}`" v-model="txtPosX">
                                </td>
                                <td>
                                    <button class="btn float-center" @click="agregarTexto(modelo.oHeader)">Guardar texto
                                        <i class="fas fa-download"></i>
                                    </button>
                                    <button class="btn float-center" @click="resetTexto()">Descartar
                                        <i class="fas fa-undo-alt"></i>
                                    </button>                                    
                                </td>                            
                            </tr>
                        </table>

                        <div class="table-responsive">
                        <table id="textos-encabezado" class="table table-hover">                            
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Visible</th>
                                    <th scope="col">Texto</th>
                                    <th scope="col">Acciones</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="txt of modelo.oHeader.textos" :key="txt.id">
                                    <td scope="row">
                                        <label class="content-input">
                                            <input type="checkbox" v-model="txt.mostrar">
                                            <i></i>
                                        </label>                                                                              
                                    </td>
                                    <td scope="row">
                                        <span
                                            :style="`${'height:auto;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + txt.tamanio + 'pt;color:' + txt.color}`" 
                                        >
                                        {{txt.texto}}</span>
                                    </td>
                                    <td scope="row">
                                        <a @click="borrarTexto(modelo.oHeader, txt.id)"> <i class="far fa-trash-alt fa-2x" style="color:silver" title="Eliminar este texto"></i> </a>
                                    </td>
                                    <td scope="row">
                                        <a @click="editarTexto(modelo.oHeader, txt.id)"> <i class="fa fa-edit fa-2x" style="color:silver" title="Editar este texto"></i> </a>
                                    </td>                                
                                </tr>

                            </tbody>

                        </table>
                        </div>

                    </form>

                </div>

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

import global from '@/utils/global'
import funciones from '@/utils/funciones'
import truecolor from '@/components/visuales/trueColor'
import resize from 'vue-resize-directive'
import telon from '@/components/visuales/telon'
import truefuentes from '@/components/visuales/truefuentes'


export default {
    name: 'NewDoc',
    components:{
        truecolor,
        telon,
        truefuentes,
    },
    directives:{
        resize
    },
    data() {

        return {
            hayerror: 0,
            hiddentelon: true,
            ancho: 595,
            alto: 842,
            docOrientacion: 'V',
            logopreview: null,
            txtID: funciones.generarUUID2(),
            txtEstaba: false,
            txtMostrar: true,
            txtTexto: '',
            txtEstilo: false,
            txtItalica: false,
            txtSubrayado: false,
            txtFuente: 'Open Sans',
            txtTamanio: 18,
            txtColor: '#000000',
            txtPosY: 10,
            txtPosX: 10,
            modelo: {
                oMetadatos: {
                    titulo: '',
                    version: 0,
                    orientacion: 'V',
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
                    textos: [
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Anton € ñÑ áéíóú', fuente: 'anton', tamanio: 10, color: '#FF88AA', estilo: true, italica: true, subrayado: false, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'none', posY: 10, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Oswald € ñÑ áéíóú', fuente: 'oswald', tamanio: 10, color: '#FF8888', estilo: false, italica: true, subrayado: false, cssestilo: 'normal', cssitalica: 'italic', csssubrayado: 'none', posY: 20, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Audiwide € ñÑ áéíóú', fuente: 'audiowide', tamanio: 10, color: '#0000FF', estilo: true, italica: true, subrayado: true, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'underline', posY: 30, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'bunge Inline € ñÑ áéíóú', fuente: 'Bungee+inline', tamanio: 10, color: '#FFCC88', estilo: false, italica: false, subrayado: false, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'none', posY: 40, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Cabin € ñÑ áéíóú', fuente: 'cabin', tamanio: 10, color: '#FF8888', estilo: false, italica: false, subrayado: true, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'underline', posY: 50, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Cookie € ñÑ áéíóú', fuente: 'cookie', tamanio: 10, color: '#FF88AA', estilo: true, italica: true, subrayado: false, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'none', posY: 60, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Dancing Script € ñÑ áéíóú', fuente: 'dancing+script', tamanio: 10, color: '#FF8888', estilo: false, italica: true, subrayado: false, cssestilo: 'normal', cssitalica: 'italic', csssubrayado: 'none', posY: 70, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Lato € ñÑ áéíóú', fuente: 'lato', tamanio: 10, color: '#0000FF', estilo: true, italica: true, subrayado: true, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'underline', posY: 80, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Montserrat € ñÑ áéíóú', fuente: 'montserrat', tamanio: 10, color: '#FFCC88', estilo: false, italica: false, subrayado: false, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'none', posY: 90, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Open Sans € ñÑ áéíóú', fuente: 'open+sans', tamanio: 10, color: '#FF8888', estilo: false, italica: false, subrayado: true, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'underline', posY: 100, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Patua One € ñÑ áéíóú', fuente: 'Patua+One', tamanio: 10, color: '#FF88AA', estilo: true, italica: true, subrayado: false, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'none', posY: 110, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Pt+Sans € ñÑ áéíóú', fuente: 'Pt Sans', tamanio: 10, color: '#FF8888', estilo: false, italica: true, subrayado: false, cssestilo: 'normal', cssitalica: 'italic', csssubrayado: 'none', posY: 120, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Roboto € ñÑ áéíóú', fuente: 'Roboto', tamanio: 10, color: '#0000FF', estilo: true, italica: true, subrayado: true, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'underline', posY: 130, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Roboto Slab € ñÑ áéíóú', fuente: 'Roboto+slab', tamanio: 10, color: '#FFCC88', estilo: false, italica: false, subrayado: false, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'none', posY: 140, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Sofia € ñÑ áéíóú', fuente: 'Sofia', tamanio: 10, color: '#FF8888', estilo: false, italica: false, subrayado: true, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'underline', posY: 150, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Tangerine € ñÑ áéíóú', fuente: 'Tangerine', tamanio: 10, color: '#FF88AA', estilo: true, italica: true, subrayado: false, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'none', posY: 160, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Titan One € ñÑ áéíóú', fuente: 'Titan+One', tamanio: 10, color: '#FF8888', estilo: false, italica: true, subrayado: false, cssestilo: 'normal', cssitalica: 'italic', csssubrayado: 'none', posY: 170, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Trirong € ñÑ áéíóú', fuente: 'Trirong', tamanio: 10, color: '#0000FF', estilo: true, italica: true, subrayado: true, cssestilo: 'bold', cssitalica: 'italic', csssubrayado: 'underline', posY: 180, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Varela Round € ñÑ áéíóú', fuente: 'Varela+Round', tamanio: 10, color: '#FFCC88', estilo: false, italica: false, subrayado: false, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'none', posY: 190, posX: 10},
                        {id:funciones.generarUUID2(), estaba: true, mostrar: true, texto:'Vollkorn € ñÑ áéíóú', fuente: 'Vollkorn', tamanio: 10, color: '#FF8888', estilo: false, italica: false, subrayado: true, cssestilo: 'normal', cssitalica: 'normal', csssubrayado: 'underline', posY: 200, posX: 10},
                    ],
                },
                oSubHeader: {
                    backcolor: "#FFFFFF",
                    height: (842*5/100),  
                    hPorce: 5,              
                },
                oBody: {
                    backcolor: "#FFFFFF",
                    height: (842*55/100),
                    hPorce: 55,                
                },
                oSubTotales: {
                    backcolor: "#FFFFFF",
                    height: (842*5/100), 
                    hPorce: 5,               
                },
                oPie: {
                    backcolor: "#FFFFFF",
                    height: (842*15/100),
                    hPorce: 15,                
                }
            },



        }
    },
    methods: {
        cero(e) {
            e.preventDefault();
        },
        poneColor(componente, valor) {

           if(global.DEBUG)
                console.log('ponerColor Valor recibido del componente', componente, valor);

            if(componente == 'encabezado')
                this.modelo.oHeader.backcolor = valor;

            if(componente == 'txtColorEncabezado')
                this.txtColor = valor;                
                
            if(componente == 'subencabezado')
                this.modelo.oSubHeader.backcolor = valor;
            
            if(componente == 'cuerpo')
                this.modelo.oBody.backcolor = valor;   
                
            if(componente == 'subtotales')
                this.modelo.oSubTotales.backcolor = valor;         
                
            if(componente == 'pie')
                this.modelo.oPie.backcolor = valor; 

        },
        getData(quien, valor) {

            if(global.DEBUG)
                console.log('getData Valor recibido del componente', quien, valor);

            if(quien == 'modelo.oHeader.logo.SiNo')
                this.modelo.oHeader.logo.SiNo = valor;

            if(quien == 'txtFuente')
                this.txtFuente = valor;

            if(quien == 'txtEstilo')
                this.txtEstilo = valor;  
                        
            if(quien == 'txtItalica') 
                this.txtItalica = valor;  

            if(quien == 'txtSubrayado') 
                this.txtSubrayado = valor;  

 
        },
        cargalogo(e) {
            if(e.target.files[0]) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.modelo.oHeader.logo.img = image.name;
                    this.logopreview = e.target.result;
                }
            }
        },
        muestraPDF() {

            try {

                funciones.popAlert('question', 'Deseas obtener un ejemplo del documento?', true, true, 8000, "Sí, por favor")
                .then((result) => {

                    if(result==true) {

                        // Ajustar los height de cada seccion
                        this.modelo.oHeader.height = this.hHeader;
                        this.modelo.oSubHeader.height = this.hSubHeader;
                        this.modelo.oBody.height = this.hBody;
                        this.modelo.oSubTotales.height = this.hSubTotales;
                        this.modelo.oPie.height = this.hPie;

                        this.modelo.oHeader.logo.height = this.logoHeight;
                        this.modelo.oHeader.logo.width = this.logoWidth;

                        this.hiddentelon = false;

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
                            this.hiddentelon = true;              
                        })

                    }

                })      

            } catch (error) {
                funciones.popAlert('error', 'Ups! No he podido generar el documento!', false, false, 4000);
                console.log(error);
            }

        },
        changeOrientacion(){

            funciones.popAlert('question', "Al cambiar la orientación se restablecerá la altura de las secciones del documento y el tamaño del logo a los valores por defecto. ¿Quieres continuar?", true, true, 0, "Ok")
            .then((result) => {

                if(result == true) {

                    if(this.modelo.oMetadatos.orientacion == 'V') {
                        this.alto = 842;
                        this.ancho = 595;
                        this.modelo.oHeader.logo.pHeight = 33;
                        this.modelo.oHeader.logo.pWidth = 10;                        

                    } else {
                        this.alto = 595;
                        this.ancho = 842;                
                        this.modelo.oHeader.logo.pHeight = 50;
                        this.modelo.oHeader.logo.pWidth = 8;                        
                    }
                    this.modelo.oHeader.hPorce = 20;
                    this.modelo.oSubHeader.hPorce = 5;
                    this.modelo.oBody.hPorce = 55;
                    this.modelo.oSubTotales.hPorce = 5;
                    this.modelo.oPie.hPorce = 15;

                    this.modelo.oHeader.logo.posY = 10;
                    this.modelo.oHeader.logo.posX = 10;



                } else {

                    if(this.modelo.oMetadatos.orientacion == 'V') {
                        this.modelo.oMetadatos.orientacion = 'H'; 
                    } else {
                        this.modelo.oMetadatos.orientacion = 'V';    
                    }   

                }

            });

        },
        agregarTexto(objeto) {
            
            if(this.txtTexto == '') {
                this.hayerror = 1;
                return                
            }

            let existe = objeto['textos'].findIndex(x => x.id === this.txtID);

            if(existe == -1) {
                // No existe, se crea
                let idx = funciones.generarUUID2();

                objeto['textos'].push({
                    id: idx, 
                    estaba: false, 
                    mostrar: true, 
                    texto: this.txtTexto, 
                    fuente: this.txtFuente,
                    tamanio: this.txtTamanio,
                    color: this.txtColor, 
                    estilo: this.txtEstilo, 
                    italica: this.txtItalica, 
                    subrayado: this.txtSubrayado, 
                    cssestilo: this.cssEstilo, 
                    cssitalica: this.cssItalica, 
                    csssubrayado: this.cssSubrayado,                     
                    posY: this.txtPosY, 
                    posX: this.txtPosX
                })

            } else {
                // Ya existe, se actualiza
                objeto['textos'][existe].estaba = true; 
                objeto['textos'][existe].mostrar = true; 
                objeto['textos'][existe].texto = this.txtTexto; 
                objeto['textos'][existe].fuente = this.txtFuente;
                objeto['textos'][existe].tamanio = this.txtTamanio;
                objeto['textos'][existe].color = this.txtColor; 
                objeto['textos'][existe].estilo = this.txtEstilo; 
                objeto['textos'][existe].italica = this.txtItalica; 
                objeto['textos'][existe].subrayado = this.txtSubrayado;
                objeto['textos'][existe].cssestilo = this.cssEstilo; 
                objeto['textos'][existe].cssitalica = this.cssItalica; 
                objeto['textos'][existe].csssubrayado = this.cssSubrayado;                 
                objeto['textos'][existe].posY = this.txtPosY; 
                objeto['textos'][existe].posX = this.txtPosX;
            }

            this.resetTexto();
            this.txtID = funciones.generarUUID2();
            this.hayerror = 0;
            document.getElementById('txtTexto').focus();

        },
        borrarTexto(objeto, pId) {

            funciones.popAlert('warning', 'Quieres eliminar este texto?', true, true, 8000, "Sí, bórralo!")
            .then((result) => {

                if(result==true) {
                    objeto['textos'] = objeto['textos'].filter((tx) => {
                        return tx.id != pId; 
                    }) 
                }

            })
        },
        editarTexto(objeto, pId) {

            for(let x=0; x < objeto['textos'].length; x++) {
                if(objeto['textos'][x].id == pId) {
                    // Cargar el texto para edición
                    this.txtID = objeto['textos'][x].id;
                    this.txtEstaba = false;
                    this.txtMostrar = true;
                    this.txtTexto = objeto['textos'][x].texto; 
                    this.txtFuente = objeto['textos'][x].fuente;
                    this.txtTamanio = objeto['textos'][x].tamanio;
                    this.txtColor = objeto['textos'][x].color;
                    this.txtEstilo = objeto['textos'][x].estilo;
                    this.txtItalica = objeto['textos'][x].italica;
                    this.txtSubrayado = objeto['textos'][x].subrayado;
                    this.txtPosY = objeto['textos'][x].posY;
                    this.txtPosX = objeto['textos'][x].posX;

                    break;
                }
            }
        },
        resetTexto() {

            this.txtID = funciones.generarUUID2();
            this.txtEstaba = false;
            this.txtMostrar = true;
            this.txtTexto = ''; 
            this.txtPosY = 10;
            this.txtPosX = 10;
            this.txtEstilo = false;
            this.txtItalica = false;
            this.txtSubrayado = false;
            this.txtTamanio = 18;

            this.hayerror = 0;
            document.getElementById('txtTexto').focus();

        }



    },

    computed: {
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
        logoHeight: {
            get() {
                return this.hHeader * this.modelo.oHeader.logo.pHeight / 100; 
            }
        },
        logoWidth: {
            get() {
                return this.ancho * this.modelo.oHeader.logo.pWidth / 100; 
            }
        },
        logoMaxY: {
            get() {
                return this.hHeader - this.logoHeight - 5;
            }
        }, 
        logoMaxX: {
            get() {
                return this.ancho - this.logoWidth - 5;
            }
        },        
        maxPorceHeader:{
            get() {
                return (100 - this.modelo.oSubHeader.hPorce - this.modelo.oBody.hPorce - this.modelo.oSubTotales.hPorce - this.modelo.oPie.hPorce);
            }           
        },        
        maxPorceSubHeader:{
            get() {
                return (100 - this.modelo.oHeader.hPorce - this.modelo.oBody.hPorce - this.modelo.oSubTotales.hPorce - this.modelo.oPie.hPorce);
            }   
        },       
        maxPorceBody:{
            get() {
                return (100 - this.modelo.oHeader.hPorce - this.modelo.oSubHeader.hPorce - this.modelo.oSubTotales.hPorce - this.modelo.oPie.hPorce);
            }   
        },         
        maxPorceSubTotales:{
            get() {
                return (100 - this.modelo.oHeader.hPorce - this.modelo.oSubHeader.hPorce - this.modelo.oBody.hPorce - this.modelo.oPie.hPorce);
            }   
        },                
        maxPorcePie:{
            get() {
                return (100 - this.modelo.oHeader.hPorce - this.modelo.oSubHeader.hPorce - this.modelo.oBody.hPorce - this.modelo.oSubTotales.hPorce);
            }   
        },     
        hHeader:{
            get() {
                return (this.alto * this.modelo.oHeader.hPorce / 100);
            }           
        },        
        hSubHeader:{
            get() {
                return (this.alto * this.modelo.oSubHeader.hPorce / 100);
            }   
        },       
        hBody:{
            get() {
                return (this.alto * this.modelo.oBody.hPorce / 100);
            }   
        },         
        hSubTotales:{
            get() {
                return (this.alto * this.modelo.oSubTotales.hPorce / 100);
            }   
        },                
        hPie:{
            get() {
                return (this.alto * this.modelo.oPie.hPorce / 100);
            }   
        },               
    },


}
</script>

<style scoped>

    /* *************************** CONTENIDO DEL ENCABEZADO ************************ */
    .contenido-encabezado div { 
        display: block;
        overflow-y: auto;
    }
    .fullpage-header {
        float:left;
        border: 1px solid black;
        text-align: left;
        margin-bottom: 15px;
        position: relative;
    }
    .img-preview {
        width: 20%;
        height: 100%;
        float: left;
        position: relative;
    }
    .txt-preview {
        height:auto;
        position: absolute;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .opciones-preview {
        height: auto;
        background-color: white;
        display: block;
        text-align: start;
        position: relative;
    }
    .opciones-preview input[type="number"] {
        width: 80px;
    }

    #texto-tmp {
        border: 1px solid black;
        background-color: rgb(210,210,210);
        width: 100%;
    }
    #texto-tmp td {
        vertical-align: middle;
        padding: 5px;
        /* border: 1px solid black; */
        align-items: center;
    }
    .texto-tmp input[type="number"] {
        width: 80px;
        margin-left: 5px;
    }

    #textos-encabezado {
        border: 1px solid black;
        width: 100%;

    }
    /* ********************* FORMATO ***************** */
    .fullpage {
        /* height: 3508px; */
        /* width: 2480px;  */
        /* height: 842px;  */
        /* width: 595px;   */
        background-color: rgb(213, 213, 213);
        float:right;
        border: 1px solid black;
        text-align: left;
        
    }

    .encabezado {
        width: 100%;
        border: 2px solid black;
        position: relative;
    }
    .encabezado p {
        text-align: center;  
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .subencabezado {
        width: 100%;
        border: 2px solid black; 
        position: relative;
    }
    .subencabezado p {
        text-align: center;  
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .cuerpo {
        width: 100%;
        border: 2px solid black;  
        position: relative;
    }
    .cuerpo p {
        text-align: center;  
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .subtotales {
        width: 100%;
        border: 2px solid black;   
        position: relative;
    }
    .subtotales p {
        text-align: center;  
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .pie {
        width: 100%;
        border: 2px solid black;
        position: relative;
    }
    .pie p {
        text-align: center;  
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


</style>
