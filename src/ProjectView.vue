<template>
  <div>
    <li v-if="!hideProj">
      {{ project.name }}
      <b-link v-if="!iconsHidden && !hideDesc && project.descriptionList.length >0" @click="contract = !contract, $emit('contract')">
        <b-icon v-if="contract" icon="chevron-up"/>
        <b-icon v-if="!contract" icon="chevron-down"/>
      </b-link>
			<b-link v-if="!iconsHidden" @click="$emit('hide'), hideProj = true">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-project-${project.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
      <b-link @click="$bvModal.show(`delete-project-${project.id}`)">
        <b-icon icon="x-circle-fill" aria-hidden="true"/>
      </b-link>
      <ul v-if="contract">
        <div v-for="(description, fourthindex) in project.descriptionList" v-bind:key="fourthindex">
          <description-view
            :iconsHidden="iconsHidden"
            :token="token"
            :description="description"
            @refresh="$emit('refresh')"
            @hide="hidden"
          />
        </div>
      </ul>
      <div v-if="add">
        <input class="m-2" type="text" v-model="description" />
        <b-button class="m-2" @click="save">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <b-link v-if="!add && contract" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir descripción
      </b-link>
      <b-link v-if="!add && !contract" @click="add = true">
        <br /><b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir descripción
      </b-link>
    </li>
		<b-modal 
			:id="`edit-project-${project.id}`"
			title="Editar proyecto"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<input type="text" v-model="project.name" /> <br />
		</b-modal>
    <b-modal 
      :id="`delete-project-${project.id}`" 
      title="Eliminar Proyecto"
      ok-title="Eliminar"
      @ok="deleteProject"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <h1>¿Seguro que quieres eliminar el proyecto '{{ project.name }}'?</h1>
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import descriptionView from './DescriptionView.vue'

export default {
  name: 'ProjectView',
  components: {
    descriptionView
  },
  props:{
    project: {
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
			contract: false,
      add: false,
      counter: 0,
      hideDesc: false,
      hideProj: false,
      description: '',
		}
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0) {
        this.hideDesc = true;
      }
      this.$emit('sizeChange');
    },
    cancel() {
      this.description = '';
      this.add = false;
    },
    async save() {
      if (this.description !== '') {
        await axios({
          method: 'post',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Description`,
          data: {
            name: this.description,
            projectId: this.project.id,
          }
        }).then((data: any) =>{
          this.description = '';
          this.add = false;
          this.$emit('refresh');
        });
      }
    },
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Project/${this.project.id}`,
			data: {
					name: this.project.name,
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteProject() {
			await axios({
			method: 'delete',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Project/${this.project.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
  },
  mounted() {
    this.counter = this.project.descriptionList.length;
  }
}
</script>

