<template>
  <div class="level-item partners">
    <a
      v-for="(partner, key) in partners"
      :key="key"
      :href="`//${partner.url}`"
      :class="['partner', `partner--${key}`]"
      :title="partner.title"
      target="_blank"
      rel="noreferrer"
    >
      {{ partner.title }}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partners: {
        '1inch': {
          title: 'Trade on 1inch.exchange',
          url: '1inch.exchange/#/r/0xA5025FABA6E70B84F74e9b1113e5F7F4E7f4859f'
        }
      }
    }
  }
}
</script>
