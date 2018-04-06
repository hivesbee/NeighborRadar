<template>
  <div id="NeighborRadar_ad_side2">
    <!-- admax -->
    <!--<script src="//adm.shinobi.jp/s/271d97f7450ac288f8168ef1edc6297f"></script>-->
    <!-- admax -->
  </div>
</template>

<script>
  export default {
    name: "ninja-admax",
    mounted () {
      if (process.browser) {
        console.log('hoge')
        const el = document.createElement('script')
          el.src = '//adm.shinobi.jp/s/271d97f7450ac288f8168ef1edc6297f'
          document.getElementById('NeighborRadar_ad_side').innerHTML = `<!-- admax --><script src="//adm.shinobi.jp/s/271d97f7450ac288f8168ef1edc6297f"><\/script><!-- admax -->`
        // window.addEventListener('onload', () => {
        //
        // })
      }
    }
  }
</script>

<style scoped>
  div {
    /*width: 300px;*/
    /*height: 250px;*/
    /*background: blue;*/
  }
</style>