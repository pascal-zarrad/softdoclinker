/* istanbul ignore file */

import defaultConfigData from "@/model/config/defaultConfigData";
import defaultDocCollectionData from "@/model/doc/defaultDocCollectionData";
import SharedStateInterface from "@/model/SharedStateInterface";

/**
 * Returns a fresh object containing the default shared state
 *
 * @since 2.0.0
 */
export default function defaultSharedState(): SharedStateInterface {
    return {
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
    };
}
