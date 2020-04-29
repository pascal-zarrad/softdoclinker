import ConfigDataInterface from "@/model/config/configDataInterface";

/**
 * Data class that provides the default configuration of SoftDocLinker
 *
 * @since 2.0.0
 */
export default class DefaultConfigData implements ConfigDataInterface {
    /**
     * The default value leaves the value empty,
     * to not display a wrong title for some milliseconds.
     *
     * @inheritdoc
     */
    public instanceName: string = "";

    /**
     * @inheritdoc
     */
    public backend: string = "JSON";

    /**
     * @inheritdoc
     */
    public cache: string = "indexedDB";

    /**
     * @inheritdoc
     */
    public cacheLifetime: number = 86400;
}
