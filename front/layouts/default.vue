<template>
  <div>
    <nav class="navbar header" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item text-hide logo" href="/">
            Dyno Protocol Faucet
          </a>
        </div>
      </div>
    </nav>
    <section class="main-content section">
      <div class="container">
        <nuxt />
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer-brand text-hide logo">
          Dyno Protocol Faucet
        </div>
        <div class="buttons">
          <a href="https://twitter.com/DynoProtocol" target="_blank" class="button">
            <span class="icon icon-twitter" />
          </a>
          <a href="https://t.me/dynoprotocol" target="_blank" class="button">
            <span class="icon icon-telegram" />
          </a>
          <a href="https://github.com/dyno-protocol/dyno-faucet" target="_blank" class="button">
            <span class="icon icon-github" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
