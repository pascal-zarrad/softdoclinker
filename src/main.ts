/* istanbul ignore file */
import App from "@/App.vue";
import Vuetify from "@/plugins/vuetify";
import { SoftDocLinker } from "./SoftDocLinker";
import Vue from "vue";
import "../node_modules/vuetify/dist/vuetify.min.css";

// Set instance of data layer management with initial default values
Vue.prototype.$softDocLinker = new SoftDocLinker();

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
