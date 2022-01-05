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
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-experience-${experienceId}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
			<ul v-if="contract">
			<li>Centro/Lugar: {{ company.place }}</li>
			<li>Fecha inicio: {{new Date(company.initDate).toLocaleDateString()}}</li>
			<li>Fecha Fin: {{new Date(company.finishDate).toLocaleDateString()}}</li>
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
			:id="`edit-experience-${experienceId}`"
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
    },
    experienceId: {
      type: Number,
      required: true
    },
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
					experienceId: this.experienceId,
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
			url: `http://localhost:8080/api/Experience/${this.experienceId}`,
			data: {
					name: this.company.name,
					place: this.company.place,
					initDate: this.company.initDate,
					finishDate: this.company.finishDate
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

<style>
* { margin: 0; padding: 0; }
body { font: 16px Helvetica, Sans-Serif; line-height: 24px; background: url(./images/noise.jpg); }
.clear { clear: both; }
.idiomas { border-right: 1px solid #999; }
.otros { border-right: 1px solid #999; }
#page-wrap { width: 1000px; margin: 40px auto 60px; }
#pic { float: right; margin: -30px 0 0 0; height: 100px; }
h1 { margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 34px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999; }
h2 { font-size: 20px; margin: 0 0 6px 0; position: relative; }
h2 span { position: absolute; bottom: 0; right: 0; font-style: italic; font-family: Georgia, Serif; font-size: 16px; color: #999; font-weight: normal; }
p { margin: 0 0 16px 0; }
a { color: #999; text-decoration: none; border-bottom: 1px dotted #999; }
a:hover { border-bottom-style: solid; color: black; }
ul { margin: 0 0 32px 17px; }
li { font-size: 20px; }
#objective { width: 100%; float: left; }
#objective p { font-family: Georgia, Serif; font-style: italic; color: #666; }
dt { font-style: italic; font-weight: bold; font-size: 18px; text-align: right; padding: 0 26px 0 0; width: 150px; float: left; border-right: 1px solid #999;  }
dd { width: 800px; float: right; }
dd.clear { float: none; margin: 0; height: 15px; }
.formacion { border-right: 1px solid #999; }
.formacion2 { border-right: 1px solid #999; }
  .marco {
    margin:2%;
	border-style: groove; border-width: 1px;
  }
</style>

