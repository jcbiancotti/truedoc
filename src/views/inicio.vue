<template>
  <div class="home">

    <!-- LISTA DE DOCUMENTOS -->
    <div class="card-deck">

        <div class="row" v-for="documento of aDocumentos" :key="documento.clave">

            <div class="col d-flex pt-3">

                <div class="card">

                    <div class="card-header text-left" style="line-height : 12px;background-color: var(--true-color-empresa);">
                        <p style="color:silver">documento id: {{documento.id}}</p>
                    </div>
                    <div class="card-body text-justify" style="line-height : 12px;">

                        <p>Título: {{documento.titulo}}</p>
                        <p>Version: {{documento.version}}</p>
                        <p>
                            <label class="content-input">
                                <input type="checkbox" v-model="documento.isActiva" :disabled="true">
                                <i></i>
                            </label>
                        </p>

                    </div>
                    
                    <div class="card-footer">
                        <router-link to="/editdoc" class="btn float-right" title="Editar este documento">
                            <i class="fas fa-edit" style="color: silver"></i>
                        </router-link>
                        <a @click="clonar(documento.id)" class="btn float-right" title="Duplicar este documento"> <i class="far fa-copy" style="color:silver"></i> </a>
                        <a @click="borrar(documento.id)" class="btn float-right" title="Borrar este documento"  > <i class="far fa-trash-alt" style="color:silver"></i> </a>

                        
                    </div>

                </div>

            </div>

        </div>

    </div>

  </div>
</template>

<script>

import funciones from '@/utils/funciones'
import datos from '@/utils/datos'

export default {
  name: 'Home',
  data(){
    return {
      aDocumentos: [],

    }
  },
  components: {
  },
  methods: {
      leerDocumentos() {

          try {

              this.aDocumentos = [];

              datos.leerLista("sys_head_documentos", "true", ["clave","id", "titulo","version","activa"], "")
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

                      } else if (result.status == 204) {

                          this.aDocumentos.push({
                            clave:0,
                            id: '',
                            titulo:"Aún no hay plantillas creadas ...",
                            version:0
                          });

                      } 

                  }

            })

          } catch(error) {
            console.log(error)
          }


      },
      borrar(pId) {

        funciones.popAlert('warning', 'Quieres borrar la definición de este documento?', true, true, 8000, "Sí, bórralo!")
        .then((result) => {

            if(result==true) {

                console.log("Borrar", pId)



            }

        })

      }
  },
  mounted() {
    this.leerDocumentos();

  },
}
</script>
