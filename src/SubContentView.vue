<template>
	<div>
      <li v-if="!hide">
        {{ subContentData.name }}
        <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
          <b-icon icon="eye-slash-fill"/>
        </b-link>
        <b-link v-if="editMode" @click="$bvModal.show(`edit-subcontent-${subContentData.id}`)">
          <b-icon icon="pencil-square" aria-hidden="true"/>
        </b-link>
        <b-link v-if="editMode" @click="$bvModal.show(`delete-subcontent-${subContentData.id}`)">
          <b-icon icon="x-circle-fill" aria-hidden="true"/>
        </b-link>
      </li>
    <b-modal 
			:id="`delete-subcontent-${subContentData.id}`" 
			title="Eliminar Contenido"
      ok-title="Eliminar"
      @ok="deleteContent"
		>
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <h1>¿Seguro que quieres eliminar el elemento '{{ subContentData.name }}'?</h1>
			</div>
		</b-modal>
		<b-modal 
			:id="`edit-subcontent-${subContentData.id}`" 
			title="Editar Contenido"
      ok-title="Guardar"
      @ok="save"
      @cancel="cancel"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
        <input class="m-2" type="text" v-model="subContentData.name" />
			</div>
		</b-modal>
	</div>
</template>


<script lang="ts">
import axios from 'axios';

export default {
  name: 'SubContentView',
  props:{
    subContent: {
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
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    }
  },
  data() {
		return {
      edit: false,
      subContentData: {
        id: Number.prototype,
        name: String.prototype,
      },
      hide: false,
    }
	},
  methods:{
    cancel(){
      this.subContentData = this.subContent;
      this.edit = false;
    },
    async deleteContent(){
      if (this.subContentData.id) {
        await axios({
          method: 'delete',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/SubContent/${this.subContentData.id}`,
        }).then((data: any) =>{
          this.$emit('refresh');
        });
      }
    },
    async save(){
      if (this.subContentData.name !== '') {
        await axios({
          method: 'put',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Content/${this.subContentData.id}/${this.subContentData.name}`,
        }).then((data: any) =>{
          this.edit = false;
          this.$emit('refresh');
        });
      }
    },
  },
  mounted(){
    this.subContentData = {
      id: this.subContent.id,
      name: this.subContent.name
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

