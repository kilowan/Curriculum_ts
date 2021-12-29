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
            @refresh="$emit('refresh')"
            @hide="$emit('hide')"
          />
        </div>
        <b-link v-if="editMode" @click="$bvModal.show(`add-subcontent-${contentData.id}`)">
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

