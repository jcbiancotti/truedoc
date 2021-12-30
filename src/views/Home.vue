<template>
  <div class="home">

    <!-- LISTA DE DOCUMENTOS -->
    <div class="card-deck">

        <div class="row" v-for="documento of aDocumentos" :key="documento.clave">

            <div class="col d-flex pt-3">

                <div class="card">

                    <div class="card-header text-left" style="line-height : 12px;">
                        <p style="color:silver">documento id: {{documento.clave}}</p>
                    </div>
                    <div class="card-body text-justify" style="line-height : 12px;">

                        <p>Título: {{documento.titulo}}</p>
                        <p>Version: {{documento.version}}</p>

                    </div>
                    
                    <div class="card-footer">
                        <router-link to="/editdoc" class="btn float-right">
                            <i class="fas fa-edit" style="color: silver"></i>
                        </router-link>
                        <router-link to="deldoc" class="btn float-right">
                            <i class="fas fa-trash-alt" style="color: silver"></i>
                        </router-link>                        
                    </div>

                </div>

            </div>

        </div>

    </div>

  </div>
</template>

<script>

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

              datos.leerLista("plantillas", "true", ["clave","titulo","version"], "")
              .then((result) => {

                  if(global.DEBUG)
                      console.log("leerDocumentos", "datos devueltos datos.leerLista", result);


                  if(result.success == 1) {

                      if(result.status == 200) {

                          for(let x = 0; x < result.data.length; x++) {

                              this.aDocumentos.push({
                                clave: result.data[x].clave,
                                titulo: result.data[x].titulo,
                                version:result.data[x].version
                              });
                            
                          }

                      } else if (result.status == 204) {

                          this.aDocumentos.push({
                            clave:0,
                            titulo:"Aún no hay plantillas creadas ...",
                            version:0
                          });

                      } 

                  }

            })

          } catch(error) {
            console.log(error)
          }


      }
  },
  mounted() {
    this.leerDocumentos();

  },
}
</script>
