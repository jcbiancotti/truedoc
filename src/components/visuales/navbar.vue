<template>
<div class="container-fluid">
    <nav class="navbar navbar-expand-md p-0">
        <div class="col text-left" style="border: 1px solid blue; padding-top:2px; padding-bottom:2px ;background-color: var(--true-color-empresa);">

            <router-link v-if="isLogged" to="/inicio" class="btn float-left">Home <i class="fa fa-home"></i></router-link>
            <router-link v-if="isLogged" to="/newdoc" class="btn float-left">Nuevo <i class="far fa-file"></i></router-link>

            <!-- Boton hamburguesa cuando el menu no está visible -->
            <p style="color: white;">*** {{isLogged}} *** {{fName }} ***</p>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <userButton />

        </div>
    </nav>

</div>    
</template>

<script>

import userButton from '@/components/visuales/userButton'

export default {
    name: 'NavBar',
    data() {
        return {
            
        }
    },
    components: {
        userButton
    },    
    methods:{

    },
    mounted() {

    },
    computed: {
        isLogged:{
            get() {
                return this.$store.state.logged;
            }
        },
        fName:{
            get() {
                return this.$store.state.userFullName;
            }
        }        

    }

}
</script>

<style>

</style>
