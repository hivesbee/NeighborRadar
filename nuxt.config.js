module.exports = {
  // ヘッダ
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // モジュール
  modules: [
    '@nuxtjs/vuetify'
  ],
  // プラグイン
  plugins: [ '~/plugins/vue2-google-maps' ],
}