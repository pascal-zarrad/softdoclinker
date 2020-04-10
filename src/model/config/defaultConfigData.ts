import ConfigDataInterface from "@/model/config/configDataInterface";

/**
 * Data class that provides the default configuration of SoftDocLinker
 *
 * @since 2.0.0
 */
export default class DefaultConfigData implements ConfigDataInterface {
    /**
     * @inheritdoc
     */
    public instanceName: string = "SoftDocLinker";

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
