<template>
	<div v-if="!hide">	
		<dt id="academica" v-if="academicTraining">Formación
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="academic" v-if="academicTraining">
			<ul>
				<div v-for="(academic, firstindex) in academicTraining" v-bind:key="firstindex">
					<academic-training-view 
            :academic="academic"
            :token="token"
            :iconsHidden="iconsHidden"
            @hide="hidden"
            @sizeChange="$emit('sizeChange')"
            @refresh="$emit('refresh')"
          />
				</div>
			</ul>
    <b-link v-if="!iconsHidden" @click="$bvModal.show('add-training')">
      <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir formación
    </b-link>
		</dd>
		<dd class="clear"></dd>
		<b-modal 
			:id="'add-training'"
			title="Añadir Formación"
			ok-title="Guardar"
			@ok="save"
			@cancel="cancel"
		>
			<label>Nombre</label> <input type="text" v-model="trainingNew" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="place" /> <br />
			<label>Graduación</label> <input type="date"
				v-model="graduationDate"
				min="2015-01-01" max="2030-12-31"> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import { ContentType } from './Config/types'
import AcademicTrainingView from './AcademicTrainingView.vue';
import axios from 'axios';

export default {
  name: 'AcademicTrainingListView',
  components: {
    AcademicTrainingView
  },
  props:{
    academicTraining: {
      type: Array,
      required: true
    },
    curriculumId: {
      type: Number,
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
      hide: false,
      counter: 0,
      trainingNew: '',
      place: '',
      graduationDate: null,
      add: false,
		}
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0 && this.academicTraining.length >= 1) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
    cancel() {
      this.trainingNew = '';
      this.place = '';
      this.graduationDate = null;
      this.add = false;
    },
    async save() {
      if (this.trainingNew !== '') {
        await axios({
          method: 'post',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Training`,
          data: {
            name: this.trainingNew,
            place: this.place,
            graduationDate: this.graduationDate === '' ? null : this.graduationDate,
            curriculumId: this.curriculumId,
            type: 1,
          }
        }).then((data: any) =>{
          this.cancel();
          this.$emit('refresh');
        });
      }
    }
  },
  mounted(){
    this.counter = this.academicTraining.length;
  },
}
</script>

