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
                {valor: 1, texto: 'Anton'},
                {valor: 2, texto: 'Arvo'},
                {valor: 3, texto: 'Audiowide'},
                {valor: 4, texto: 'Bungee Inline'},
                {valor: 5, texto: 'Cabin'},
                {valor: 6, texto: 'Cookie'},
                {valor: 7, texto: 'Dancing Script'},
                {valor: 8, texto: 'Droid Sans'},
                {valor: 9, texto: 'Lato'},
                {valor: 10, texto: 'Montserrat'},
                {valor: 11, texto: 'Open Sans'},
                {valor: 12, texto: 'Patua One'},
                {valor: 13, texto: 'Pt+Sans'},
                {valor: 14, texto: 'Roboto'},
                {valor: 15, texto: 'Roboto Slab'},
                {valor: 16, texto: 'Sofia'},
                {valor: 17, texto: 'Tangerine'},
                {valor: 18, texto: 'Titan One'},
                {valor: 19, texto: 'Trirong'},
                {valor: 20, texto: 'Varela Round'},
                {valor: 21, texto: 'Vollkorn'}
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
