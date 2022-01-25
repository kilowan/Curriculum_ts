<template>
	<div v-if="!hide">	
		<dt id="experiencia" v-if="experience">Experiencia
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('contract')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
		</dt>
		<dd id="experience" v-if="experience">
			<ul>
				<div v-for="(company, firstindex) in experience" v-bind:key="firstindex">
					<professional-experience-view 
						:token="token" 
						:company="company"
						:iconsHidden="iconsHidden"
						@refresh="$emit('refresh')"
						@contract="$emit('contract')"
						@hide="hidden"
					/>
				</div>
			</ul>
			<b-link v-if="!iconsHidden" @click="$bvModal.show('add-experience')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir experiencia
			</b-link>
		</dd>
		<dd class="clear"></dd>
		<b-modal 
			:id="'add-experience'" 
			title="Añadir Experiencia"
			ok-title="Guardar"
			@ok="save"
			@cancel="cancel"
		>
			<label>Nombre</label> <input type="text" v-model="experienceNew" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="place" /> <br />
			<label>Tipo</label> <b-form-select :options="options()" v-model="typeSelected"></b-form-select> <br />
			<label>Fecha de inicio</label> <input type="date"
				v-model="initDate"
				min="2015-01-01" max="2030-12-31"> <br />
			<label>Fecha de fin</label> <input type="date"
				v-model="finishDate"
				min="2015-01-01" max="2030-12-31"> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">

import ProfessionalExperienceView from './ProfessionalExperienceView.vue';
import axios from 'axios';
//import { ExperienceType } from './Config/types';

export default {
  name: 'ProfessionalExperienceListView',
  components: {
	ProfessionalExperienceView
  },
  props:{
    experience: {
      type: Array,
      required: true
    },
    curriculumId: {
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
			add: false,
			counter: 0,
			experienceNew: '',
			typeSelected: 1,
			initDate: '2021-12-08',
			finishDate: '2021-12-08',
			place: '',
		}
	},
	methods: {
		hidden() {
			this.counter--;
			if (this.counter == 0 && this.experience.length >= 1) {
				this.hide = true;
			}
			this.$emit('contract');
		},
		cancel() {
          this.experienceNew = '';
		  this.initDate = '2021-12-08';
		  this.finishDate = '2021-12-08'
		  this.place = '';
		  this.typeSelected = 1;
          this.add = false;
		},
		options: function() {
			return [
					{ value: 1, text: 'personal' },
					{ value: 2, text: 'professional' }
				];
		},
		async save() {
			if (this.experienceNew !== '') {
				await axios({
					method: 'post',
					headers: { Authorization: `Bearer ${this.token}` },
					url: `http://localhost:8080/api/Experience`,
					data: {
					curriculumId: this.curriculumId,
					name: this.experienceNew,
					initDate: this.initDate,
					finishDate: this.finishDate !== ''? this.finishDate : null,
					place: this.place,
					type: this.typeSelected
					}
				}).then((data: any) =>{
					this.experienceNew = '';
					this.initDate = '2021-12-08';
					this.finishDate = '2021-12-08'
					this.place = '';
					this.typeSelected = 1;
					this.add = false;
					this.$emit('refresh');
				});
			}
		}
	},
	mounted() {
		this.counter = this.experience.length;
	}
}
</script>

