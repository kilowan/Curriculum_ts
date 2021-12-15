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
					<b-link @click="$router.push('PasswordRecovery')">¿Has olvidado la contraseña?</b-link>
					<!--<b-link>¿Has olvidado la contraseña?</b-link>-->
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
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<div class="m-2">
					<input style="width: 100%; margin-top: 10px;" placeholder="Nombre" type="text" v-model="name">
				</div>
				<div class="m-2">
					<input style="width: 100%; margin-top: 10px;" placeholder="Primer Apellido" type="text" v-model="surname1">
				</div>
				<div class="m-2">
					<input style="width: 100%; margin-top: 10px;" placeholder="Segundo Apellido" type="text" v-model="surname2">
				</div>
				<div class="m-2">
					<input style="width: 100%; margin-top: 10px;" placeholder="Correo electrónico" type="text" v-model="email">
				</div>
				<div class="m-2">
					<input style="width: 100%; margin-top: 10px;" placeholder="Teléfono" type="text" v-model="phoneNumber">
				</div>
				<div class="m-2">
					<div>Nombre de usuario</div>
					<input style="width: 100%; margin-top: 10px;" type="text" v-model="username">
				</div>
				<div class="m-2">
					<div>Contraseña</div>
					<input style="width: 100%; margin-top: 10px;" type="password" v-model="password">
				</div>
			</div>
		</b-modal>
		<b-modal 
			id="password-recovery" 
			title="Recupera tu cuenta"
			hide-footer
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<div class="m-2" style="text-align: center;">
					<p v-if="error">No hay resultados de búsqueda</p>
					<b-label v-if="state == 0" class="m-2">Introduce tu usuario para buscar tu cuenta.</b-label><br/>
					<input v-if="state == 0" v-model="username" style="width: 80%" class="m-2" type="text" placeholder="Nombre de usuario"/>
					<b-label v-if="state == 1" class="m-2">Introduce el código que te hemos enviado</b-label><br/>
					<input v-if="state == 1" v-model="securityCode" style="width: 80%" class="m-2" type="text" placeholder="Código de seguridad"/>
					<b-label v-if="state == 2" class="m-2">Introduce el nuevo password</b-label><br/>
					<input v-if="state == 2" v-model="password" style="width: 80%" class="m-2" type="text" placeholder="Nuevo password"/>
				</div>
					<hr>
					<div class="m-2">
						<!--<b-button class="m-2" to="/">Cancelar</b-button>-->
						<b-button v-if="state == 0" class="m-2" @click="checkCredentials">Buscar</b-button>
						<b-button v-if="state == 1" class="m-2" @click="sendCode">Enviar código</b-button>
						<b-button v-if="state == 2" class="m-2" @click="saveChanges">Guardar</b-button>
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
			state: 0,
			code: false,
			error: false,
			securityCode: '',
			edit: false,
			name: '',
			surname1: '',
			surname2: '',
			email: '',
			phoneNumber: '',
			username: '',
			password: '',
			data: Object,
			token: '',
		}
	},
  methods: {
	async newAccount() {
		if(this.checkFields()){
			await axios({
				method: 'post',
				url: `http://localhost:8080/api/User/${this.username}/${this.password}`,
				data:{
					name: this.name,
					surname1: this.surname1,
					surname2: this.surname2,
					email: this.email,
					phoneNumber: this.phoneNumber,
					credentials:{
						username: this.username,
						password: this.password,
					}
				}
			}).then((data: any) =>{
				if(data.data) {
					this.login();
				}
			});
		}

	},
	checkFields() {
		let result = true; 
		if(!this.checkField(this.name)) result = false;
		if(!this.checkField(this.surname1)) result = false;
		if(!this.checkField(this.surname2)) result = false;
		if(!this.checkField(this.email)) result = false;
		if(!this.checkField(this.username)) result = false;
		if(!this.checkField(this.password)) result = false;
		return result;
	},
	checkField(field: any) {
		return field !== null && field !== ''? true: false;
	},
	async login(){
		if(this.username !== '')
			await axios({
				method: 'get',
				url: `http://localhost:8080/api/Credentials/${this.username}/${this.password}`,
			}).then((data: any) =>{
				let username : string = this.username;
				if(data.data) {
						this.token = data.data;
						this.getUser(username, this.token);
				}
			});
	},
	async checkCredentials() {
			await axios({
				method: 'get',
				url: `http://localhost:8080/api/Credentials/${this.username}`,
			}).then((data: any) =>{
				//this.error = !data.data;
				this.state = 1;
			}).catch((data: any)=> {
				//this.error = true;
			});
	},
	async sendCode() {
			await axios({
				method: 'get',
				url: `http://localhost:8080/api/PasswordRecovery/${this.username}`,
			}).then((data: any) =>{
				this.code = data.data;
				data.data? this.state = 2 : this.state = 1;
			}).catch((data: any)=> {
				this.state = 1;
			});
	},
	async saveChanges() {
		await axios({
			method: 'put',
			url: "http://localhost:8080/api/PasswordRecovery/",
			data: {
				username: this.username,
				password: this.password
			}
		}).then((data: any) =>{
			this.code = data.data;
			data.data? this.state = 2 : this.state = 1;
		}).catch((data: any)=> {
			this.state = 1;
		});
	},
	async getUser(username: string, token: string){
      await axios({
        method: 'get',
		url: `http://localhost:8080/api/User/${username}`,
		headers: { Authorization: `Bearer ${this.token}` }
	})
	.then((data: any) => {
        this.$router.push({
          name: 'CurriculumList', 
		  params: {
            user: data.data,
			token: token
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

