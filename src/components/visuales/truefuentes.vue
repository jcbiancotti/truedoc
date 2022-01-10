<template>
<div class="container-fluid">

    <select id="fuentes" :value="valor" class="form-control" @click="setData">
        <option v-for="opc of aFuentes" :key="opc.valor" class="form-control" :value="opc.texto">{{opc.texto}}</option>
    </select>

</div>
</template>

<script>

export default {
    name: 'truefuentes',
    data() {
        return {
            aFuentes: [
                {valor: 1,  texto: 'Anton'},
                {valor: 2,  texto: 'Audiowide'},
                {valor: 3,  texto: 'Bungee Inline'},
                {valor: 4,  texto: 'Cabin'},
                {valor: 5,  texto: 'Cookie'},
                {valor: 6,  texto: 'Dancing Script'},
                {valor: 7,  texto: 'Lato'},
                {valor: 8,  texto: 'Montserrat'},
                {valor: 9,  texto: 'Open Sans'},
                {valor: 10, texto: 'Oswald'},
                {valor: 11, texto: 'Patua One'},
                {valor: 12, texto: 'Pt+Sans'},
                {valor: 13, texto: 'Roboto'},
                {valor: 14, texto: 'Roboto Slab'},
                {valor: 15, texto: 'Sofia'},
                {valor: 16, texto: 'Tangerine'},
                {valor: 17, texto: 'Titan One'},
                {valor: 18, texto: 'Trirong'},
                {valor: 19, texto: 'Varela Round'},
                {valor: 20, texto: 'Vollkorn'}
            ],
        }
    },
    props: ['id','valor'],
	methods: {

        // devolver la fuente seleccionada
		setData(e) {
			this.$emit("getData", this.id, e.target.value);
		},

	},

}
</script>

<style scoped>


</style>
