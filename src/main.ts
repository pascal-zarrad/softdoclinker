/* istanbul ignore file */

/*
 * Entry point of SoftDocLinker.
 *
 * main.ts is responsible for the application bootstrapping.
 * This includes:
 *  - Initialize dependency injection
 *  - Preparing Vue with the necessary reactive global state object
 *  - Initialize VueJS
 *
 */

import "reflect-metadata";
import Vue from "vue";

import App from "@/App.vue";
import Vuetify from "@/plugins/vuetify";
import ContainerManagement from "@/di/ContainerManagement";
import "../node_modules/vuetify/dist/vuetify.min.css";
import { TYPES } from "./di/types/inversify.symbols";

// Initialize dependency injection
ContainerManagement.getContainerManagement().init();

// Initialize shared state with default value
Vue.prototype.$sharedState = ContainerManagement.getContainerManagement().get(
    TYPES.SharedStateInterface
);

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
