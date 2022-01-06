<template>
	<div>
		<li v-if="!hide">
			<strong>{{ skill.name }}</strong>
			<b-link v-if="!iconsHidden" @click="contract = !contract, $emit('sizeChange')">
				<b-icon v-if="contract" icon="chevron-up"/>
				<b-icon v-if="!contract" icon="chevron-down"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-skill-${skill.id}`)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-skill-${skill.id}`)">
				<b-icon icon="x-circle-fill" aria-hidden="true"/>
			</b-link>
			<ul v-if="contract">
				<div>
					<contents-view
						:type="ContentType.complementary"
						:contents="skill.contents"
						:token="token"
						:trainingId="skill.id"
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
			:id="`edit-skill-${skill.id}`" 
			title="Editar skill"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<input class="m-2" type="text" v-model="skill.name" />
			</div>
		</b-modal>
		<b-modal 
			:id="`delete-skill-${skill.id}`"
			title="Eliminar Contrato"
			ok-title="Eliminar"
			@ok="deleteSkill"
		>
			<div style="text-align: center; margin: 0 auto; width:380px;">
				<h1>¿Seguro que quieres eliminar el contrato '{{ skill.name }}'?</h1>
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
    skill: {
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
					trainingId: this.skill.id,
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
			url: `http://localhost:8080/api/Training/${this.skill.id}`,
			data: {
				name: this.skill.name
			}
			}).then((data: any) =>{
			this.element = '';
			this.add = false;
			this.$emit('refresh');
			});
		},
		async deleteSkill() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Training/${this.skill.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

