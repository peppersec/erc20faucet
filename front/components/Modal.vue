<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Please select your Web3 Wallet
      </p>
    </header>
    <section class="modal-card-body">
      <div class="field is-grouped is-grouped-centered is-grouped-multiline wallets">
        <div class="control">
          <button class="button is-small is-dark is-metamask" @click="_web3Connect('metamask')">
            Metamask
          </button>
        </div>
        <div class="control control-with-select">
          <button class="button is-small is-dark is-portis" @click="_web3Connect('portis', portisNetwork)">
            Portis
          </button>
          <NetworkSelect v-model="portisNetwork" />
        </div>
        <div class="control control-with-select">
          <button class="button is-small is-dark is-squarelink" @click="_web3Connect('squarelink', squarelinkNetwork)">
            SquareLink
          </button>
          <NetworkSelect v-model="squarelinkNetwork" />
        </div>
      </div>
    </section>
    <b-loading :active.sync="loading">
      <div class="loading-container">
        <div class="loading-tornado" />
        <div class="loading-message">
          {{ message }}...
        </div>
      </div>
    </b-loading>
  </div>
</template>
<script>
/* eslint-disable no-console */
// import { mapActions, mapState } from 'vuex'
import NetworkSelect from '@/components/NetworkSelect'

export default {
  components: {
    NetworkSelect
  },
  data() {
    return {
      isBackuped: false,
      preparingModal: null,
      loading: false,
      message: 'Loading...',
      portisNetwork: 'mainnet',
      squarelinkNetwork: 'mainnet'
    }
  },
  computed: {
    // ...mapState('mixer', ['note', 'txWillPass', 'prefix'])
  },
  methods: {
    // ...mapActions('mixer', ['sendDeposit']),
    async _web3Connect(providerName, networkName) {
      this.loading = true
      await this.$store.dispatch('metamask/askPermission', { providerName, networkName })
      // await this.sendDeposit()
      this.$parent.close()
    }
  }
}
</script>
