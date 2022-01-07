<template>
	<div v-if="!hide">
      <b-icon v-if="socialMediaData.type.id === SocialMediaType.Linkedin" icon="linkedin" aria-hidden="true"/> <a v-if="socialMediaData.type.id === SocialMediaType.Linkedin" :href="'https://www.' + socialMediaData.name">{{ socialMediaData.name }}</a>
      <b-icon v-if="socialMediaData.type.id === SocialMediaType.GitHub" icon="github" aria-hidden="true"/> <a v-if="socialMediaData.type.id === SocialMediaType.GitHub" :href="socialMediaData.name">{{ socialMediaData.name }}</a>
      <b-icon v-if="socialMediaData.type.id === SocialMediaType.Infojobs" icon="link" aria-hidden="true"/> <a v-if="socialMediaData.type.id === SocialMediaType.Infojobs" :href="socialMediaData.name">{{ socialMediaData.name }}</a>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('contract')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-social-media-${socialMediaData.id}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
		<b-modal 
			:id="`edit-social-media-${socialMediaData.id}`"
			title="Editar red social"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<label>Url:</label> <input type="text" v-model="socialMediaData.name" /> <br />
			<label>Tipo:</label> <b-form-select :options="sociamMediaTypes" v-model="socialMediaData.type.id" ></b-form-select> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import { SocialMediaType } from './Config/types';
import axios from 'axios';

export default {
  name: 'SocialMediaView',
  props:{
    socialMediaData: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      SocialMediaType: SocialMediaType,
      hide: false,
      sociamMediaTypes: [],
		}
	},
  methods: {
		async update() {
      debugger;
			await axios({
			  method: 'put',
			  headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/SocialMedia/${this.socialMediaData.id}`,
			data: {
					name: this.socialMediaData.name,
          typeId: this.socialMediaData.type.id
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
  },
  async mounted() {
		await axios({
			method: 'get',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/SocialMediaType`,
		})
		.then((data: any) => {
      this.sociamMediaTypes = data.data.map((smt: any) => {
          return { value: smt.id, text: smt.name };
        });
		});
  }
}
</script>

