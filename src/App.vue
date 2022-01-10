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

    /* <!-- GOOGLE FONTS --> */
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
    @import url('https://fonts.googleapis.com/css?family=Audiowide');
    @import url('https://fonts.googleapis.com/css?family=Trirong');
    @import url('https://fonts.googleapis.com/css?family=Sofia');
    @import url('https://fonts.googleapis.com/css?family=Titan+One');
    @import url('https://fonts.googleapis.com/css?family=Cabin');
    @import url('https://fonts.googleapis.com/css?family=Lato');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    @import url('https://fonts.googleapis.com/css?family=Pt Sans');
    @import url('https://fonts.googleapis.com/css?family=Arvo');
    @import url('https://fonts.googleapis.com/css?family=Patua+One');
    @import url('https://fonts.googleapis.com/css?family=Cookie');
    @import url('https://fonts.googleapis.com/css?family=Vollkorn');
    @import url('https://fonts.googleapis.com/css?family=Varela+Round');
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Bungee+Inline');
    @import url('https://fonts.googleapis.com/css?family=Anton');
    @import url('https://fonts.googleapis.com/css?family=Tangerine');
    @import url('https://fonts.googleapis.com/css?family=Dancing+Script');

</style>
