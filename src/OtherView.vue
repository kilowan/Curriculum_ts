<template>
  <div>
    <li v-if="!hide">
      {{otherData.name}}
			<b-link v-if="!iconsHidden" @click="contract = !contract, $emit('sizeChange')">
				<b-icon v-if="!contract" icon="chevron-up"/>
				<b-icon v-if="contract" icon="chevron-down"/>
			</b-link>
      <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
        <b-icon icon="eye-slash-fill"/>
      </b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-other-${otherData.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-other-${otherData.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
      <ul v-if="!contract && otherData.values.length > 0">
        <div v-for="(value, secondindex) in otherData.values" v-bind:key="secondindex">
          <value-view
            :value="value"
            :token="token"
            :iconsHidden="iconsHidden"
            @hide="$emit('sizeChange')"
            @refresh="$emit('refresh')"
          />
        </div>
      </ul>
        <div v-if="!iconsHidden">
          <b-link @click="$bvModal.show(`add-value-${otherData.id}`)">
            <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir elemento
          </b-link>
        </div>
    </li>
		<b-modal 
			:id="`add-value-${otherData.id}`"
			title="Añadir otro"
			ok-title="Guardar"
			@ok="save"
			@cancel="cancel"
      @refresh="$emit('refresh')"
		>
			<label>Nombre</label> <input type="text" v-model="valueNew" /> <br />
		</b-modal>
		<b-modal
			:id="`edit-other-${otherData.id}`"
			title="Editar Otros"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
      <label>Nombre:</label> <input type="text" v-model="otherData.name" /> <br />
		</b-modal>
		<b-modal 
			:id="`delete-other-${otherData.id}`" 
			title="Eliminar elemento"
			ok-title="Eliminar"
			@ok="deleteOther"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<h1>¿Seguro que quieres eliminar el elemento '{{ otherData.name }}'?</h1>
			</div>
		</b-modal>
  </div>
</template>


<script lang="ts">
import valueView from './ValueView.vue';
import axios from 'axios';

export default {
  name: 'OtherView',
  components: {
    valueView,
  },
  props:{
    otherData: {
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
      hide: false,
      add: false,
      contract: false,
      valueNew: '',
    }
	},
  methods: {
    cancel() {
      this.valueNew = '';
      this.add = false;
    },
    async save() {
      if (this.valueNew !== '') {
        await axios({
          method: 'post',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Value`,
          data: {
            name: this.valueNew,
            otherDataId: this.otherData.id
          }
        }).then((data: any) =>{
          this.cancel();
          this.$emit('refresh');
        });
      }
    },
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/OtherData/${this.otherData.id}`,
			data: {
					name: this.otherData.name
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteOther() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/OtherData/${this.otherData.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
  }
}
</script>

