<template>
  <div id="app">
    <router-view
	/>
  </div>
</template>


<script lang="ts">

export default {
  name: 'App',
  components: {
	  //Login,
	},
  data() {
		return {
			edit: false,
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

