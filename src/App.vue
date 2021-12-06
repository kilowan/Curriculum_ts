<template>
		<div id="page-wrap">			
			<div id="contact-info" class="vcard">
				<h1 class="fn">{{ inputData.values[0].value }}</h1>
				<p>
					{{ inputData.values[1].key }}: <span class="tel">{{ inputData.values[1].value }}</span><br />
					{{ inputData.values[2].key }}: <a class="email" :href="'mailto:'+ inputData.values[2].value">{{ inputData.values[2].value }}</a><br />
					{{ inputData.values[3].key }}: <a class="link" :href="'https://www.' + inputData.values[3].value">{{ inputData.values[3].value }}</a>
				</p>
			</div>					
			<div id="objective">
				<p>{{ inputData.values[4].value }}</p>
			</div>			
			<div class="clear"></div>		
			<dl>
				<dt id="experiencia" v-if="inputData.values[7].values">{{ inputData.values[7].key }}</dt>
				<dd id="experience" v-if="inputData.values[7].values">
					<ul>
						<li v-for="(company, firstindex) in inputData.values[7].values" v-bind:key="firstindex" v-html="getChildrens(createLevel(company))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="academica" >{{ inputData.values[5].key }}</dt>
				<dd id="academic">
					<ul>
						<li v-for="(academicTraining, index) in inputData.values[5].values" v-bind:key="index" v-html="getChildrens(createLevel(academicTraining))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="complementaria" >{{ inputData.values[6].key }}</dt>
				<dd id="complementary">
					<ul>
						<li v-for="(academicTraining, index) in inputData.values[6].values" v-bind:key="index" v-html="getChildrens(createLevel(academicTraining))"></li>
					</ul>
				</dd>
				<dd class="clear"></dd>
				<dt id="idiomas" class="idiomas">{{ inputData.values[8].key }}</dt>
				<dd id="languages">
					<ul>
						<li v-for="(languages, index) in inputData.values[8].values" v-bind:key="index"><strong>{{ languages.key }}:</strong> {{ languages.value }}</li>
					</ul>
				</dd>				
				<dd class="clear"></dd>					
				<dt id="otros" class="otros">{{ inputData.values[9].key }}</dt>
				<dd id="other">
					<ul>
						<li v-for="(other, index) in inputData.values[9].values" v-bind:key="index" v-html="getChildrens(createLevel(other))"></li>
					</ul>
				</dd>					
				<dd class="clear"></dd>
			</dl>
			<dd class="clear"></dd>
		</div>
</template>


<script>
//import company from './company.vue';
import json from './CurriculumData.json';

export default {
  name: 'App',
  data:function(){
		return {
			edit: true,
			page: 'select',
			selected: undefined,
			inputData: json,
			name: '',
			add: false,
			message: '',
		}
	},
  methods: {
	save: function() {
		const data = JSON.stringify(this.inputData)
		const blob = new Blob([data], {type: 'text/plain'})
		const e = document.createEvent('MouseEvents'),
		a = document.createElement('a');
		a.download = "CurriculumData.json";
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(e);
	},
	createLevel(data){
		if (data) {
			let li = document.createElement("li");
			li.innerHTML = this.innerData(data);
			let ul = document.createElement("ul");
			if (this.checkData(data)) {
				data.values.forEach(element => {
					let lis = this.createLevel(element);
					ul.append(lis);
				});
				li.append(ul);
			}
			return li;
		}
	},
	checkData(data){
		return data.level === 2 && data.moreThanOne? true : data.values && data.values.length > 0? true : false;
	},
	innerData(data){
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
	getChildrens(parent){
		let result = '';
		parent.childNodes.forEach(children => {
			result += children.outerHTML;
		});

		return result;
	}
  },
  mounted:function() {
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

