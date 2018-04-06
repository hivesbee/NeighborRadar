
export default () => {
  window.addEventListener('onload', () => {
    const el = document.createElement('script')
    el.src = '//adm.shinobi.jp/s/271d97f7450ac288f8168ef1edc6297f'
    document.getElementById('NeighborRadar_ad_side').appendChild(el)
  })
}