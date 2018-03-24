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
            <v-list-tile-title>住所から等高線を表示</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>NeighborRadar</v-toolbar-title>
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
              </gmap-map>
            </v-card>
          </v-flex>

          <v-flex xs12 text-xs-center>
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
                      <v-btn primary light @click.native="search(i)">
                        <v-icon light left>search</v-icon>検索
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 sm5 text-xs-center>
                      <v-select
                        :items="range"
                        v-model="sonar.range"
                        label="表示範囲 (m)"
                        class="input-group"
                        item-value="number"
                        input="changeViewCircle"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 offset-sm1 text-xs-center>
                      <v-select
                        v-bind:items="interval"
                        v-model="sonar.interval"
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
        </v-layout>
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
        mapSize: {
          display: 'block',
          width: '100%',
          height: '800px'
        },
        center: {
          lat: 35.6811673,
          lng: 139.76705160000006
        },
        location: {
          lat: 35.6811673,
          lng: 139.76705160000006
        },
        zoom: 15,

        sonar: {
          range: '',
          interval: ''
        },
        range: [
          500, 1000, 2000, 3000
        ],
        interval: [
          100, 200, 300, 500, 1000
       ],
      }
    },
    methods: {
      updateCenter () {
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