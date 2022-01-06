<template>
  <div>
    <li v-if="!hide">
      <strong>{{ language.name }}:</strong> {{ language.level.name }}
      <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
        <b-icon icon="eye-slash-fill"/>
      </b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-language-${language.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-language-${language.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
    </li>
		<b-modal 
			:id="`edit-language-${language.id}`"
			title="Editar Idioma"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			  <label>Nombre:</label> <input type="text" v-model="language.name" /> <br />
			  <label>Nivel:</label> <b-form-select :options="languageLevelList" v-model="language.level.id" /> <br />
		</b-modal>
		<b-modal 
			:id="`delete-language-${language.id}`" 
			title="Quitar idioma"
			ok-title="Quitar"
			@ok="deleteLanguage"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<h1>¿Seguro que quieres quitar el idioma '{{ language.name }}'?</h1>
			</div>
		</b-modal>
  </div>
</template>


<script lang="ts">
import axios from 'axios';

export default {
  name: 'AcademicTrainingView',
  props:{
    language: {
      type: Object,
      required: true
    },
    languageLevelList: {
      type: Array,
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
			url: `http://localhost:8080/api/Language/${this.language.id}`,
			data: {
					name: this.language.name,
					levelId: this.language.level.id
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteLanguage() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Language/${this.language.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
  }
}
</script>

