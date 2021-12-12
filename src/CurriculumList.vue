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
			curriculumData: []
		}
	},
	methods:{
		async getCurriculum(id: number){
			await axios({
				method: 'get',
				url: "http://localhost:8080/api/Curriculum/" + id
			})
			.then((data: any) => {
				this.$router.push({
					name: 'CurriculumView', 
					params: {
						curriculum: data.data,
						curriculumId: id.toString()
					}
				});
			});
		}
	},
  async mounted() {
		if(this.$route.params.user) {
			let user : any = this.$route.params.user;
			await axios({
				method: 'get',
				url: "http://localhost:8080/api/Curriculum/" + user.userId + '/' + user.credentials.username
			}).then((data: any) =>{
				this.curriculumData = data.data
			});
		}
	},
}
</script>

<style>
</style>
