<template>
	<div id="page-wrap">
		<b-link v-if="!iconsHidden" @click="iconsHidden = true">
			<b-icon icon="eye-slash-fill"/>
		</b-link>
		<div id="contact-info" class="vcard">
			<h1 class="fn">{{ data.fullName }}</h1>
			<div v-if="data.phoneNumber">
				<b-icon icon="telephone-fill" aria-hidden="true"/> <span>{{ data.phoneNumber.number }}</span><br />
			</div>
			<div v-if="data.email">
				<b-icon icon="envelope" aria-hidden="true"/> <a :href="'mailto:'+ data.email.fullEmail">{{ data.email.fullEmail }}</a><br />
			</div>
		</div>
		<social-media-list-view 
			:token="token" 
			:socialMedia="data.socialMedia"
			:iconsHidden="iconsHidden"
		/>				
		<div id="objective">
			<p>{{ data.description }}</p>
		</div>		
		<div class="clear">{{EditMode('')}}</div>	
		<dl>
			<professional-experience-list-view 
				v-if="data.experience.length > 0"
				:token="token"
				:experience="data.experience"
				:iconsHidden="iconsHidden"
				:curriculumId="curriculumId"
				@contract="EditMode"
				@refresh="getCurriculum(curriculumId)"
			/>
			<academic-training-list-view 
				v-if="data.academicTraining.length > 0" 
				:token="token" 
				:academicTraining="data.academicTraining"
				:iconsHidden="iconsHidden"
				:curriculumId="curriculumId"
				@sizeChange="EditMode"
				@refresh="getCurriculum(curriculumId)" 
			/>
			<skill-list-view 
				v-if="data.otherTraining.length > 0" 
				:token="token"  
				:otherTraining="data.otherTraining"
				:iconsHidden="iconsHidden"
				:curriculumId="curriculumId"
				@sizeChange="EditMode"
				@contract="EditMode" 
				@refresh="getCurriculum(curriculumId)" 
			/>
			<language-list-view 
				v-if="data.languageList.length > 0" 
				:token="token" 
				:languageList="data.languageList"
				:curriculumId="curriculumId"
				:iconsHidden="iconsHidden"
				@sizeChange="EditMode"
				@refresh="getCurriculum(curriculumId)"
			/>			
			<other-list-view
				v-if="data.otherData"  
				:token="token"
				:curriculumId="curriculumId"
				:other="data.otherData"
				:iconsHidden="iconsHidden"
				@sizeChange="EditMode"
				@refresh="getCurriculum(curriculumId)"
			/>
		</dl>
		<dd class="clear"></dd>
	</div>
</template>


<script lang="ts">
import  AcademicTrainingListView from './AcademicTrainingListView.vue';
import  OtherListView from './OtherListView.vue';
import ProfessionalExperienceListView from './ProfessionalExperienceListView.vue';
import SkillListView from './SkillListView.vue';
import LanguageListView from './LanguageListView.vue';
import SocialMediaListView from './SocialMediaListView.vue';
import axios from 'axios';
import { SocialMediaType } from './Config/types';

export default {
  name: 'CurriculumView',
  components: {
	AcademicTrainingListView,
	OtherListView,
	ProfessionalExperienceListView,
	SkillListView,
	LanguageListView,
	SocialMediaListView
  },
  data() {
		return {
			edit: false,
			page: 'select',
			selected: undefined,
			name: '',
			add: false,
			message: '',
			data: {},
			token: '',
			curriculumId: '',
			SocialMediaType: SocialMediaType,
			iconsHidden: false
		}
	},
  methods: {
	EditMode(data:string){
        this.$nextTick(() => {
			this.exp();
			this.comp();
			this.academic();
			this.lang();
			this.other();
			return data;
        });
	},
	exp: function () {
		let experiencia: HTMLElement|null = document.querySelector('#experiencia');
		let experience: HTMLElement|null = document.querySelector('#experience');
		if(experiencia && experience) experiencia.style.height = experience.clientHeight + 'px';
	},
	comp: function () {
		let complementaria: HTMLElement|null = document.querySelector('#complementaria');
		let complementary: HTMLElement|null = document.querySelector('#complementary');
		if(complementaria && complementary) complementaria.style.height = complementary.clientHeight + 'px';
	},
	academic: function () {
		let academica: HTMLElement|null = document.querySelector('#academica');
		let academic: HTMLElement|null = document.querySelector('#academic');
		if(academica && academic) academica.style.height = academic.clientHeight + 'px';
	},
	lang: function () {
		let idiomas: HTMLElement|null = document.querySelector('#idiomas');
		let languages: HTMLElement|null = document.querySelector('#languages');
		if(idiomas && languages) idiomas.style.height = languages.clientHeight + 'px';
	},
	other: function () {
		let otros: HTMLElement|null = document.querySelector('#otros');
		let other: HTMLElement|null = document.querySelector('#other');
		if(otros && other) otros.style.height = other.clientHeight + 'px';
	},
	async getCurriculum(id: any) {
		await axios({
			method: 'get',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Curriculum/${id}`,
		})
		.then((data: any) => {
			this.data = data.data;
		});
	}
	/*save: function() {
		const data = JSON.stringify(this.inputData)
		const blob = new Blob([data], {type: 'text/plain'})
		const e = document.createEvent('MouseEvents'),
		a = document.createElement('a');
		a.download = "CurriculumData.json";
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(e);
	},*/
  },
  async mounted() {
	  	if(this.$route.params.token) {
			this.curriculumId = this.$route.params.curriculumId;
			this.token = this.$route.params.token;
			this.data = this.getCurriculum(this.$route.params.curriculumId);
		}
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

