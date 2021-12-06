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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
