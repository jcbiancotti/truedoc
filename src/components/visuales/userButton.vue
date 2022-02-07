<template>
<div class="container-fluid">

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <div class="dropdown navbar-nav ml-auto" v-if="isLogged">

            <button class="btn-link dropdown-toggle" type="button" data-toggle="dropdown">{{fname}}<span class="caret"></span></button>
            
            <ul class="dropdown-menu dropdown-menu-right">
                <li>
                    <!-- <router-link :to="`${'/userperfil/' + $store.state.userId}`" class="dropdown-item"><i class="fas fa-user" fa-5x style="color: #0000FF"/>  Datos de tu cuenta</router-link> -->
                </li>
                <li>
                    <!-- <router-link :to="`${'/restcontrasenia4/' + $store.state.userEmail}`" class="dropdown-item"><i class="fas fa-key" fa-5x style="color: #0000FF"/>  Cambiar contrase&ntilde;a</router-link> -->
                </li>
                <div class="dropdown-divider"></div>
                <li>
                    <router-link @click="deleteUserLogged()" to="/" class="dropdown-item"><i class="fas fa-unlink" fa-5x style="color: #0000FF"/>  Desconectar</router-link>
                </li>
                <div class="dropdown-divider"></div>
                <li>
                    <!-- <router-link to="/documentum" class="dropdown-item"><i class="fas fa-file" fa-5x style="color: #0000FF"/>  Documentación</router-link> -->
                </li>                           

            </ul>
        </div>
        <!-- --------- -->
        <div class="dropdown navbar-nav ml-auto" v-else> 

            <button class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">Acceder</button>

            <ul class="dropdown-menu dropdown-menu-right">
                <li>
                    <router-link to="/login" class="dropdown-item"><i class="fas fa-user" fa-5x style="color: #000"/>  Accede</router-link>
                </li>
                <li>
                    <!-- <router-link to="/registrate" class="dropdown-item"><i class="fas fa-user-plus" fa-5x style="color: #000"/>  Reg&iacute;strate</router-link> -->
                </li>
            </ul>

        </div>

    
    </div>



    
</div>
</template>

<script>

import auth from '@/utils/auth'

export default {
    name: 'userButton',
    data() {
        return {
            u: '',
            usr: {nombre_completo: ''},
        }
    },
    methods: {
        deleteUserLogged() {
            auth.deleteUserLogged();
            // Ir a Home
            this.$router.push({path: "/"});
        },

    },
    computed: {
        isLogged:{
            get() {
                return this.$store.state.logged;
            }
        },
        fname: {
            get() {
                return this.$store.state.userFullName;
            }
        }

    }
}
</script>

<style>

</style>
