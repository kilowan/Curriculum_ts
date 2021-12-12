<template>
	<div id="page-wrap">			
		<div id="contact-info" class="vcard">
			<h1 class="fn">{{ data.fullName }}</h1>
			<p v-if="data.phoneNumber">
				Teléfono: <span class="tel">{{ data.phoneNumber.number }}</span><br />
				Email: <a class="email" :href="'mailto:'+ data.email.fullEmail">{{ data.email.fullEmail }}</a><br />
				Linkedin: <a class="link" :href="'https://www.' + data.socialMedia[0].name">{{ data.socialMedia[0].name }}</a>
			</p>
		</div>					
		<div id="objective">
			<p>{{ data.description }}</p>
		</div>			
		<div class="clear"></div>		
		<dl>
			<dt id="experiencia" v-if="data.experience">Experiencia profesional</dt>
			<dd id="experience" v-if="data.experience">
				<ul>
					<li v-for="(company, firstindex) in data.experience" v-bind:key="firstindex">
						{{company.name}}
						<ul>
							<li>Centro/Lugar: {{company.place}}</li>
							<li>Fecha inicio: {{new Date(company.initDate).toLocaleDateString()}}</li>
							<li>Fecha Fin: {{new Date(company.finishDate).toLocaleDateString()}}</li>
							<li>
								Contratos:
								<ul>
									<li v-for="(contract, secondindex) in company.contracts" v-bind:key="secondindex">
										{{contract.name}}
										<ul>
											<li>
												Proyectos:
												<ul>
													<li v-for="(project, thirdindex) in contract.projects" v-bind:key="thirdindex">
														{{project.name}}
														<ul>
															<li v-for="(description, fourthindex) in project.descriptionList" v-bind:key="fourthindex">{{description}}</li>
														</ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</dd>
			<dd class="clear"></dd>
			<dt id="academica" v-if="data.academicTraining">Formación académica</dt>
			<dd id="academic" v-if="data.academicTraining">
				<ul>
					<li v-for="(academicTraining, firstindex) in data.academicTraining" v-bind:key="firstindex">
						{{academicTraining.name}}
						<ul>
							<li>Centro/ Lugar: {{academicTraining.place}}</li>
							<li v-if="academicTraining.graduationDate">Graduación: {{new Date(academicTraining.graduationDate).getFullYear()}}</li>
							<li v-if="academicTraining.contents.length >0">
								Contenido:
								<ul>
									<li v-for="(content, secondindex) in academicTraining.contents" v-bind:key="secondindex">{{content.name}}</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</dd>
			<dd class="clear"></dd>
			<dt id="complementaria" v-if="data.otherTraining">Formación complementaria</dt>
			<dd id="complementary" v-if="data.otherTraining">
				<ul>
					<li v-for="(otherTraining, firstindex) in data.otherTraining" v-bind:key="firstindex">
						<strong>{{otherTraining.name}}</strong>
						<ul>
							<li>
								<strong>Contenido:</strong>
								<ul>
									<li v-for="(content, secondindex) in otherTraining.contents" v-bind:key="secondindex">
										{{content.name}}
										<ul>
											<li v-for="(subcontent, thirdindex) in content.subContents" v-bind:key="thirdindex">{{subcontent}}</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</dd>
			<dd class="clear"></dd>
			<dt id="idiomas" class="idiomas" v-if="data.languageList">Idiomas</dt>
			<dd id="languages" v-if="data.languageList">
				<ul>
					<li v-for="(languages, firstindex) in data.languageList" v-bind:key="firstindex">
						<strong>{{ languages.name }}:</strong> {{ languages.level }}
					</li>
				</ul>
			</dd>				
			<dd class="clear"></dd>					
			<dt id="otros" class="otros" v-if="data.otherData">Otros datos</dt>
			<dd id="other" v-if="data.otherData">
				<ul>
					<li v-for="(other, firstindex) in data.otherData" v-bind:key="firstindex">
						{{other.name}}
						<ul v-if="other.values.length > 0">
							<li v-for="(value, secondindex) in other.values" v-bind:key="secondindex">{{value}}</li>
						</ul>
					</li>
				</ul>
			</dd>					
			<dd class="clear"></dd>
		</dl>
		<dd class="clear"></dd>
	</div>
</template>


<script lang="ts">
//import { CurriculumDetail } from './Config/types';

export default {
  name: 'CurriculumView',
  data() {
		return {
			edit: false,
			page: 'select',
			selected: undefined,
			name: '',
			add: false,
			message: '',
			data: {},
			experience: Object,
			other: Object,
			academic: Object,
			otherData: Object,
		}
	},
	watch: {
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
		}
	},
  methods: {
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
	  	if(this.$route.params.curriculum) {
			this.data = this.$route.params.curriculum;
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

