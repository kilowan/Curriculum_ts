<template>
<div>
    <li v-if="!hide">
      {{ value.name }}
      <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
        <b-icon icon="eye-slash-fill"/>
      </b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-value-${value.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-value-${value.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
    </li>
		<b-modal 
			:id="`edit-value-${value.id}`"
			title="Editar elemento"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<label>Nombre:</label> <input type="text" v-model="value.name" /> <br />
		</b-modal>
		<b-modal 
			:id="`delete-value-${value.id}`" 
			title="Eliminar valor"
			ok-title="Eliminar"
			@ok="deleteValue"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<h1>¿Seguro que quieres eliminar el valor '{{ value.name }}'?</h1>
			</div>
		</b-modal>
</div>
</template>


<script lang="ts">
import axios from 'axios';

export default {
  name: 'ValueView',
  props:{
    value: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      hide: false,
    }
	},
  methods: {
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Value/${this.value.id}`,
			data: {
					name: this.value.name,
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteValue() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Value/${this.value.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
    }
  }
}
</script>

