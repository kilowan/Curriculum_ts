<template>
	<div v-if="!hide">
		<dt id="otros" class="otros" v-if="other">Otros datos
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="other" v-if="other">
			<ul>
				<div v-for="(otherData, firstindex) in other" v-bind:key="firstindex">
          <other-view
            :otherData="otherData"
            :token="token"
            :iconsHidden="iconsHidden"
            @hide="hidden"
            @sizeChange="$emit('sizeChange')"
            @refresh="$emit('refresh')"
          />
				</div>
			</ul>
			<div v-if="add">
				<input type="text" v-model="otherNew" />
				<b-button class="m-2" @click="save">Guardar</b-button>
				<b-button class="m-2" @click="cancel">Cancelar</b-button>
			</div>
			<b-link v-if="!iconsHidden" @click="add = true">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Otros Datos
			</b-link>
		</dd>
    <dd class="clear"></dd>
	</div>
</template>


<script lang="ts">
import otherView from './OtherView.vue';
import axios from 'axios';

export default {
  name: 'OtherListView',
  components: {
    otherView
  },
  props:{
    other: {
      type: Array,
      required: true
    },
    curriculumId: {
      type: Number,
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
      hide: false,
      add: false,
      counter: 0,
      otherNew: '',
    }
	},
  methods: {
    hidden(){
      this.counter--;
      if (this.counter == 0 && this.other.length >= 1) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
		cancel() {
			this.otherNew = '';
			this.add = false;
		},
		async save() {
			if (this.otherNew !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/OtherData`,
				data: {
					name: this.otherNew,
					curriculumId: this.curriculumId,
				}
				}).then((data: any) =>{
					this.cancel();
					this.$emit('refresh');
				});
			}
		}
  },
  mounted(){
    this.counter = this.other.length;
  },
}
</script>

