<template>
	<div v-if="!hide">	
		<dt id="complementaria" v-if="otherTraining">Skills
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
		</dt>
		<dd id="complementary" v-if="otherTraining">
			<ul>
				<div v-for="(skill, firstindex) in otherTraining" v-bind:key="firstindex">
					<skill-view
						:token="token" 
						:skill="skill"
						:iconsHidden="iconsHidden"
						@sizeChange="$emit('sizeChange')"
						@hide="hidden"
						@refresh="$emit('refresh')"
					/>
				</div>
			</ul>
			<div v-if="add">
				<input type="text" v-model="trainingNew" />
				<b-button class="m-2" @click="save">Guardar</b-button>
				<b-button class="m-2" @click="cancel">Cancelar</b-button>
			</div>
			<b-link v-if="!iconsHidden" @click="add = true">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Skill
			</b-link>
		</dd>
		<dd class="clear"></dd>
	</div>
</template>

<script lang="ts">
import SkillView from './SkillView.vue';
import { ContentType } from './Config/types'
import axios from 'axios';

export default {
  name: 'ComplementaryExperienceListView',
  components: {
    SkillView
  },
  props:{
    otherTraining: {
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
			add: false,
		}
	},
	methods: {
		hidden() {
			this.counter--;
			if (this.counter == 0 && this.otherTraining.length >= 1) {
				this.hide = true;
			}
			this.$emit('sizeChange');
		},
		cancel() {
			this.trainingNew = '';
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
					curriculumId: this.curriculumId,
					type: 2,
				}
				}).then((data: any) =>{
					this.cancel();
					this.$emit('refresh');
				});
			}
		}
	},
	mounted(){
		this.counter = this.otherTraining.length;
	},
}
</script>
