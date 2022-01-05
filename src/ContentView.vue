<template>
	<div v-if="!hide">
    <li>
      {{ contentData.name }}
      <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
        <b-icon icon="eye-slash-fill"/>
      </b-link>
      <b-link v-if="editMode" @click="$bvModal.show(`edit-content-${contentData.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
      <b-link v-if="content.subContents.length === 0 && editMode" @click="$bvModal.show(`add-subcontents-${contentData.id}`)">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/>
      </b-link>
      <b-link v-if="content.subContents.length === 0 && editMode" @click="$bvModal.show(`delete-content-${contentData.id}`)">
        <b-icon icon="x-circle-fill" aria-hidden="true"/>
      </b-link>
      <ul>
        <div v-for="(subcontent, thirdindex) in content.subContents" v-bind:key="thirdindex">
          <sub-content
            :editMode="editMode" 
            :token="token" 
            :subContent="subcontent" 
            :type="type"
            :iconsHidden="iconsHidden"
            @refresh="$emit('refresh')"
            @hide="$emit('hide')"
          />
        </div>
        <b-link v-if="editMode && content.subContents.length > 0" @click="$bvModal.show(`add-subcontent-${contentData.id}`)">
          <b-icon icon="plus-circle-fill" aria-hidden="true"/>Añadir SubContenido
        </b-link>
      </ul>
    </li>
    <b-modal 
      :id="`delete-content-${contentData.id}`" 
      title="Eliminar Contenido"
      ok-title="Eliminar"
      @ok="deleteContent"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <h1>¿Seguro que quieres eliminar el elemento '{{ contentData.name }}'?</h1>
      </div>
    </b-modal>
    <b-modal 
      :id="`edit-content-${contentData.id}`" 
      title="Editar Contenido"
      ok-title="Guardar"
      @ok="save"
      @cancel="cancel"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <input class="m-2" type="text" v-model="contentData.name" />
      </div>
    </b-modal>
    <b-modal 
      :id="`add-subcontent-${contentData.id}`" 
      title="Añadir SubContenido"
      ok-title="Guardar"
      @ok="addOne(subcontent)"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <input class="m-2" type="text" placeholder="Nuevo subcontenido" v-model="subcontent" />
      </div>
    </b-modal>
    <b-modal 
      :id="`add-subcontents-${contentData.id}`" 
      title="Añadir SubContenido"
      ok-title="Guardar"
      @ok="AddSubContent"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <ul>
          <li v-for="(subcontent, i) in subContents" v-bind:key="i">
            {{subcontent}}
          </li>
        </ul>
        <input class="m-2" type="text" placeholder="Nuevo subcontenido" v-model="subcontent" />
        <b-link @click="add(subcontent)">
          <b-icon icon="plus-circle-fill" aria-hidden="true"/>
        </b-link>
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import  SubContent  from './SubContentView.vue';

export default {
  name: 'ContentView',
  components:{
    SubContent
  },
  props:{
    content: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    }
  },
  data() {
		return {
      edit: false,
      hide: false,
      contentData: {
        id: Number.prototype,
        name: String.prototype,
      },
      subcontent: String.prototype,
      subContents: new Array<string>(),
    }
	},
  methods:{
    add(subContent: string){
      this.subContents.push(subContent);
      this.subcontent = '';
    },
    addOne(subContent: string) {
      this.subContents.push(subContent);
      this.subcontent = '';
      this.AddSubContent();
    },
    async AddSubContent(){
      if (this.subContents.length > 0) {
        await axios({
          method: 'post',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/SubContent`,
          data:{
            subContents: this.subContents,
            contentId: this.content.id
          }
        }).then((data: any) =>{
          this.subContents = [];
          this.$emit('refresh');
        });
      }
    },
    cancel(){
      this.contentData = this.content;
      this.edit = false;
    },
    async deleteContent(){
      if (this.contentData.id) {
        await axios({
          method: 'delete',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Content/${this.contentData.id}`,
        }).then((data: any) =>{
          this.$emit('refresh');
        });
      }
    },
    async save(){
      if (this.contentData.name !== '') {
        await axios({
          method: 'put',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Content/${this.contentData.id}/${this.contentData.name}`,
        }).then((data: any) =>{
          this.edit = false;
          this.$emit('refresh');
        });
      }
    },
  },
  mounted(){
    this.contentData = {
      id: this.content.id,
      name: this.content.name
    };
  }
}
</script>

