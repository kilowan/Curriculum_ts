<template>
	<div v-if="!hide">
		<dt id="idiomas" class="idiomas" v-if="languageList.length > 0">Idiomas
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="languages" v-if="languageList">
			<ul>
				<div v-for="(languages, firstindex) in languageList" v-bind:key="firstindex">
          <language-view 
            :language="languages"
            :languageLevelList="languageLevelList"
            :token="token"
            :iconsHidden="iconsHidden"
            @hide="hiden"
            @refresh="refresh"
          />
				</div>
			</ul>
			<b-link v-if="!iconsHidden" @click="$bvModal.show('add-language')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir idioma
			</b-link>
		</dd>
    <dd class="clear"></dd>
		<b-modal
			:id="'add-language'"
			title="Añadir Idioma"
			ok-title="Guardar"
			@ok="save"
			@cancel="cancel"
		>
      <div v-if="languageNew == '' && langList.length > 0 && !newAdd">
        <label>Idioma</label> <b-form-select :options="langList" v-model="languageIdAdd" ></b-form-select>
        <b-button v-if="!languageIdAdd" class="m-2" @click="newAdd = true">Nuevo</b-button>
      </div>
      <div v-if="!languageIdAdd && langList.length === 0"><label>Nombre</label> <input type="text" v-model="languageNew" /></div>
      <label>Nivel</label> <b-form-select :options="languageLevelList" v-model="typeSelected" /> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import LanguageView from './LanguageView.vue';
import axios from 'axios';

export default {
  name: 'AcademicTrainingView',
  components:{
    LanguageView
  },
  props:{
    languageList: {
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
      hide: false,
      add: false,
      counter: 0,
      languageNew: '',
      languageIdAdd: 0,
      languageLevelList: [],
      langList: [],
      newAdd: false,
      typeSelected: 0,
    }
	},
  methods: {
    refresh() {
      this.getLanguages();
      this.$emit('refresh');
    },
    async getLanguages() {
      await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${this.token}` },
        url: `http://localhost:8080/api/Language/${this.curriculumId}`
      }).then((data: any) => {
        this.langList = data.data.map((lang: any) => {
          return { value: lang.id, text: lang.name };
        });
      });
    },
    async getLanguageLevels() {
      await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${this.token}` },
        url: `http://localhost:8080/api/LanguageLevel`
      }).then((data: any) => {
        this.languageLevelList = data.data.map((lang: any) => {
          return { value: lang.id, text: lang.name };
        });
      });
    },
    hiden() {
      this.counter--;
      if (this.counter == 0 && this.languageList.length >= 1) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
		cancel() {
			this.languageNew = '';
			this.add = false;
      this.newAdd = false;
      this.languageIdAdd = 0;
      this.typeSelected = 0;
		},
		async save() {
			if (this.languageNew !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Language`,
				data: {
					name: this.languageNew,
					curriculumId: this.curriculumId,
					levelId: this.typeSelected,
				}
				}).then((data: any) =>{
					this.cancel();
					this.$emit('refresh');
				});
			} else {
				await axios({
				  method: 'put',
				  headers: { Authorization: `Bearer ${this.token}` },
				  url: `http://localhost:8080/api/Language/${this.languageIdAdd}/${this.curriculumId}/${this.typeSelected}`
				}).then((data: any) =>{
					this.cancel();
					this.$emit('refresh');
				});
      }
		}
  },
  async mounted() {
    this.counter = this.languageList.length;
    this.getLanguageLevels();
    this.getLanguages();
  },
}
</script>

