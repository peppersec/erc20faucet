<template>
  <div class="error-page">
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
      <path
        d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
      />
    </svg>
    <div class="title">
      <template v-if="error.statusCode === 404">
        This page could not be found
      </template>
      <template v-else>
        An error occurred
      </template>
    </div>
    <div class="description">
      <NuxtLink to="/">
        Back to the home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'error',
  head() {
    return {
      bodyAttrs: {
        class: 'is-centered-main-content'
      }
    }
  }
}
</script>

<style lang="scss">
.error-page {
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-size: 24px;
    font-size: 1.5rem;
    margin-top: 15px;
    margin-bottom: 8px;
  }

  .description {
    line-height: 21px;
    margin-bottom: 10px;
  }
}
</style>
