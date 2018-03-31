module.exports = {
  // ヘッダ
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'icon', href:'favicon.ico' }
    ]
  },
  // モジュール
  modules: [
    '@nuxtjs/vuetify',
    [ '@nuxtjs/google-adsense' ]
  ],
  // プラグイン
  plugins: [ '~/plugins/vue2-google-maps' ],
  'google-adsense': {
    id: 'ca-pub-4520726372899677'
  }
}