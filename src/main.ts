/* istanbul ignore file */
import App from "@/App.vue";
import Vuetify from "@/plugins/vuetify";
import { SoftDocLinker } from "@/SoftDocLinker";
import defaultSharedState from "@/model/defaultSharedState";
import "../node_modules/vuetify/dist/vuetify.min.css";

import "reflect-metadata";
import Vue from "vue";

// Set instance of data layer management with initial default values
Vue.prototype.$softDocLinker = new SoftDocLinker();
// Initialize shared state with default value
Vue.prototype.$sharedState = Vue.observable(defaultSharedState());

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
