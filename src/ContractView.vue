<template>
  <div>
    <li v-if="!hide">
      {{ contract.name }}
      <b-link v-if="!iconsHidden" @click="contracted = !contracted, $emit('contract')">
        <b-icon v-if="contracted" icon="chevron-up"/>
        <b-icon v-if="!contracted" icon="chevron-down"/>
      </b-link>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-contract-${contract.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-contract-${contract.id}`)">
        <b-icon icon="x-circle-fill" aria-hidden="true"/>
      </b-link>
      <ul v-if="contract.projects.length > 0">
        <div>
          <project-list-view
            v-if="contracted"
            :projects="contract.projects"
            :iconsHidden="iconsHidden"
            :token="token"
            @contract="$emit('contract')"
            @refresh="$emit('refresh')"
          />
        </div>
      </ul>
        <div v-if="add">
          <input class="m-2" type="text" v-model="projectData" />
          <b-button class="m-2" @click="save">Guardar</b-button>
          <b-button class="m-2" @click="cancel">Cancelar</b-button>
        </div>
        <div>
          <b-link v-if="!add && !iconsHidden" @click="add = true">
            <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir proyecto
          </b-link>
        </div>
    </li>
		<b-modal 
			:id="`edit-contract-${contract.id}`"
			title="Editar contrato"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<input type="text" v-model="contract.name" /> <br />
		</b-modal>
    <b-modal 
      :id="`delete-contract-${contract.id}`" 
      title="Eliminar Contrato"
      ok-title="Eliminar"
      @ok="deleteContract"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <h1>¿Seguro que quieres eliminar el contrato '{{ contract.name }}'?</h1>
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import ProjectListView from './ProjectListView.vue';
import axios from 'axios';

export default {
  name: 'ContractView',
  components: {
	ProjectListView
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
      hide: false,
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
    },
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Contract/${this.contract.id}`,
			data: {
					contractName: this.contract.name
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteContract() {
			await axios({
			method: 'delete',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Contract/${this.contract.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
  },
}
</script>

