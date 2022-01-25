<template>
	<div>
		<li v-if="!hide">
			{{company.name}}
			<b-link v-if="!iconsHidden" @click="contract = !contract, $emit('contract')">
				<b-icon v-if="contract" icon="chevron-up"/>
				<b-icon v-if="!contract" icon="chevron-down"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-experience-${company.id}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-experience-${company.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
			<ul v-if="contract">
			<li>Centro/Lugar: {{ company.place }}</li>
			<li>Fecha inicio: {{new Date(company.initDate).toLocaleDateString()}}</li>
			<li v-if="company.finishDate">Fecha Fin: {{new Date(company.finishDate).toLocaleDateString()}}</li>
				<contract-list-view
					v-if="company.contracts.length > 0" 
					:contracts="company.contracts" 
					:iconsHidden="iconsHidden"
					:token="token"
					@contract="$emit('contract')"
					@refresh="$emit('refresh')"
				/>
				<div v-if="add">
					<input class="m-2" type="text" v-model="contractData" />
					<b-button class="m-2" @click="save()">Guardar</b-button>
					<b-button class="m-2" @click="cancel">Cancelar</b-button>
				</div>
				<b-link v-if="!add && !iconsHidden" @click="add = true">
					<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contrato
				</b-link>
			</ul>
		</li>
		<b-modal 
			:id="`edit-experience-${company.id}`"
			title="Editar Experiencia"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
			@refresh="$emit('refresh')"
		>
			<label>Nombre</label> <input type="text" v-model="company.name" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="company.place" /> <br />
			<label>Fecha de inicio</label> <b-form-datepicker
				v-model="company.initDate"
				min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
			<label>Fecha de fin</label> <b-form-datepicker
				v-model="company.finishDate"
				min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
		</b-modal>
		<b-modal 
		:id="`delete-experience-${company.id}`" 
		title="Eliminar Contrato"
		ok-title="Eliminar"
		@ok="deleteContract"
		>
		<div style="text-align: center; margin: 0 auto; width:380px;">
			<h1>¿Seguro que quieres eliminar el contrato '{{ company.name }}'?</h1>
		</div>
		</b-modal>
	</div>
</template>


<script lang="ts">

import ContractListView from './ContractListView.vue';
import axios from 'axios';

export default {
  name: 'ProfessionalExperienceView',
  components: {
	ContractListView
  },
  props:{
    company: {
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
    }
  },
  data() {
		return {
			contract: false,
			add: false,
			hide: false,
			contractData: '',
		}
	},
	methods: {
		async save() {
			if (this.contractData !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Contract`,
				data: {
					contractName: this.contractData,
					experienceId: this.company.id,
				}
				}).then((data: any) =>{
					this.contractData = '';
					this.add = false;
					this.$emit('refresh');
				});
			}
		},
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Experience/${this.company.id}`,
			data: {
					name: this.company.name,
					place: this.company.place,
					initDate: this.company.initDate,
					finishDate: this.company.finishDate
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteContract() {
			await axios({
			method: 'delete',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Experience/${this.company.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

