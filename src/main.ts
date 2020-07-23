/* istanbul ignore file */

import "reflect-metadata";
import Vue from "vue";

import App from "@/App.vue";
import Vuetify from "@/plugins/vuetify";
import { SoftDocLinker } from "@/SoftDocLinker";
import defaultSharedState from "@/model/defaultSharedState";
import ContainerManagement from "@/di/ContainerManagement";
import "../node_modules/vuetify/dist/vuetify.min.css";

// Initialize dependency injection
ContainerManagement.getContainerManagement().init();

// Set instance of data layer management with initial default values
Vue.prototype.$softDocLinker = new SoftDocLinker();
// Initialize shared state with default value
Vue.prototype.$sharedState = Vue.observable(defaultSharedState());

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
