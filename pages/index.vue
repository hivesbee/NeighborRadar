<template>
  <v-app id="main">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>住所から同心円を表示</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>NeighborRadar <span v-if="subtitle"> - {{ subtitle }}</span></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center row wrap>
          <v-flex xs12 text-xs-center>
            <v-card class="grey lighten-4 elevation-0 ma-1">
              <gmap-map
                :class="$style.mapSize"
                ref="map"
                :center="center"
                :zoom="zoom"
                @center_changed="updateCenter">
                <gmap-marker
                  :position="location"
                  :clickable="false"
                  :draggable="false"
                  @click="center=location">
                </gmap-marker>
                <gmap-circle
                  v-for="c in circles"
                  :key="JSON.stringify(c.location)"
                  :center="c.location"
                  :radius="c.radius"
                  :options="c.options">
                </gmap-circle>
              </gmap-map>
            </v-card>
          </v-flex>

          <v-flex xs7 text-xs-center>
            <v-card>
              <v-card-actions primary-title>
                <v-container fluid>
                  <v-layout justify-center row wrap>
                    <v-flex xs12 sm10 text-xs-center>
                      <v-text-field
                        label="中心とする住所"
                        v-model="address"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm2 text-xs-center>
                      <v-btn primary light @click.native="search()">
                        <v-icon light left>search</v-icon>検索
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-select
                        :items="range"
                        v-model="selectedRange"
                        label="表示範囲 (m)"
                        class="input-group"
                        item-value="number"
                        input="changeViewCircle"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 offset-sm1 text-xs-center>
                      <v-select
                        v-bind:items="interval"
                        v-model="selectedInterval"
                        label="間隔 (m)"
                        class="input-group"
                        item-value="number"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4 offset-xs1 text-xs-center>
            <v-card fluid>
              <v-container justify-center row wrap>
                <v-layout v-html="admax">
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- admax -->
        <script src="//adm.shinobi.jp/s/271d97f7450ac288f8168ef1edc6297f"></script>
        <!-- admax -->
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017 nethive.info</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'index',
    props: {
      source: String
    },
    data () {
      return {
        drawer: null,
        // ページサブタイトル
        subtitle: '住所から同心円を表示',
        // google map の中心座標
        center: {
          lat: 35.6811673,
          lng: 139.76705160000006
        },
        location: {
          lat: 35.6811673,
          lng: 139.76705160000006
        },
        // 表示用の円
        circles: [],
        // 表示拡大率
        zoom: 15,
        // 入力用の住所
        address: '',
        // 表示領域
        range: [
          500, 1000, 2000, 3000
        ],
        // 選択された表示領域
        selectedRange: 500,
        // 表示間隔
        interval: [
          100, 200, 300, 500, 1000
        ],
        // 選択された表示間隔
        selectedInterval: 100,
        admax: ''
      }
    },
    mounted () {
      // this.admax = `<!-- admax -->\n<script src=\"\/\/adm.shinobi.jp\/s\/271d97f7450ac288f8168ef1edc6297f\"><\/script>\n<!-- admax -->`
    },
    methods: {
      updateCenter () {
      },
      search () {
        const geocoder = new window.google.maps.Geocoder()
        console.log(geocoder)
        geocoder.geocode({
          'address': this.address,
          'region': 'jp'
        }, (results, status) => {
          if (status === 'OK') {
            console.log(results)
            this.location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }

            // set center.
            this.center = {
              lat: this.location.lat,
              lng: this.location.lng
            }

            this.drawCircle()
          }
        })
      },
      drawCircle () {
        this.circles = []
        for (let i = this.selectedInterval; i < this.selectedRange; i += this.selectedInterval) {
          this.circles.push({
            location: this.location,
            radius: i,
            options: {
              fillOpacity: 0.0,
              strokeWeight: 3,
              strokeColor: '#42a5f5'
            }
          })
        }

        this.circles.push({
          location: this.location,
          radius: this.selectedRange,
          options: {
            fillOpacity: 0.0,
            strokeWeight: 4,
            strokeColor: '#1E88E6'
          }
        })
      }
    },
    watch: {
      selectedRange (val) {
        this.selectedRange = val
        this.drawCircle()
      },
      selectedInterval (val) {
        this.selectedInterval = val
        this.drawCircle()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<style module lang="scss" scoped>
  .mapSize {
    display: block;
    width: 100%;
    height: 400px;
  }
</style>