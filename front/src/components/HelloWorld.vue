<template>
  <v-container>
    Network: {{this.networkName}} <br/>
    Balance: {{this.balance}} <br/>
    Token Balance: {{this.tokenBalance}} <br/>
    EthAcc: {{this.ethAccount}} <br/>

    <h1>Mint tokens to an address</h1>
    <br/>

     <v-form
      ref="form2"
    >
      <v-text-field
        v-model="address"
        :counter="42"
        label="Address"
        type="text"
        required
      ></v-text-field>

      <v-text-field
        v-model="amount"
        label="Amount"
        :rules="[
          () => !!amount || 'Required amount',
          () => !!amount && amount <= 10000000|| 'Must be less than 10 millions'
        ]"
        type="number"
        required
      ></v-text-field>

      <v-btn
        color="success"
        @click="mintTokens({to: address, amount})"
      >
        Mint Free tokens
      </v-btn>
    </v-form>

    <v-list>
          <v-list-tile
            v-for="(tx, index) in txs"
            :key="index"
            @click=""
          >
            <v-list-tile-content>
                  <v-btn :href="makeUrl(tx)" target="_blank">{{makeUrl(tx)}}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
  </v-container>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        address: '',
        amount: '1'
      }
    },
    computed: {
      ...mapState('metamask', [ 'balance', 'ethAccount', 'tokenBalance', 'txs']),
      ...mapGetters('metamask', [ 'networkName' ]),
    },
    methods: {
      ...mapActions('metamask', ['mintTokens']),
      makeUrl(txHash) {
        const config = this.$store.getters['metamask/networkConfig']
        return `${config.explorerUrl.tx}/${txHash}`
      }
    }, 
    mounted() {
      this.$store.dispatch('metamask/askPermission')
      setTimeout(() => {
        this.address = this.ethAccount
      }, 2000)
    }
  }
</script>

<style>

</style>
