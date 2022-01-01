<template>
	<li>
    {{contract.name}}
    <b-link v-if="!iconsHidden" @click="contracted = !contracted, $emit('contract')">
      <b-icon v-if="contracted" icon="chevron-up"/>
      <b-icon v-if="!contracted" icon="chevron-down"/>
    </b-link>
    <projects 
      v-if="contracted && contract.projects.length > 0" 
      :projects="contract.projects"
      :iconsHidden="iconsHidden"
      @contract="$emit('contract')" 
    /> <br />
      <div v-if="add">
        <input class="m-2" type="text" v-model="projectData" />
        <b-button class="m-2" @click="save">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
    <b-link v-if="!add" @click="add = true">
      <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir proyecto
    </b-link>
	</li>
</template>


<script lang="ts">
import Projects from './ProjectsView.vue';
import axios from 'axios';

export default {
  name: 'ContractView',
  components: {
	Projects
  },
  props:{
    contract: {
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
      contracted: false,
      add: false,
      projectData: '',
    }
	},
  methods: {
    cancel() {
      this.projectData = '';
      this.add = false;
    },
    async save() {
      if (this.projectData !== '') {
        await axios({
          method: 'post',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Project`,
          data: {
            name: this.projectData,
            contractId: this.contract.id,
          }
        }).then((data: any) =>{
          this.projectData = '';
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

