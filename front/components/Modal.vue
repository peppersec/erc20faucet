<template>
  <div class="modal-card box box-modal">
    <div>
      Please select your Web3 Wallet
    </div>
    <button type="is-primary" @click="_web3Connect('metamask')">
      Metamask
    </button>
    <button type="is-primary" @click="_web3Connect('portis', 'kovan')">
      Portis
    </button>
    <button type="is-primary" @click="_web3Connect('squarelink', 'kovan')">
      SquareLink
    </button>
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

export default {
  data() {
    return {
      isBackuped: false,
      preparingModal: null,
      loading: false,
      message: 'Loading...'
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
