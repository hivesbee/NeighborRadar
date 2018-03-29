import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
import config from '../google-map.config'

Vue.use(VueGoogleMaps, {
  load: {
    key: config.key,
    libraries: ['places', 'geocoder'],
    options: {
      streetViewControl: false,
      fullscreenControl: true
    }
  }
})