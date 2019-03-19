<template>
  <v-container>
    Network: {{ networkName }} <br>
    Balance: {{ balance }} {{ currency }} <br>
    Token Balance: {{ tokenBalance }} FAU<br>
    EthAcc: {{ ethAccount }} <br>
    Token Address: {{ tokenAddress }} <br>

    <h1>Mint tokens to an address</h1>
    <br>

    <v-form
      ref="form2"
    >
      <v-text-field
        v-model="address"
        :counter="42"
        label="Address"
        :rules="[
          () => !!address || 'Required address',
          () => isValidAddress || 'Address must be valid'
        ]"
        type="text"
        required
      />

      <v-text-field
        v-model="amount"
        label="Amount"
        :rules="[
          () => !!amount || 'Required amount',
          () => !!amount && amount <= 10000000|| 'Must be less than 10 millions'
        ]"
        type="number"
        required
      />

      <v-btn
        color="success"
        @click="mintTokens({ to: address, amount })"
      >
        Mint Free tokens
      </v-btn>
    </v-form>

    <v-list>
      <v-list-tile
        v-for="(tx, index) in txs"
        :key="index"
      >
        <v-list-tile-content>
          <v-btn :href="makeUrl(tx)" target="_blank">
            {{ makeUrl(tx) }}
          </v-btn>
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
      amount: '1'
    }
  },
  computed: {
    ...mapState('metamask', ['balance', 'ethAccount']),
    ...mapState('token', ['txs']),
    ...mapGetters('metamask', ['networkName', 'currency']),
    address: {
      get() {
        return this.$store.state.metamask.address.value
      },
      set(address) {
        this.$store.dispatch('metamask/setAddress', { address })
      }
    },
    isValidAddress: {
      get() {
        return this.$store.state.metamask.address.valid
      }
    },
    tokenBalance: {
      get() {
        return this.$store.state.token.balance
      }
    },
    tokenAddress: {
      get() {
        return this.$store.state.token.address
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('metamask/askPermission')
  },
  methods: {
    ...mapActions('token', ['mintTokens']),
    makeUrl(txHash) {
      const config = this.$store.getters['metamask/networkConfig']
      return `${config.explorerUrl.tx}/${txHash}`
    }
  }
}
</script>
