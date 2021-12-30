<template>
<div class="container-fluid">

    <h3>Plantillas de los documentos</h3>
    <nav class="navbar navbar-expand-md p-0">
        <div class="col text-left" style="border: 1px solid blue; padding-top:2px; padding-bottom:2px ;background-color: var(--true-color-empresa);">

            <router-link to="/" class="btn float-left">Home <i class="fa fa-home"></i></router-link>
            <router-link to="/newdoc" class="btn float-left">Nuevo <i class="far fa-file"></i></router-link>

        </div>
    </nav>

    <router-view/>

</div>
</template>

<style>

  @import './assets/css/variables.css';

</style>
