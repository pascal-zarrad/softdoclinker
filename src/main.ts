import Vue from "vue";
import "../node_modules/vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import Vuetify from "@/plugins/vuetify";
import SoftDocLinkerInterface from "./softDocLinkerInterface";
import SoftDocLinker from "./softDocLinker";
import ConfigDataRepository from "./model/config/configDataRepository";
import DocCollectionDataRepository from "./model/doc/docCollectionDataRepository";

Vue.config.productionTip = false;

const softDocLinker: SoftDocLinkerInterface = new SoftDocLinker();
softDocLinker
    .getConfigDataRepository()
    .then(configDataRepository => {
        return configDataRepository.load(ConfigDataRepository.CONFIG_KEY);
    })
    .then(configData => {
        console.log(configData);
        return softDocLinker.getDocDataRepository();
    })
    .then(docDataRepository => {
        return docDataRepository.load(DocCollectionDataRepository.DOC_KEY);
    })
    .then(docData => console.log(docData))
    .catch(e => console.log(e));
new Vue({
    vuetify: Vuetify,
    render: h => h(App)
}).$mount("#app");
