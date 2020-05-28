<template>
  <div>
    <nav
      class="navbar header"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item text-hide logo"
            href="/"
          >
            ERC20 Token Faucet
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
          ERC20 Token Faucet
        </div>
        <div class="copyright">
          <p>
            Token Faucet v.1.10 {{ new Date().getFullYear() }}
          </p>
        </div>
        <div class="buttons social-buttons">
          <a href="https://twitter.com/PeppersecCOM" target="_blank" class="button">
            <span class="icon icon-twitter" />
          </a>
          <a href="https://t.me/erc20Faucet" target="_blank" class="button">
            <span class="icon icon-telegram" />
          </a>
          <a href="https://github.com/peppersec/erc20faucet" target="_blank" class="button">
            <span class="icon icon-github" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
