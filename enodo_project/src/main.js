import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import * as VueGoogleMaps from "vue2-google-maps";
import XLSX from 'xlsx'

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCnQW2XsCBpfqYd1PS4VU5Y3HMRGBe5--M"
	}
});
Vue.use(ElementUI);
Vue.use(XLSX);

var app = new Vue({
  el: '#app',
  render: h => h(App),
});
