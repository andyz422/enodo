import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import * as VueGoogleMaps from "vue2-google-maps";
import Papa from 'vue-papa-parse'
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCnQW2XsCBpfqYd1PS4VU5Y3HMRGBe5--M"
	}
});
Vue.use(ElementUI);
Vue.use(Papa);

var app = new Vue({
  el: '#app',
  render: h => h(App),
});
