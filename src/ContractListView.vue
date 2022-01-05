<template>
	<li v-if="!hide">
		Contratos (ordenados de manera cronológica): 
    <b-link v-if="!iconsHidden" @click="contract = !contract, $emit('contract')">
      <b-icon v-if="contract" icon="chevron-up"/>
      <b-icon v-if="!contract" icon="chevron-down"/>
    </b-link>
		<ul v-if="contract">
			<div v-for="(contract, secondindex) in contracts" v-bind:key="secondindex">
        <contract-view
          :iconsHidden="iconsHidden"
          :contract="contract"
          :token="token"
          @contract="$emit('contract')"
          @refresh="$emit('refresh')"
          @hide="hidden"
        />
			</div>
		</ul>
	</li>
</template>


<script lang="ts">
import ContractView from './ContractView.vue';

export default {
  name: 'ContractsView',
  components: {
	ContractView
  },
  props:{
    contracts: {
      type: Array,
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
      contracted: false,
      hide: false,
      counter: 0,
    }
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0) {
        this.hide = true;
      }
      this.$emit('contract');
    },
  },
  mounted() {
    this.counter = this.contracts.length;
  }
}
</script>

