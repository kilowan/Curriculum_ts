<template>
  <div>
    <li v-if="!hide">
      {{otherData.name}}
      <b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
        <b-icon icon="eye-slash-fill"/>
      </b-link>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-other-${otherData.id}`)">
        <b-icon icon="pencil-square" aria-hidden="true"/>
      </b-link>
      <ul v-if="otherData.values.length > 0">
        <div v-for="(value, secondindex) in otherData.values" v-bind:key="secondindex">
          <value-view
            :value="value"
            :token="token"
            :iconsHidden="iconsHidden"
            @hide="$emit('sizeChange')"
          />
        </div>
      </ul>
    </li>
		<b-modal 
			:id="`edit-other-${otherData.id}`"
			title="Editar Otros"
			ok-title="Guardar"
			@ok="update"
			@cancel="cancel"
		>
      <label>Nombre:</label> <input type="text" v-model="otherData.name" /> <br />
		</b-modal>
  </div>
</template>


<script lang="ts">
import valueView from './ValueView.vue';
import axios from 'axios';

export default {
  name: 'OtherView',
  components: {
    valueView,
  },
  props:{
    otherData: {
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
      hide: false,
    }
	},
  methods: {
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/OtherData/${this.otherData.id}`,
			data: {
					name: this.otherData.name
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
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

