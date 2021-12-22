<template>
	<table v-if="curriculumData.length >0">
		<tr>
			<th>CurriculumName</th>
		</tr>
		<tr v-for="(curriculum, firstindex) in curriculumData" v-bind:key="firstindex">
			<td @click="getCurriculum(curriculum.curriculumId)">
				{{ curriculum.curriculumName }}
			</td>
		</tr>
	</table>
</template>

<script lang="ts">

//import { User } from './Config/types';
import axios from 'axios';

//in progress
export default {
  name: 'CurriculumList',
  components: {},
  data() {
		return {
			curriculumData: [],
			token: '',
		}
	},
	methods:{
		getCurriculum(id: number){
			this.$router.push({
				name: 'CurriculumView', 
				params: {
					curriculumId: id.toString(),
					token: this.token,
				}
			});
		}
	},
  async mounted() {
		if(this.$route.params.user) {
			let user : any = this.$route.params.user;
			this.token = this.$route.params.token;
			await axios({
				method: 'get',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Curriculum/${user.userId}/${user.credentials.username}`,
			}).then((data: any) =>{
				this.curriculumData = data.data
			});
		}
	},
}
</script>

<style>
</style>
