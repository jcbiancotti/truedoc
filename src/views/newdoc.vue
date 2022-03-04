<template>
<div class="container-fluid">

    <telon :hidden="hiddentelon"/>

    <h1 v-if="claveId != null">Editando documento: {{claveId}}</h1>
    <!-- TABS -->
    <ul class="nav nav-pills" role="tablist">
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 1}" @click="tab=1" data-toggle="tab" href="#datos-docu">Metadatos</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 2}" @click="tab=2" data-toggle="tab" href="#datos-formato">Secciones</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 3}" @click="tab=3" data-toggle="tab" href="#datos-encabezado">Contenido del encabezado</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 4}" @click="tab=4" data-toggle="tab" href="#datos-subencabezado">Contenido del sub-encabezado</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 5}" @click="tab=5" data-toggle="tab" href="#datos-cuerpo">Contenido del cuerpo</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 6}" @click="tab=6" data-toggle="tab" href="#datos-subtotales">Contenido del subt-total</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 7}" @click="tab=7" data-toggle="tab" href="#datos-pie">Contenido del pie</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 8}" @click="tab=8" data-toggle="tab" href="#datos-campos">Campos utilizados</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active : tab == 9}" @click="Grabar()">Grabar</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">

        <!-- METADATOS -->
        <div id="datos-docu" class="container-fluid tab-pane fade " :class="{show : tab == 1, active : tab == 1}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

                <div class="card-header">
                    <h3>Metadatos</h3>
                </div>
                <div class="card-body">

                    <form action @submit.prevent="cero">

                        <div class="form-group row" style="color: silver;">{{modelo.oMetadatos.docuId}}</div>

                        <div class="input-group">
                            <div class="w-50 text-right">
                                <label>(*) T&iacute;tulo:</label>
                            </div>
                            <div class="w-50 text-left">
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.titulo" placeholder="Nombre para identificar el documento" :class="{conerror : hayerror == 3, sinerror : hayerror == 0}">
                            </div>
                        </div> 

                        <div class="input-group">
                            <div class="w-50 text-right">
                                <label>(*) Versi&oacute;n:</label>
                            </div>
                            <div class="w-50 text-left">
                                <input type="text" class="form-control" v-model="modelo.oMetadatos.version" placeholder="Versión del documento" :class="{conerror : hayerror == 3, sinerror : hayerror == 0}">
                            </div>
                        </div>

                        <div class="input-group p-2">
                            <div class="w-50 text-right">
                                <label>Versión activada:</label>
                            </div>
                            <div class="w-50 text-left">
                                <label class="content-input">
                                    <input type="checkbox" v-model="modelo.oMetadatos.activa">
                                    <i></i>
                                </label>    
                                <span>(Se utilizará la versión activada de mayor valor)</span>
                            </div>
                        </div>

                        <div class="input-group">
                            <div class="w-50 text-right">
                                <label>(*) Orientaci&oacute;n:</label>
                            </div>
                            <div class="w-50">
                                <select class="form-select" v-model="this.modelo.oMetadatos.orientacion" @change="changeOrientacion()">
                                    <option value="V">Vertical</option>
                                    <option Value="H">Horizontal</option>
                                </select>
                                <p style="color: silver;">Alto:{{modelo.oMetadatos.alto}}pt. x Ancho:{{modelo.oMetadatos.ancho}}pt.</p>
                            </div>

                        </div>

                    </form>

                </div>

            </div>
            </div>

        </div>

        <!-- FORMATO -->
        <div id="datos-formato" class="container-fluid tab-pane fade" :class="{show : tab == 2, active : tab == 2}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">
                
                <div class="card-header">
                    <h3>Formato del documento</h3>
                </div>
                <div class="card-body">

                    <table class="text-left">
                        <tr>
                            <td>
                                <div class="fullpage" :style="`${'width:' + modelo.oMetadatos.ancho / 2 + 'px;height:' + modelo.oMetadatos.alto / 2 + 'px'}`">

                                    <!-- ENCABEZADO -->
                                    <div @click="enfoca('E')" ref="encabezado" id="encabezado" class="encabezado" :style="`${'height:' + hHeader / 2 + 'px;background-color:' + modelo.oHeader.backcolor}`">
                                       
                                        <img v-if="logopreview && modelo.oHeader.logo.SiNo" 
                                            :src="logopreview" 
                                            :height="`${logoHeight / 2}`" 
                                            :width="`${logoWidth / 2}`" 
                                            :style="`${'position:relative;left:' + (modelo.oHeader.logo.posX / 2) + 'px;top:' + (modelo.oHeader.logo.posY / 2) + 'px'}`"
                                        />                                        
                                         <p>Encabezado</p>
                                        <label class="txt-preview" v-for="txt of modelo.oHeader.textos" :key="txt.id"
                                            :style="`${'width:' + (modelo.oMetadatos.ancho - txt.posX - 5) / 2 + 'px;top:' + (txt.posY / 2) + 'px;left:' + (txt.posX / 2) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio / 2) + 'pt;color:' + txt.color}`" 
                                        >
                                            <span v-if="txt.mostrar">{{txt.preview}}</span>
                                        </label>                                         
                                    </div>
                                    <!-- SUB-ENCABEZADO -->
                                    <div @click="enfoca('SE')" ref="subencabezado" id="subencabezado" class="subencabezado" :style="`${'height:' + hSubHeader / 2 + 'px;background-color:' + modelo.oSubHeader.backcolor}`">
                                        <p>Sub-encabezado</p>
                                        <label class="txt-preview" v-for="txt of modelo.oSubHeader.textos" :key="txt.id"
                                            :style="`${'width:' + (modelo.oMetadatos.ancho - txt.posX - 5) / 2 + 'px;top:' + (txt.posY / 2) + 'px;left:' + (txt.posX / 2) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio / 2) + 'pt;color:' + txt.color}`" 
                                        >
                                            <span v-if="txt.mostrar">{{txt.preview}}</span>
                                        </label>                                         
                                    </div>
                                    <!-- CUERPO -->
                                    <div @click="enfoca('B')" ref="cuerpo" id="cuerpo" class="cuerpo" :style="`${'height:' + (hBody / 2) + 'px;background-color:' + modelo.oBody.backcolor}`">
                                        <p>Cuerpo</p>

                                        <table>
                                            <tr v-for="n in 15" :key="n" class="renglon" style="height:8px">

                                                <td>

                                                    <div v-for="txt of modelo.oBody.textos" :key="txt.id" class="col-preview" :style="`${'left:' + (txt.posX / 2) + 'px;top:' + (txt.posY / 2) + 'px;'}`" >

                                                        <span v-if="txt.mostrar" :style="`${'width:auto;top:0px;left:0;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio / 2) + 'pt;color:' + txt.color}`">
                                                            {{txt.preview}}
                                                        </span>

                                                    </div>
                                                    
                                                </td>

                                            </tr>
                                        </table>

                                    </div>
                                    <!-- SUBTOTALES -->
                                    <div @click="enfoca('ST')" ref="subtotales" id="subtotales" class="subtotales" :style="`${'height:' + hSubTotales / 2 + 'px;background-color:' + modelo.oSubTotales.backcolor}`">
                                        <p>Sub-totales</p>
                                        <label class="txt-preview" v-for="txt of modelo.oSubTotales.textos" :key="txt.id"
                                            :style="`${'width:' + (modelo.oMetadatos.ancho - txt.posX - 5) / 2 + 'px;top:' + (txt.posY / 2) + 'px;left:' + (txt.posX / 2) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio / 2) + 'pt;color:' + txt.color}`" 
                                        >
                                            <span v-if="txt.mostrar">{{txt.preview}}</span>
                                        </label>                                          
                                    </div>
                                    <!-- PIE -->
                                    <div @click="enfoca('P')" ref="pie" id="pie" class="pie" :style="`${'height:' + hPie / 2 + 'px;background-color:' + modelo.oPie.backcolor}`">
                                        <p>Pie del documento</p>
                                        <label class="txt-preview" v-for="txt of modelo.oPie.textos" :key="txt.id"
                                            :style="`${'width:' + (modelo.oMetadatos.ancho - txt.posX - 5) / 2 + 'px;top:' + (txt.posY / 2) + 'px;left:' + (txt.posX / 2) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio / 2) + 'pt;color:' + txt.color}`" 
                                        >
                                            <span v-if="txt.mostrar">{{txt.preview}}</span>
                                        </label>                                         
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
                                        <input ref="porceheader" type="number" id="porce-header" name="porce-header" style="width:80px" min="0" :max="maxPorceHeader" v-model="modelo.oHeader.hPorce">%
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
                                        <input ref="porcesubheader" type="number" id="porce-subheader" name="porce-subheader" style="width:80px" min="0" :max="maxPorceSubHeader" v-model="modelo.oSubHeader.hPorce">%
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
                                        <input ref="porcebody" type="number" id="porce-body" name="porce-body" style="width:80px" min="0" :max="maxPorceBody" v-model="modelo.oBody.hPorce">%
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
                                        <input ref="porcesubtotales" type="number" id="porce-subtotales" name="porce-subtotales" style="width:80px" min="0" :max="maxPorceSubTotales" v-model="modelo.oSubTotales.hPorce">%
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
                                        <input ref="porcepie" type="number" id="porce-pie" name="porce-Pie" style="width:80px" min="0" :max="maxPorcePie" step="1.00" v-model="modelo.oPie.hPorce">%
                                    </td>
                                    <td>
                                        <truecolor :color="modelo.oPie.backcolor" compo="pie" :destino="poneColor"/>
                                    </td>                                        
                                </tr>  
                                <tr>
                                    <p class="btn" @click="muestraPDF()">Generar documento en borrador</p>

                                </tr>
                            </td>
                        </tr>
                    </table>

                </div>

            </div>
            </div>

        </div>

        <!-- ENCABEZADO -->
        <div id="datos-encabezado" class="container-fluid tab-pane fade" :class="{show : tab == 3, active : tab == 3}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

                <div class="card-header">
                    <h3>Contenido del encabezado</h3>
                </div>

                <div class="card-body" style="height: auto; overflow: auto;">

                    <MDBAccordion v-model="activeItemH" stayOpen flush>

                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Vista previa del encabezado" collapseId="collapseOne">

                            <div class="fullpage-header" :style="`${'height:' + hHeader + 'px;width:' + modelo.oMetadatos.ancho + 'px;background-color:' + modelo.oHeader.backcolor}`">

                                <img v-if="logopreview && modelo.oHeader.logo.SiNo" 
                                    :src="logopreview" 
                                    :height="`${logoHeight}`" 
                                    :width="`${logoWidth}`" 
                                    :style="`${'position:absolute;left:' + (modelo.oHeader.logo.posX) + 'px;top:' + (modelo.oHeader.logo.posY) + 'px'}`"
                                />

                                <label class="txt-preview" v-for="txt of modelo.oHeader.textos" :key="txt.id"
                                    :style="`${'width:' + ((modelo.oMetadatos.ancho) - (txt.posX) - 5) + 'px;top:' + (txt.posY) + 'px;left:' + (txt.posX) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`" 
                                >
                                    <span v-if="txt.mostrar">{{txt.preview}}</span>
                                </label>

                            </div> 

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Logotipo" collapseId="collapseTwo">

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
                                                <input type="file" ref="fileLogo" id="file-logo" accept=".png,.jpg,.bmp" @change="cargalogo" >
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

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Textos" collapseId="collapseThree">
                            
                            <textos objeto="oHeader" :modelo="modelo" @getData="getData"/>

                        </MDBAccordionItem>
                        
                    </MDBAccordion>      

                </div>

            </div>
            </div>

        </div>

        <!-- SUB-ENCABEZADO -->
        <div id="datos-subencabezado" class="container-fluid tab-pane fade" :class="{show : tab == 4, active : tab == 4}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

                <div class="card-header">
                    <h3>Contenido del sub-encabezado</h3>
                </div>

                <div class="card-body" style="height: auto; overflow: auto;">

                    <MDBAccordion v-model="activeItemS" stayOpen flush>

                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Vista previa del sub-encabezado" collapseId="collapseSOne">

                            <div class="fullpage-header" :style="`${'height:' + hSubHeader + 'px;width:' + modelo.oMetadatos.ancho + 'px;background-color:' + modelo.oSubHeader.backcolor}`">

                                <label class="txt-preview" v-for="txt of modelo.oSubHeader.textos" :key="txt.id"
                                    :style="`${'width:' + ((modelo.oMetadatos.ancho) - (txt.posX) - 5) + 'px;top:' + (txt.posY) + 'px;left:' + (txt.posX) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`" 
                                >
                                    <span v-if="txt.mostrar">{{txt.preview}}</span>
                                </label>

                            </div> 

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Textos" collapseId="collapseSTwo">
                            
                            <textos objeto="oSubHeader" :modelo="modelo" @getData="getData"/>   

                        </MDBAccordionItem>
                        
                    </MDBAccordion>      

                </div>

            </div>
            </div>

        </div>

        <!-- CUERPO -->
        <div id="datos-cuerpo" class="container-fluid tab-pane fade" :class="{show : tab == 5, active : tab == 5}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">
                
                <div class="card-header">
                    <h3>Contenido del cuerpo</h3>
                </div>

                <div class="card-body" style="height: auto; overflow: auto;">

                    <MDBAccordion v-model="activeItemB" stayOpen flush>

                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Vista previa del Cuerpo" collapseId="collapseBOne">

                            <!-- BODY -->
                            <div class="fullpage-body" :style="`${'height:' + hBody + 'px;width:' + modelo.oMetadatos.ancho + 'px;background-color:' + modelo.oBody.backcolor}`">

                                <table>
                                    <tr v-for="n in 15" :key="n" class="renglon" style="height:16px">

                                        <td>

                                            <div v-for="txt of modelo.oBody.textos" :key="txt.id" class="col-preview" :style="`${'left:' + (txt.posX) + 'px;top:' + (txt.posY) + 'px;'}`" >

                                                <span v-if="txt.mostrar" :style="`${'width:auto;top:0px;left:0;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`">
                                                    {{txt.preview}}
                                                </span>

                                            </div>
                                            
                                        </td>

                                    </tr>
                                </table>

                            </div> 

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Columnas" collapseId="collapseBTwo">
                            
                            <textos objeto="oBody" :modelo="modelo" @getData="getData"/> 

                        </MDBAccordionItem>
                        
                    </MDBAccordion>      

                </div>

            </div>
            </div>

        </div>        

        <!-- SUBTOTAL -->
        <div id="datos-subtotales" class="container-fluid tab-pane fade" :class="{show : tab == 6, active : tab == 6}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

                <div class="card-header">
                    <h3>Contenido del sub-total</h3>
                </div>

                <div class="card-body" style="height: auto; overflow: auto;">

                    <MDBAccordion v-model="activeItemST" stayOpen flush>

                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Vista previa del sub-total" collapseId="collapseSTOne">

                            <div class="fullpage-header" :style="`${'height:' + hSubTotales + 'px;width:' + modelo.oMetadatos.ancho + 'px;background-color:' + modelo.oSubTotales.backcolor}`">

                                <label class="txt-preview" v-for="txt of modelo.oSubTotales.textos" :key="txt.id"
                                    :style="`${'width:' + ((modelo.oMetadatos.ancho) - (txt.posX) - 5) + 'px;top:' + (txt.posY) + 'px;left:' + (txt.posX) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`" 
                                >
                                    <span v-if="txt.mostrar">{{txt.preview}}</span>
                                </label>

                            </div>

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Textos" collapseId="collapseSTTwo">
                            
                            <textos objeto="oSubTotales" :modelo="modelo" @getData="getData"/>

                        </MDBAccordionItem>
                        
                    </MDBAccordion>      

                </div>

            </div>
            </div>

        </div>

        <!-- PIE -->
        <div id="datos-pie" class="container-fluid tab-pane fade" :class="{show : tab == 7, active : tab == 7}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">

                <div class="card-header">
                    <h3>Contenido del pie</h3>
                </div>

                <div class="card-body" style="height: auto; overflow: auto;">

                    <MDBAccordion v-model="activeItemP" stayOpen flush>

                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Vista previa del Pie" collapseId="collapsePOne">

                            <div class="fullpage-header" :style="`${'height:' + hPie + 'px;width:' + modelo.oMetadatos.ancho + 'px;background-color:' + modelo.oPie.backcolor}`">

                                <label class="txt-preview" v-for="txt of modelo.oPie.textos" :key="txt.id"
                                    :style="`${'width:' + ((modelo.oMetadatos.ancho) - (txt.posX) - 5) + 'px;top:' + (txt.posY) + 'px;left:' + (txt.posX) + 'px;font-family:' + txt.fuente + ';font-weight:' + txt.cssestilo + ';font-style: ' + txt.cssitalica + ';text-decoration:' + txt.csssubrayado + ';font-size:' + (txt.tamanio) + 'pt;color:' + txt.color}`" 
                                >
                                    <span v-if="txt.mostrar">{{txt.preview}}</span>
                                </label>

                            </div> 

                        </MDBAccordionItem>
                        <MDBAccordionItem class="accordion-collapse collapse show" headerTitle="Textos" collapseId="collapsePTwo">
                            
                            <textos objeto="oPie" :modelo="modelo" @getData="getData"/>
                            
                        </MDBAccordionItem>
                        
                    </MDBAccordion>      

                </div>

            </div>
            </div>

        </div>

        <!-- CAMPOS -->
        <div id="datos-campos" class="container-fluid tab-pane fade" :class="{show : tab == 8, active : tab == 8}"><br>

            <div class="row justify-content-center">
            <div class="card" style="width: 90%;">
                
                <div class="card-header">
                    <h3>Campos utilizados en el documento</h3>
                </div>
                <div class="card-body">

                    <!-- CAMPOS USADOS EN EL DOCUMENTO -->
                    <form action @submit.prevent="cero">

                        <table>
                            <tr>
                                <!-- TABLA -->
                                <td style="width: 20%;">
                                    <label for="campoTabla">Tabla:</label>
                                    <select ref="campoTabla" id="campoTabla" class="form-select" v-model="campoTabla" @change="LeerCampos(campoTabla)">
                                        <option v-for="tabla of aTablas" :key="tabla.nombre" :value="tabla.nombre" :disabled="tabla.idx == 0">{{tabla.nombre}}</option>
                                    </select>                                    
                                </td>
                                <!-- CAMPO -->
                                <td style="width: 20%;">
                                    <label for="campoNombre">Nombre del campo:</label>
                                    <select id="campoNombre" class="form-select" v-model="campoidx" @change="ActualizaTipoCampo()">
                                        <option v-for="campo of aCampos" :key="campo.idx" :value="campo.idx" :disabled="campo.idx==0">{{campo.nombre}}</option>
                                    </select>                                    
                                </td>
                                <!-- TIPO Y FORMATO -->
                                <td class="text-left" style="width: 45%;">
                                    <label for="campoTipo" style="padding-right: 10px;">Tipo/formato del campo:</label>
                                    <span>{{cTipos[cTipos.findIndex( x => x.id == campoTipo)].literal}}</span> 
                                    <span v-if="campoTipo == 'C' || campoTipo == 'A'">({{campoAncho}})</span>
                                    <span v-if="campoTipo == 'N' || campoTipo == 'M'">({{campoAncho}},{{campoDecimales}})</span>

                                    <div style="display:block;">
                                        <label style="padding-right: 10px;">Ejemplo:</label>
                                        <label style="padding-right:10px;">
                                            {{getModelo('campo').substr(0,30)}}
                                            <span v-if="campoAncho > 30">...</span>
                                        </label>
                                    </div>


                                </td>
                                <td style="width: 15%;">
                                    <span @click="agregarCampo()" class="iconos inline-icon btn-img material-icons" title="Agregar a la lista">save_alt</span>
                                    <span @click="resetCampo()" class="iconos inline-icon btn-img material-icons" title="Descartar">clear</span>

                                </td>                            
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end" style="color:red;">
                                    {{tMensaje}}
                                </td>
                            </tr>
                        </table>

                        <!-- <div class="table-responsive"> -->
                        <div class="tableFixHead table-responsive"> 
                        <table>                           
                            <thead class="thead-light">
                                <tr>
                                    <th>Tabla</th>
                                    <th>Nombre del campo</th>
                                    <th>Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody style="height: 10px !important; overflow: scroll; ">

                                <tr v-for="txt of modelo.oCampos" :key="txt.id">
                                    <td>
                                        {{txt.tabla}}
                                    </td>
                                    <td>
                                        {{txt.nombre}}
                                    </td>
                                    <td>
                                        {{txt.tipo}}
                                        {{cTipos[cTipos.findIndex( x => x.id == txt.tipo)].literal}}
                                    </td>                                                                                        
                                    <td>
                                        <span @click="borrarCampo(txt.id)" class="iconos inline-icon btn-img material-icons" title="Eliminar de la lista">delete</span>
                                        <span @click="editarCampo(txt.id)" class="iconos inline-icon btn-img material-icons" title="Editar este registro">mode_edit</span>
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

    </div>



</div>
</template>

<script>

import global from '@/utils/global'
import funciones from '@/utils/funciones'
import datos from '@/utils/datos'
import truecolor from '@/components/visuales/trueColor'
import telon from '@/components/visuales/telon'
import textos from '@/components/visuales/textos'

import {
    MDBAccordion,
    MDBAccordionItem,    
} from 'mdb-vue-ui-kit';
import { ref } from "vue";

export default {
    name: 'NewDoc',
    components:{
        truecolor,
        telon,
        MDBAccordion,
        MDBAccordionItem,
        textos,

    },
    directives:{
    },
    data() {

        const activeItemH = ref('collapseOne');
        const activeItemS = ref('collapseSOne');
        const activeItemB = null;   //ref('collapseBTwo');
        const activeItemST = ref('collapseSTOne');
        const activeItemP = ref('collapsePOne');

        return {
            tab: 1,
            hayerror: 0,
            hiddentelon: true,
            activeItemH, activeItemS, activeItemB, activeItemST, activeItemP,
            logopreview: null,
            // Introduccion de campos
            campoID: funciones.generarUUID2(),
            campoEstaba: false,
            campoidx: 0,
            campoTabla: 'Selecciona ...',
            campoNombre: 'Selecciona ...',
            campoTipo: '0',
            campoAncho: 0,
            campoDecimales: 0,
            aTablas: [],
            aCampos: [],
            cTipos: [
                {id:"0",literal:""},
                {id:"C",literal:"Caracteres"},
                {id:"N",literal:"Numérico"},
                {id:"M",literal:"Moneda"},
                {id:"K",literal:"Si/No"},
                {id:"D",literal:"Fecha"},
                {id:"T",literal:"Fecha y hora"},
                {id:"H",literal:"Hora"},
                {id:"A",literal:"Area de texto"}], 
            tMensaje: '',
            // claveId recibida para editar
            claveId: '',
            // Modelo del documento
            modelo: {
                oMetadatos: {
                    docuId: funciones.generarUUID2(), 
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
        getData(quien, valor, b, i) {

            if(global.DEBUG)
                console.log('getData Valor recibido del componente', quien, valor, b, i);

            if(quien == 'modelo.oHeader.logo.SiNo')
                this.modelo.oHeader.logo.SiNo = valor;

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

            if(quien == 'textos') {
                this.modelo[valor].textos = b;
            }


        },
        getModelo(pCual) {

            let tipo = 'C';
            let ancho = 0;
            let decimales = 0;

            if(pCual == 'campo') {
                tipo = this.campoTipo;
                ancho = this.campoAncho;
                decimales = this.campoDecimales;
            }
            if(pCual == 'columna') {
                tipo = this.columnaTipo;
                ancho = this.columnaAncho;
            }
            return funciones.getModelo(tipo, ancho, decimales);

        },
        enfoca(p) {
            switch (p) {
                case 'E':
                    this.$refs.porceheader.focus();
                    break;
                case 'SE':
                    this.$refs.porcesubheader.focus();
                    break;        
                case 'B':
                    this.$refs.porcebody.focus();
                    break;   
                case 'ST':
                    this.$refs.porcesubtotales.focus();
                    break;   
                case 'P':
                    this.$refs.porcepie.focus();
                    break;                                                                           
            }
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
                        this.modelo.oMetadatos.alto = 842;
                        this.modelo.oMetadatos.ancho = 595;
                        this.modelo.oHeader.logo.pHeight = 33;
                        this.modelo.oHeader.logo.pWidth = 10;                        

                    } else {
                        this.modelo.oMetadatos.alto = 595;
                        this.modelo.oMetadatos.ancho = 842;                
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
        agregarCampo() {

            if(this.campoTabla == '' || this.campoNombre == '' || this.campoidx == 0 || this.campoTipo == 0) {
                this.tMensaje = "Faltan datos";
                this.$refs.campoTabla.focus();
                return                
            }

            let existe = this.modelo.oCampos.findIndex(x => x.tabla === this.campoTabla && x.nombre === this.campoNombre);
            let editando = this.modelo.oCampos.findIndex(x => x.id === this.campoID);

            if(existe != -1 && (editando == -1 || editando != existe)) {
                this.tMensaje = "Campo repetido";
                this.$refs.campoTabla.focus();
                return;
            }  

            if(existe == -1) {
                // No existe, se crea
                let idx = funciones.generarUUID2();

                this.modelo.oCampos.push({
                    id: idx, 
                    estaba: false, 
                    tabla: this.campoTabla, 
                    nombre: this.campoNombre,
                    tipo: this.campoTipo,
                    ancho: this.campoAncho,
                    decimales: this.campoDecimal
                })

            } else {
                // Ya existe, se actualiza
                this.modelo.oCampos[existe].estaba = this.campoEstaba; 
                this.modelo.oCampos[existe].tabla = this.campoTabla; 
                this.modelo.oCampos[existe].nombre = this.campoNombre;
                this.modelo.oCampos[existe].tipo = this.campoTipo; 
                this.modelo.oCampos[existe].ancho = this.campoAncho;
                this.modelo.oCampos[existe].decimales = this.campoDecimales;
            }

            this.resetCampo();
            this.campoID = funciones.generarUUID2();
            this.hayerror = 0;

        }, 
        resetCampo() {
            this.campoID = funciones.generarUUID2();
            this.campoEstaba = false;
            // this.campoTabla = '';
            this.campoNombre = '0'; 
            this.campoTipo = '0';
            this.campoAncho = 0;
            this.campoDecimales = 0;
            this.campoidx = 0;

            this.hayerror = 0;
            this.tMensaje = "";
            this.$refs.campoTabla.focus();        

        },
        editarCampo(pId) {

            let x = this.modelo.oCampos.findIndex(x => x.id === pId)

            // Cargar el texto para edición
            this.campoID = this.modelo.oCampos[x].id;
            this.campoEstaba = this.modelo.oCampos[x].estaba;
            this.campoTabla = this.modelo.oCampos[x].tabla;
            this.campoNombre = this.modelo.oCampos[x].nombre; 
            this.campoTipo = this.modelo.oCampos[x].tipo;
            this.campoAncho = this.modelo.oCampos[x].ancho;
            this.campoDecimales = this.modelo.oCampos[x].decimales;

            this.$refs.campoTabla.focus();

        },
        borrarCampo(pId) {

            funciones.popAlert('warning', 'Quieres eliminar este campo de la lista?', true, true, 8000, "Sí, bórralo!")
            .then((result) => {

                if(result==true) {
                    this.modelo.oCampos = this.modelo.oCampos.filter((tx) => {
                        return tx.id != pId; 
                    }) 
                    this.resetCampo();
                }

            })

        },
        Grabar() {

            // Validar metadatos
            if(this.modelo.oMetadatos.titulo == '' || this.modelo.oMetadatos.version == 0) {
                this.hayerror = 3;
                this.tab = 1;
                return
            }

            funciones.popAlert('question', 'Quieres guardar la definición del documento?', true, true, 8000, "Sí")
            .then((result) => {

                if(result==true) {

                    this.hiddentelon = false;

                    if(this.claveId == null) {
                        // Almacenar nuevo documento
                        this.Agregar();
                    } else {    
                        // Actualizar el documento claveId
                        this.Actualizar();
                    }
                    
                }
            })
        },
        Agregar() {

            try{

                let tmp = this.modelo;
                let almacenar = "";

                // Cabecera del documento
                almacenar = {id: tmp.oMetadatos.docuId, titulo: tmp.oMetadatos.titulo, version: tmp.oMetadatos.version, activa: tmp.oMetadatos.activa};
                datos.grabarHeadDocumento(almacenar) 
                .then((result) => {

                    if(result.success == 1 && result.status == 201) {

                        // Almacenar propiedades del documento
                        almacenar = {id: tmp.oMetadatos.docuId, objeto: JSON.stringify(this.modelo, null, '\t')};
                        datos.grabarDocumento(almacenar)
                        .then((result) => {

                            if(result.success == 1 && result.status == 201) {

                                // Subir imagen del logo
                                let imageLogo = this.$refs.fileLogo.files[0];

                                if(imageLogo) {
                                    funciones.subirAdjunto('SYS' + this.modelo.oMetadatos.docuId, imageLogo)
                                    .then((result) => {

                                        if(result.success == 1 && result.status == 200) {

                                            funciones.popAlert("success", "Datos almacenados!", true, false, 3000, "ok")
                                            .then(() => {
                                                this.$router.push('/inicio');
                                            })

                                        } else {
                                            funciones.popAlert("error", "No se ha podido grabar en este momento! (ce001)", true, false, 3000, "ok");
                                        }

                                    })
                                } else {
                                    funciones.popAlert("success", "Datos almacenados!", true, false, 3000, "ok")
                                    .then(() => {
                                        this.$router.push('/inicio');
                                    })
                                }

                            } else {
                                funciones.popAlert("error", "No se ha podido grabar en este momento! (ce001)", true, false, 3000, "ok");
                            }
                        })

                    }

                })
                this.hiddentelon = true;


            } catch (error) {
                console.log(error);
            }

        },
        Actualizar() {

            try {

                let tmp = this.modelo;
                let almacenar = "";

                // Cabecera del documento
                almacenar = {id: tmp.oMetadatos.docuId, titulo: tmp.oMetadatos.titulo, version: tmp.oMetadatos.version, activa: tmp.oMetadatos.activa};
                datos.actualizarHeadDocumento("id='" + tmp.oMetadatos.docuId + "'", almacenar) 
                .then((result) => {

                    if(result.success == 1 && result.status == 200) {

                            // Actualizar las propiedades del documento
                            almacenar = {id: tmp.oMetadatos.docuId, objeto: JSON.stringify(this.modelo, null, '\t')};
                            datos.actualizarDocumento("id='" + tmp.oMetadatos.docuId + "'", almacenar)
                            .then((result) => {

                                if(result.success == 1 && result.status == 200) {

                                    // Subir imagen del logo
                                    let imageLogo = this.$refs.fileLogo.files[0];

                                    if(imageLogo) {

                                        funciones.subirAdjunto('SYS' + this.modelo.oMetadatos.docuId, imageLogo)
                                        .then((result) => {

                                            if(result.success == 1 && result.status == 200) { 

                                                funciones.popAlert("success", "Datos actualizados!", true, false, 3000, "ok")
                                                .then(() => {
                                                    this.$router.push('/inicio');
                                                });

                                            } else {
                                                funciones.popAlert("error", "No se ha podido grabar en este momento! (ce001)", true, false, 3000, "ok");
                                            }

                                        })

                                    } else {
                                        funciones.popAlert("success", "Datos almacenados!", true, false, 3000, "ok")
                                        .then(() => {
                                            this.$router.push('/inicio');
                                        })
                                    }                                        

                                } else {
                                    funciones.popAlert("error", "No se ha podido actualizar en este momento!", true, false, 3000, "ok")
                                }     

                            });

                    } else {
                        funciones.popAlert("error", "No se ha podido actualizar en este momento!", true, false, 3000, "ok")
                    }

                })

                this.hiddentelon = true;


            } catch (error) {
                console.log(error);
            }

        },
        LeerDatos() {

            try {

                datos.leerLista('sys_documentos', "id='" + this.claveId + "'", ['objeto'], '')
                .then((result) => {

                    if(result.success == 1 && result.status == 200) {

                        this.modelo = JSON.parse(result.data[0].objeto.split('&quot;').join('"'));

                        funciones.rutaAdjunto("SYS" + this.modelo.oMetadatos.docuId + this.modelo.oHeader.logo.img)
                        .then((result) => {

                            if(result.success == 1 && result.status == 200) {
                                this.logopreview = result.data[0];
                            }

                        })
                         

                    }
                })



            } catch(error) {
                console.log(error);

            }



        },
        LeerTablas() {

            try {

                let sql = "SELECT * FROM INFORMATION_SCHEMA.tables WHERE TABLE_SCHEMA='" + global.TABLE_SCHEMA + "';"; 
                this.aTablas = [{idx:0, nombre: 'Selecciona ...'}];

                funciones.ejecutaQuery(sql, [])
                .then((result) => {

                    if(result.success == 1 && result.status == 200) {

                        for(let t = 0; t < result.data.length; t++){

                            if(result.data[t].TABLE_NAME.substr(0,4).toLowerCase() != 'sys_') {
                                this.aTablas.push({
                                    idx:    this.aTablas.length,
                                    nombre: result.data[t].TABLE_NAME.toUpperCase()
                                })
                            }
                        }
                    }
                    console.log("Tablas:", this.aTablas);
                })


            } catch (error) {
                console.log(error);
            }


        },
        LeerCampos(pTabla) {

            try {

                let sql = "SELECT * FROM Information_Schema.Columns WHERE TABLE_NAME = '" + pTabla + "' ORDER BY COLUMN_NAME";
                this.aCampos = [];

                funciones.ejecutaQuery(sql, [])
                .then((result) => {

                    if(result.success == 1 && result.status == 200) {
                        
                        this.aCampos = [{
                            idx: 0, 
                            nombre:'Selecciona ...',                                     
                            tipo: '',
                            ancho: 0,
                            decimales: 0}];

                        for(let x=0; x < result.data.length; x++) {

                            if(result.data[x].COLUMN_NAME.substr(0, 1) != '_') {

                                let xtipo = '';
                                let xancho = '';
                                let xdecimales = 0;                                
                                switch(result.data[x].DATA_TYPE.toLowerCase()) {

                                    case 'varchar':
                                        xtipo = 'C';
                                        xancho = result.data[x].CHARACTER_MAXIMUM_LENGTH;
                                        xdecimales = 0;
                                        break;
                                    case 'decimal':
                                        xtipo = 'N';
                                        xancho = result.data[x].NUMERIC_PRECISION;
                                        xdecimales = result.data[x].NUMERIC_SCALE;                                        
                                        break;
                                    case 'int':
                                        if(result.data[x].COLUMN_TYPE == 'int(1)') {
                                            xtipo = 'K';
                                            xancho = result.data[x].CHARACTER_MAXIMUM_LENGTH;
                                            xdecimales = 0;     
                                        } else {
                                            xtipo = 'N';
                                            xancho = result.data[x].NUMERIC_PRECISION;
                                            xdecimales = 0;                                             
                                        }
                                        break;
                                    case 'text':
                                        xtipo = 'A';
                                        xancho = result.data[x].CHARACTER_MAXIMUM_LENGTH;
                                        xdecimales = 0;                                        
                                        break;
                                    case 'date':
                                        xtipo = 'D';
                                        xancho = 0;
                                        xdecimales = 0;                                        
                                        break;
                                    case 'datetime':
                                    case 'timestamp':
                                        xtipo = 'T';
                                        xancho = 0;
                                        xdecimales = 0;                                               
                                        break;
                                    case 'time':
                                        xtipo = 'H';
                                        xancho = 0;
                                        xdecimales = 0;                                               
                                        break;  
                                }

                                this.aCampos.push({
                                    idx:       this.aCampos.length,
                                    nombre:    result.data[x].COLUMN_NAME,
                                    tipo:      xtipo,
                                    ancho:     xancho,
                                    decimales: xdecimales
                                })
                            }
                        }
                        this.campoidx = 0;

                        console.log("Campos", this.aCampos);

                    }

                })

            } catch (error) {
                console.log(error);
            }


        },
        ActualizaTipoCampo() {
            if(this.campoidx == 0) {
                return;
            }
            this.campoNombre = this.aCampos[this.campoidx].nombre;
            this.campoTipo = this.aCampos[this.campoidx].tipo;
            this.campoAncho = this.aCampos[this.campoidx].ancho;
            this.campoDecimales = this.aCampos[this.campoidx].decimales;
        }       


    },
    mounted(){
        this.claveId = this.$route.params['p_claveId'];
        if(this.claveId != null) {
            this.LeerDatos();
        }
        this.LeerTablas();
    },
    computed: {
        mincampoAncho:{
            get() {
                if(this.campoTipo == 'C') {
                    return 1;
                } else {
                    return 0;
                }                
            }
        },
        maxcampoAncho:{
            get() {
                if(this.campoTipo == 'C') {
                    return 255;
                } else {
                    return 4;
                }
            }
        },
        campoAlign: {
            get() {
                let ttx = '';
                switch (this.campoTipo) {
                    case 'C':
                        ttx = 'left';
                        break;

                    case 'N': 
                        ttx = 'right';
                        break;

                    case 'M':
                        ttx = 'right';
                        break;

                    case 'D':
                        ttx = 'left';
                        break;

                    case 'T':
                        ttx = 'left';
                        break;

                    case 'H':
                        ttx = 'left';   
                        break;

                }
                return ttx;
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
        logoHeight: {
            get() {
                return this.hHeader * this.modelo.oHeader.logo.pHeight / 100; 
            }
        },
        logoWidth: {
            get() {
                return this.modelo.oMetadatos.ancho * this.modelo.oHeader.logo.pWidth / 100; 
            }
        },
        logoMaxY: {
            get() {
                return this.hHeader - this.logoHeight - 5;
            }
        }, 
        logoMaxX: {
            get() {
                return this.modelo.oMetadatos.ancho - this.logoWidth - 5;
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
                return (this.modelo.oMetadatos.alto * this.modelo.oHeader.hPorce / 100);
            }           
        },        
        hSubHeader:{
            get() {
                return (this.modelo.oMetadatos.alto * this.modelo.oSubHeader.hPorce / 100);
            }   
        },       
        hBody:{
            get() {
                return (this.modelo.oMetadatos.alto * this.modelo.oBody.hPorce / 100);
            }   
        },         
        hSubTotales:{
            get() {
                return (this.modelo.oMetadatos.alto * this.modelo.oSubTotales.hPorce / 100);
            }   
        },                
        hPie:{
            get() {
                return (this.modelo.oMetadatos.alto * this.modelo.oPie.hPorce / 100);
            }   
        },               
    },


}
</script>

<style scoped>

    /* *************************** CONTENIDO DEL ENCABEZADO ************************ */
    .fullpage-header {
        display: block;
        overflow-y: hidden;        
        float:left;
        border: 1px solid black;
        text-align: left;
        margin-bottom: 15px;
        position: relative;
    }
    .img-preview {
        display: block;
        overflow-y: auto;        
        width: 20%;
        height: 100%;
        position: relative;
        float: left;
    }
    .opciones-preview {
        display: block;
        overflow-y: auto;        
        height: auto;
        background-color: white;
        /* display: block; */
        text-align: start;
        position: relative;
    }
    .opciones-preview input[type="number"] {
        width: 80px;
    }
    .txt-preview {
        height:auto;
        position: absolute;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: horizontal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fullpage-body{
        display: block;
        /* overflow-y: auto;         */
        float:left;
        border: 1px solid black;
        text-align: left;
        margin-bottom: 15px;
        position: relative;  
        /* overflow: hidden;    */
    }    
    .renglon {
        position: relative;
        padding: 0px;
        border: none;
        overflow: hidden;

    }  
    .col-preview {
        display: inline;
        position: absolute;
        -webkit-line-clamp: 1;
        -webkit-box-orient: horizontal;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    /* Para fijar el encabezado de la tabla y desplazar los registros */
    .tableFixHead          { overflow-y: auto; height: 500px; }
    .tableFixHead thead th { position: sticky; top: 0; }

    /* Just common table stuff. Really. */
    table  { border-collapse: collapse; width: 100%; }
    /* th, td { padding: 8px 16px;} */
    th     { background:#eee; }

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
