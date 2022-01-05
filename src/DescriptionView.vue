<template>
  <div>
    <li>
      {{description.name}}
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-description-${description.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
    </li>
		<b-modal 
			:id="`edit-description-${description.id}`"
			title="Editar descripción"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
			<input type="text" v-model="description.name" /> <br />
		</b-modal>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'DescriptionView',
  props:{
    description: {
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
			contract: false,
      add: false,
		}
	},
  methods: {
    cancel() {
      this.add = false;
    },
    async update() {
      await axios({
        method: 'put',
        headers: { Authorization: `Bearer ${this.token}` },
        url: `http://localhost:8080/api/Description/${this.description.id}`,
        data: {
          name: this.description.name,
        }
      }).then((data: any) =>{
        this.add = false;
        this.$emit('refresh');
      });
    }
  }
}
</script>