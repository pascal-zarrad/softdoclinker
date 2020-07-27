/* istanbul ignore file */

import defaultConfigData from "@/model/config/defaultConfigData";
import defaultDocCollectionData from "@/model/doc/defaultDocCollectionData";
import SharedStateInterface from "@/model/SharedStateInterface";
import Vue from "vue";

/**
 * Returns a fresh object containing the default shared state.
 * This function is and should only being called once in the entire application.
 * It prepares a runnable state should be always functional to be able
 * to gather the custom state.
 *
 * Should only being called once during the inversify types initialization.
 *
 * @since 2.0.0
 */
export default function defaultSharedState(): SharedStateInterface {
    return Vue.observable({
        /**
         * @inheritdoc
         */
        loading: true,

        /**
         * @inheritdoc
         */
        currentConfig: defaultConfigData(),

        /**
         * @inheritdoc
         */
        currentDocData: defaultDocCollectionData()
    });
}
