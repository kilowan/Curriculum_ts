<template>
	<li v-if="!hide">
		Proyectos:
		<b-link v-if="!iconsHidden && projects.length >0" @click="contract = !contract, $emit('contract')">
			<b-icon v-if="contract" icon="chevron-up"/>
			<b-icon v-if="!contract" icon="chevron-down"/>
		</b-link>
		<ul v-if="contract">
			<div v-for="(project, thirdindex) in projects" v-bind:key="thirdindex">
				<project-view 
					:project="project"
					:iconsHidden="iconsHidden"
					:token="token"
					@contract="$emit('contract')"
					@refresh="$emit('refresh')"
					@hide="hidden"
				/>
			</div>
		</ul>
	</li>
</template>


<script lang="ts">
import ProjectView from './ProjectView.vue';

export default {
  name: 'ProjectListView',
  components:{
	  ProjectView,
  },
  props:{
    projects: {
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
			contract: false,
			hide: false,
			counter: 0,
			contracted: false
		}
	},
	methods: {
		hidden() {
			this.counter--;
			if (this.counter == 0) {
				this.hide = true;
			}
			this.$emit('sizeChange');
		},
	},
	mounted() {
		this.counter = this.projects.length;
	}
}
</script>

