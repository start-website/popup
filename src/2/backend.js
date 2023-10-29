import Vue from 'vue'
import store from './store'
import App from './app/App.vue'
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui'
import { ElementTiptapPlugin } from 'element-tiptap'
// import ElementUI's styles
import 'element-ui/lib/theme-chalk/index.css'
// import this package's styles
import 'element-tiptap/lib/index.css'
import 'animate.css/animate.compat.css'

// import vueNcform from '@ncform/ncform'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import ncformStdComps from '@ncform/ncform-theme-elementui'
// import axios from 'axios'

// Vue.use(Element)
// Vue.use(vueNcform, { extComponents: ncformStdComps, /*lang: 'zh-cn'*/ })
// window.$http = Vue.prototype.$http = axios

// use ElementUI's plugin
Vue.use(ElementUI)
// // use this package's plugin
Vue.use(ElementTiptapPlugin, {
  /* plugin options */
    lang: "en", // see i18n
    spellcheck: true, // can be overwritten by editor prop
})

Vue.use(VueI18n)



Vue.config.productionTip = false

const app = new Vue({
    store,
    render: h => h(App),
}).$mount('#wa-app')