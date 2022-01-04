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
            :token="token" 
            :iconsHidden="iconsHidden" 
            @hide="hiden"
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
      <label>Nombre</label> <input type="text" v-model="languageNew" /> <br />
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
      languageLevelList: [],
      typeSelected: 0,
    }
	},
  methods: {
    hiden() {
      this.counter--;
      if (this.counter == 0) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
		cancel() {
			this.languageNew = '';
			this.add = false;
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
			}
		}
  },
  async mounted() {
    this.counter = this.languageList.length;
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

