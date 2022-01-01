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
						:experienceId="company.id"
						@refresh="$emit('refresh')"
						@contract="$emit('contract')" 
					/>
				</div>
				<b-link @click="$bvModal.show('add-experience')">
					<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir experiencia
				</b-link>
			</ul>
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
			experienceNew: '',
			typeSelected: 1,
			initDate: '2021-12-08',
			finishDate: '2021-12-08',
			place: '',
		}
	},
	methods: {
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
			finishDate: this.finishDate,
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

