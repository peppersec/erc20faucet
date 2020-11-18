/* eslint-disable no-console */
const modifyHtml = (html) => {
  return html.replace(/data-n-head=""|data-n-head="true"/g, '')
}

const modules = [
  ['nuxt-buefy', { css: false, materialDesignIcons: false }],
  ['nuxt-validate', { events: '' }],
  'nuxt-web3-provider'
]
if (process.env.NODE_ENV !== 'development') {
  modules.push([
    '@nuxtjs/google-analytics',
    {
      id: 'UA-61981520-6'
    }
  ])
}

export default {
  mode: 'spa',
  render: { resourceHints: false },
  /*
   ** Headers of the page
   */
  hooks: {
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html)
    }
  },
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'ERC20 Token Faucet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'An ERC20 token faucet on the Ethereum mainnet, and Ropsten, Kovan, Rinkeby and Görli testnets.'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ERC20 Faucet Dapp Smart Contract'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Get free ERC20 token on any Ethereum network'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://erc20faucet.com'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://erc20faucet.com/fb.png'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Get free ERC20 token on any Ethereum network'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Airdrop, ERC20 Ethereum, free erc20, erc20 faucet, dapp, smart contract, decentralized, metamask'
      }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'icon', type: 'image/png', href: 'apple-touch-icon-180x180.png' },
      { rel: 'apple-touch-icon', href: 'apple-touch-icon-180x180.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700'
      }
    ],
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        async: ''
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  // ...routerBase,
  // router: {
  //   base: '/erc20faucet/'
  // },

  /*
   ** Global CSS
   */
  css: ['@/assets/styles/styles.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/ads.js', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules,

  providers: {
    rpcUrl: 'https://mainnet.infura.io/v3/c7463beadf2144e68646ff049917b716'
  },

  env: {
    infuraId: process.env.INFURA_ID
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
