<template>
	<div>
		<li v-if="!hide">
			{{academic.name}}
			<b-link v-if="!iconsHidden" @click="contract = !contract, $emit('sizeChange')">
				<b-icon v-if="contract" icon="chevron-up"/>
				<b-icon v-if="!contract" icon="chevron-down"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-training-${academic.id}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-training-${academic.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
			<ul v-if="contract">
				<li>Centro/ Lugar: {{academic.place}}</li>
				<li v-if="academic.graduationDate">Graduación: {{new Date(academic.graduationDate).getFullYear()}}</li>
				<div v-if="academic.contents.length >0">
					<contents-view
						:contents="academic.contents"
						:type="ContentType.academic"
						:token="token" :trainingId="academic.id"
						:iconsHidden="iconsHidden"
						@sizeChange="$emit('sizeChange')"
						@refresh="$emit('refresh')"
					/>
				</div>
				<div v-if="add">
					<input class="m-2" type="text" v-model="element" />
					<b-button class="m-2" @click="save">Guardar</b-button>
					<b-button class="m-2" @click="cancel">Cancelar</b-button>
				</div>
				<b-link v-if="!iconsHidden" @click="add = true">
					<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contenido
				</b-link>
			</ul>
		</li>
		<b-modal 
			:id="`edit-training-${academic.id}`"
			title="Editar formación"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<label>Nombre:</label> <input type="text" v-model="academic.name" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="academic.place" /> <br />
			<div v-if="academic.graduationDate">
				<label>Graduación:</label> <b-form-datepicker
				v-model="academic.graduationDate"
				min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
			</div>
		</b-modal>
		<b-modal 
			:id="`delete-training-${academic.id}`" 
			title="Eliminar Contrato"
			ok-title="Eliminar"
			@ok="deleteTraining"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<h1>¿Seguro que quieres eliminar el contrato '{{ academic.name }}'?</h1>
			</div>
		</b-modal>
	</div>
</template>


<script lang="ts">
import ContentsView from './ContentsView.vue'
import { ContentType } from './Config/types'
import axios from 'axios';

export default {
  name: 'AcademicTrainingView',
  components: {
    ContentsView
  },
  props:{
    academic: {
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
			ContentType: ContentType,
			contract: false,
			hide: false,
			add: false,
			element: '',
		}
	},
	methods: {
		cancel() {
			this.element = '';
			this.add = false;
		},
		async save() {
			if (this.element !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Content`,
				data: {
					name: this.element,
					trainingId: this.academic.id,
				}
				}).then((data: any) =>{
					this.element = '';
					this.add = false;
					this.$emit('refresh');
				});
			}
		},
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Training/${this.academic.id}`,
			data: {
					name: this.academic.name,
					place: this.academic.place,
					graduationDate: this.academic.initDate
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteTraining() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Training/${this.academic.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

