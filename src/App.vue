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
				<dt id="experiencia" v-if="experience">Experiencia profesional</dt>
				<dd id="experience" v-if="experience">
					<ul>
						<li v-for="(company, firstindex) in experience" v-bind:key="firstindex" v-html="getChildrens(createLevel(company))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="academica" v-if="academic">{{ academic.key }}</dt>
				<dd id="academic" v-if="academic">
					<ul>
						<li v-for="(academicTraining, index) in academic.values" v-bind:key="index" v-html="getChildrens(createLevel(academicTraining))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="complementaria" v-if="other">{{ other.key }}</dt>
				<dd id="complementary" v-if="other">
					<ul>
						<li v-for="(academicTraining, index) in other.values" v-bind:key="index" v-html="getChildrens(createLevel(academicTraining))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="idiomas" class="idiomas" v-if="data.languageList">Idiomas</dt>
				<dd id="languages" v-if="data.languageList">
					<ul>
						<li v-for="(languages, index) in data.languageList" v-bind:key="index"><strong>{{ languages.name }}:</strong> {{ languages.level }}</li>
					</ul>
				</dd>				
				<dd class="clear"></dd>					
				<dt id="otros" class="otros" v-if="otherData">{{ otherData.key }}</dt>
				<dd id="other" v-if="otherData">
					<ul>
						<li v-for="(other, index) in otherData.values" v-bind:key="index" v-html="getChildrens(createLevel(other))"></li>
					</ul>
				</dd>					
				<dd class="clear"></dd>
			</dl>
			<dd class="clear"></dd>
		</div>
</template>


<script lang="ts">
//import company from './company.vue';
import axios from 'axios';
import { Curriculum, Training, Content, SubContent, OtherData } from './Config/types';

export default {
  name: 'App',
  data:function(){
		return {
			edit: true,
			page: 'select',
			selected: undefined,
			name: '',
			add: false,
			message: '',
			data: Object,
			experience: Object,
			other: Object,
			academic: Object,
			otherData: Object,
		}
	},
  methods: {
	async load(){
      await axios({
        method: 'get',
        url: "http://localhost:8080/api/Curriculum/" + 1
      }).then((data: any) =>{
		  debugger;
		  let datas : Curriculum = data.data
		  this.data = datas;
		  this.experience = this.mapExperience(datas.experience);
		  this.other = this.mapOther(datas.otherTraining);
		  this.academic = this.mapAcademic(datas.academicTraining)
		  this.otherData = this.mapOtherData(datas.otherData);
        }
      );
	},
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
	mapOtherData(data: Array<OtherData>) {
		let result: any = 
		{ 
			level: 0, 
			key: "Otros datos", 
			values: data.map((otherData: OtherData) => {
			return { 
						level: 1, 
						key: otherData.name, 
						values: otherData.values.map((value: string) => {
							return { level: 2, key: value, values: [] }
						}) 
					}
				})
		};
		debugger;
		return result;
	},
	mapAcademic(data: Array<Training>){
		let result : any = {
			key:"Formación académica",
			values: data.map((academic : Training) =>{
				let values: Array<any> = [];
				if(academic.place) values.push({ level:1, moreThanOne:false, key: "Centro/ Lugar", value: academic.place });
				if(academic.graduationDate) values.push({ level:1, moreThanOne:false, key: "Graduación", value: academic.graduationDate });
				if(academic.initDate) values.push({ level:1, moreThanOne:false, key: "Fecha inicio", value: academic.initDate });
				if(academic.finishDate) values.push({ level:1, moreThanOne:false, key: "Fecha Fin", value: academic.finishDate });
				if(academic.contents.length > 0) values.push(
					{ level:1, 
						moreThanOne:false, 
						key: "Contenido", 
						values: academic.contents.map((content: Content) =>{
							return { level:2, key: content.name, values: []}
						}) 
					});
				return { level:0, moreThanOne: true, key: academic.name, values: values}
			})
		};

		return result;
	},
	mapOther(data: Array<Training>){
		let training : Training = data[0];
		let result : any = {
			key:"Formación complementaria",
			values: [
				{
					level:0,
					key:training.name,
					values:[
						{
							level:1,
							key:"Contenido",
							values: training.contents.map((content: Content) => {
								return { 
									level: 2, 
									key: content.name, 
									values: content.subContents.map((subContent: SubContent)=> {
										return { level: 2, key: subContent, values: [] }
								})}
							})
						}
					]
				}
			]
		}

		return result;
	},
	mapExperience(data: any){
		let result = data.map((exp:any) => {
			return {
				level: 1,
				key: exp.name, 
				values: [{
							level:2,
							key: "Centro/ Lugar",
							value: exp.place,
							values: []
						},
						{
							level:2,
							key: "Fecha inicio",
							value: exp.initDate,
							values: []
						},
						{
							level:2,
							key: "Fecha Fin",
							value: exp.finishDate,
							values: []
						},
						{
							level:2,
							key: "Contratos",
							values: exp.contracts.map((datas: any) => {
								return {level: 3, key: datas.name, values: [
									{
										key: "Proyectos", 
										level: 4, 
										values: datas.projects.map((project: any) => {
										return {
													level: 5, 
													key: project.name, 
													values: project.descriptionList.map((description: any) => {
														return {level: 6, key: description, values:[]}
													})
												}
										})
									}
								]}
							})
						}
			]}
		})
		return result;
	},
	createLevel(data: any){
		if (data) {
			let li = document.createElement("li");
			li.innerHTML = this.innerData(data);
			let ul = document.createElement("ul");
			if (this.checkData(data)) {
				data.values.forEach((element: any) => {
					let lis : any = this.createLevel(element);
					ul.append(lis);
				});
				li.append(ul);
			}
			return li;
		}
	},
	checkData(data: any){
		return data.level === 2 && data.moreThanOne? true : data.values && data.values.length > 0? true : false;
	},
	innerData(data: any){
		switch (data.level) {
			case 0: 
				return '<h2>' + data.key + '</h2>';
			case 1: 
				return data.value? '<strong>' + data.key + '</strong>: ' + data.value : '<strong>' + data.key + ':<strong>';
			default:
			case 2: 
				return data.value? data.key + ': ' + data.value : data.values.length > 1? data.key + ':' : data.key;
			case 3: 
				return '<strong>' + data.key + ':<strong>';
			case 4: 
				return data.key;
			case 5: 
				return '<strong>' + data.key + ':<strong>';
			case 6: 
				return data.key;
		}
	},
	getChildrens(parent: HTMLElement){
		let result = '';
		parent.childNodes.forEach((children: any) => {
			result += children.outerHTML;
		});

		return result;
	}
  },
  mounted() {
	this.load();
	window.onload = function() {
		document.querySelector('#experiencia').style.height = document.querySelector('#experience').clientHeight + 'px';
		document.querySelector('#complementaria').style.height = document.querySelector('#complementary').clientHeight + 'px';
		document.querySelector('#academica').style.height = document.querySelector('#academic').clientHeight + 'px';
		document.querySelector('#idiomas').style.height = document.querySelector('#languages').clientHeight + 'px';
		document.querySelector('#otros').style.height = document.querySelector('#other').clientHeight + 'px';
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
</style>

