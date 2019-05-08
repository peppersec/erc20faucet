<template>
  <div>
    <nav
      class="navbar header"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="/"
          >
            <img
              src="~assets/img/logo.svg"
              alt="ERC20 Token Faucet"
              height="40"
            >
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
        <div class="footer-brand">
          <img src="~assets/img/logo.svg" height="28" alt="">
        </div>
        <div class="copyright">
          <p>
            Token Faucet v.1.07 {{ new Date().getFullYear() }}
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
