<template>
	<div style="text-align: center; margin: 0 auto; width:380px;">
		<div class="m-2" style="box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%); border-radius: 8px; background-color: #FFF">
			<div class="m-2">
				<div class="m-2">
					<div style="width: 100%;">
						<input 
							style="width: 100%; margin-top: 10px;" 
							type="text" 
							v-model="username"
							placeholder="Nombre de usuario"
						>
					</div>
					<div style="width: 100%; margin-top: 2%;">
						<input 
							style="width: 80%" 
							class="m-2" 
							v-if="!edit" 
							type="password" 
							v-model="password"
							placeholder="Contraseña"
						/>
						<input 
							style="width: 80%" 
							class="m-2" 
							v-else 
							type="text" 
							v-model="password"
							placeholder="Contraseña"
						/>
						<b-link style="width: 20%" @click="edit = !edit">
							<b-icon v-if="!edit" icon="eye" aria-hidden="true"></b-icon>
							<b-icon v-if="edit" icon="eye-slash" aria-hidden="true"></b-icon>
						</b-link>
					</div>
				</div>
				<div  class="m-2">
					<b-button @click="login" style="width: 100%;">Entrar</b-button>
				</div>
				<div class="m-2">
					<b-link @click="$router.push('PasswordRecovery');">¿Has olvidado la contraseña?</b-link>
				</div>
				<hr />
				<div class="m-2">
					<b-button @click="$bvModal.show('new-account');" style="width: 100%;">
						Crear cuenta nueva
					</b-button>
				</div>
			</div>
			<hr />
		</div>
		<b-modal 
			id="new-account" 
			title="Nueva Cuenta"
			ok-title="Registrarte"
		>
			<div>
				<div>
					<div>
						<div>Nombre</div>
						<input type="text">
					</div>
				</div>
				<div>
					<div>
						<div>Apellidos</div>
						<input type="text">
					</div>
				</div>
				<div>
					<div>Número de móvil o correo electrónico</div>
					<input type="text">
				</div>
				<div>
					<div>Vuelva a introducir el correo electrónico</div>
					<input type="text">
				</div>
				<div>
					<div>Contraseña nueva</div>
					<input type="password" autocomplete="new-password">
				</div>
			</div>
		</b-modal>
	</div>
</template>


<script lang="ts">
import axios from 'axios';

export default {
  name: 'App',
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
			username: '',
			password: ''
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
	async login(){
		if(this.username !== '')
			await axios({
				method: 'get',
				url: "http://localhost:8080/api/Credentials/" + this.username + '/' + this.password
			}).then((data: any) =>{
				let username : string = this.username;
				if(data.data) this.getUser(username);
				}
			);
	},
	async getUser(username: string){
      await axios({
        method: 'get',
        url: "http://localhost:8080/api/User/" + username
	})
	.then((data: any) => {
		debugger;
        this.$router.push({
          name: 'CurriculumList', 
		  params: {
            user: data.data
          }
		});
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

