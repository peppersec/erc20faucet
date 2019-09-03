<template>
  <div class="columns">
    <div class="column is-two-thirds-tablet is-half-desktop">
      <h1 class="title">
        Ethereum ERC20 Token Faucet
      </h1>
      <h2 class="subtitle">
        Mint tokens to an address
      </h2>

      <div>
        <b-field
          label="Address"
          :type="{'is-danger': errors.has('address')}"
          :message="errors.first('address')"
          class="field-height"
        >
          <b-input
            v-model="address"
            v-validate="{ required: true, max: 42, valid_address: true }"
            name="address"
            placeholder="0x00000..."
            maxlength="42"
          />
        </b-field>

        <b-field
          label="Amount"
          :type="{'is-danger': errors.has('amount')}"
          :message="errors.first('amount')"
          class="field-height"
        >
          <b-input
            v-model="amount"
            v-validate="{ required: true, numeric: true, min_value: 1, max_value: 10000000 }"
            type="number"
            min="1"
            max="10000000"
            name="amount"
            placeholder="1"
          />
        </b-field>

        <div class="level is-mobile">
          <button
            class="button is-primary"
            @click.prevent="validateBeforeSubmit"
          >
            Mint Free Tokens
          </button>
          <button
            class="button is-primary"
            @click.prevent="onConnectWeb3"
          >
            Connect
          </button>
          <a href="https://peppersec.com" target="_blank" class="is-flex">
            <span class="icon icon-madeby" />
          </a>
        </div>
      </div>

      <div class="info columns is-multiline">
        <div class="column">
          <p class="heading">
            Network
          </p>
          <p class="title">
            {{ networkName }}
          </p>
        </div>
        <div class="column">
          <p class="heading">
            Balance
          </p>
          <p class="title">
            {{ balance }} {{ currency }}
          </p>
        </div>
        <div class="column">
          <p class="heading">
            Token Balance
          </p>
          <p class="title">
            {{ tokenBalance }} FAU
          </p>
        </div>
        <div class="column is-12">
          <p class="heading">
            ETH Account
          </p>
          <p class="title">
            <a class="title" :href="addressUrl(ethAccount)" target="_blank">
              {{ ethAccount }}
            </a>
          </p>
        </div>
        <div class="column is-12">
          <p class="heading">
            Token Address
          </p>
          <p class="title">
            <a class="title" :href="addressUrl(tokenAddress)" target="_blank">
              {{ tokenAddress }}
            </a>
          </p>
        </div>
        <div v-show="txs.length > 0" class="column is-12">
          <p class="heading">
            Sent transactions
          </p>
          <b-field class="explorer" grouped group-multiline>
            <p
              v-for="(tx, index) in txs"
              :key="index"
              class="control"
            >
              <a :href="makeUrl(tx)" target="_blank">
                {{ makeUrl(tx) }}
              </a>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
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
    isAddressValid: {
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
  watch: {
    address(value) {
      this.$validator.validate('address', value)
    },
    amount(value) {
      this.$validator.validate('amount', value)
    }
  },
  created() {
    this.$validator.extend('valid_address', {
      getMessage: field => `The ${field} must be valid.`,
      validate: () => !!this.isAddressValid
    })
  },
  mounted() {
    window.onload = () => {
      this.$store.dispatch('metamask/fetchGasPrice', {})
    }
  },
  methods: {
    ...mapActions('token', ['mintTokens']),
    makeUrl(txHash) {
      const config = this.$store.getters['metamask/networkConfig']
      return `${config.explorerUrl.tx}/tx/${txHash}`
    },
    addressUrl(address) {
      const config = this.$store.getters['metamask/networkConfig']
      return `${config.explorerUrl.tx}/address/${address}`
    },
    onConnectWeb3() {
      this.$modal.open({
        parent: this,
        component: Modal,
        hasModalCard: true,
        width: 440
      })
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          await this.mintTokens({ to: this.address, amount: this.amount })
          this.$toast.open({
            message: 'Success',
            type: 'is-success',
            position: 'is-top'
          })
          return
        }
        this.$toast.open({
          message: 'Please check the fields.',
          type: 'is-danger',
          position: 'is-top'
        })
      })
    }
  }
}
</script>
