<template>
	<div style="text-align: center; margin: 0 auto; width:380px;">
		<div class="m-2" style="text-align: center; box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%); border-radius: 8px; background-color: #FFF">
			<h2 class="m-2">Recupera tu cuenta</h2>
			<hr>
			<div class="m-2">
				<p v-if="error">No hay resultados de búsqueda</p>
				<b-label class="m-2">Introduce tu usuario para buscar tu cuenta.</b-label><br/>
				<input v-model="username" style="width: 80%" class="m-2" type="text" placeholder="Nombre de usuario"/>
			</div>
			<hr>
			<div class="m-2">
				<b-button class="m-2" to="/">Cancelar</b-button>
				<b-button class="m-2" @click="checkCredentials">Buscar</b-button>
			</div>
		</div>
	</div>
</template>


<script lang="ts">

import axios from 'axios';

export default {
  name: 'PasswordRecovery',
  data() {
		return {
			selected: undefined,
			name: '',
			error: false,
			username: '',
		}
	},
  methods: {
	async checkCredentials() {
			await axios({
				method: 'get',
				url: "http://localhost:8080/api/Credentials/" + this.username
			}).then((data: any) =>{
				this.error = !data.data;
			}).catch((data: any)=> {
				this.error = true;
			});
	}
  },
}
</script>

