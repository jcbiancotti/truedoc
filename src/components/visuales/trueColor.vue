<template>
<div class="container-fluid">

    <input type="color" v-model="selcolor" @change="devolverColor()">

</div>
</template>

<script>
export default {
    name: 'trueColor',
    props:{
        color: String,
        compo: String,
        destino: Function
    },
    data() {
        return {
            defaultcolor: '#FFFFFF',
            selcolor: this.color,      
        }
    },
    methods: {
        devolverColor() {
            this.destino(this.compo, this.selcolor);
        }
    },

}
</script>

