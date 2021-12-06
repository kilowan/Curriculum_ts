<template>
	<div>
		<div v-if="add">
			<label>Nombre:</label>
			<input type="text" v-model="name" :required="true"/>
			<label>Lugar:</label>
			<input type="text" v-model="place" :required="true"/>
			<label>Fecha de inicio/ Fin:</label>
			<input type="text" v-model="date" :required="true"/>
			<div>{{ message }}</div>
			<button @click="sendAndClear()">Añadir</button><button @click="$emit('cancelar')">Cancelar</button>
		</div>
	</div>
</template>

<script>

//in progress
export default {
  name: 'contractNew',
  props: ['add'],
  components: {},
  data:function() {
		return {
			name: '',
			place: '',
			date: '',
			message: undefined
		}
	},
  methods: {
	sendAndClear() {
		if(this.isEmpty(this.name) || this.isEmpty(this.place) || this.isEmpty(this.date)) {
			this.message = 'Faltan campos';
		} else {
			let contract = { name: this.name, place: this.place, date: this.date };
			this.name = '';
			this.place = '';
			this.date = '';
			this.message = undefined;
			this.$emit('add', contract);
		}
	},
	isEmpty: function(input) {
		return input.length == 0? true : false;
	},
  },
  mounted:function() {}
}
</script>

<style>
</style>
