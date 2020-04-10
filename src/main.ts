import App from "@/App.vue";
import Vuetify from "@/plugins/vuetify";
import Vue from "vue";
import "../node_modules/vuetify/dist/vuetify.min.css";

new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
