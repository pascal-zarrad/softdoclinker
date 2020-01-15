import Vue from "vue";
import "../node_modules/vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import Vuetify from "@/plugins/vuetify";
import DataProviderFactory from "./dataprovider/config/configDataProviderFactory";
import ConfigInterface from "./model/config/configInterface";

Vue.config.productionTip = false;

new DataProviderFactory().create("ajax");

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
