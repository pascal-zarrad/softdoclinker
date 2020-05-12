import ConfigDataInterface from "@/model/config/ConfigDataInterface";

/**
 * Returns a fresh object containing the default config of SoftDocLinker
 *
 * @since 2.0.0
 */
export default function defaultConfigData(): ConfigDataInterface {
    return {
        /**
         * The default value leaves the value empty,
         * to not display a wrong title for some milliseconds.
         *
         * @inheritdoc
         */
        instanceName: "",

        /**
         * @inheritdoc
         */
        backend: "JSON",

        /**
         * @inheritdoc
         */
        cache: "indexedDB",

        /**
         * @inheritdoc
         */
        cacheLifetime: 86400,

        /**
         * @inheritdoc
         */
        navigation: {
            links: []
        }
    };
}
