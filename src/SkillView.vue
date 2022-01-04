<template>
	<div>
		<li v-if="!hide">
			<strong>{{otherTrainingData.name}}</strong>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="contract = !contract, $emit('sizeChange')">
				<b-icon v-if="contract" icon="chevron-up"/>
				<b-icon v-if="!contract" icon="chevron-down"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-skill-${otherTrainingData.id}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
			<ul v-if="contract">
				<div>
					<contents-view
						:type="ContentType.complementary"
						:contents="otherTrainingData.contents"
						:token="token"
						:trainingId="otherTrainingData.id"
						:iconsHidden="iconsHidden"
						@sizeChange="$emit('sizeChange')"
						@refresh="$emit('refresh')"
					/>
				</div>
				<div v-if="add">
					<input class="m-2" type="text" v-model="element" />
					<b-button class="m-2" @click="save">Guardar</b-button>
					<b-button class="m-2" @click="cancel">Cancelar</b-button>
				</div>
				<b-link v-if="!iconsHidden" @click="add = true">
					<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contenido
				</b-link>
			</ul>
		</li>
		<b-modal 
		:id="`edit-skill-${otherTrainingData.id}`" 
		title="Editar skill"
		ok-title="Guardar"
		@ok="update"
		@cancel="cancel"
		>
		<div style="text-align: center; margin: 0 auto; width:380px;">
			<input class="m-2" type="text" v-model="otherTrainingData.name" />
		</div>
		</b-modal>
	</div>
</template>


<script lang="ts">
import ContentsView from './ContentsView.vue';
import { ContentType } from './Config/types'
import axios from 'axios';

export default {
  name: 'ComplementaryExperienceView',
  components: {
    ContentsView
  },
  props:{
    otherTrainingData: {
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
			ContentType: ContentType,
			contract: false,
			hide: false,
			add: false,
			element: '',
		}
	},
	methods: {
		cancel() {
			this.element = '';
			this.add = false;
		},
		async save() {
			if (this.element !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Content`,
				data: {
					name: this.element,
					trainingId: this.otherTrainingData.id,
				}
				}).then((data: any) =>{
				this.element = '';
				this.add = false;
				this.$emit('refresh');
				});
			}
		},
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Training/${this.otherTrainingData.id}`,
			data: {
				name: this.otherTrainingData.name
			}
			}).then((data: any) =>{
			this.element = '';
			this.add = false;
			this.$emit('refresh');
			});
		},
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
  .marco {
    margin:2%;
	border-style: groove; border-width: 1px;
  }
</style>

