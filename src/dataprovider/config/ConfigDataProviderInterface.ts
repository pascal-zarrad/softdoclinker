import ConfigDataInterface from "@/model/config/ConfigDataInterface";

/**
 * Data provider to get the configuration of SoftDocLinker from
 * a specified data source.
 * The data source is specified by the implementation of this interface.
 *
 * @since 2.0.0
 */
export default interface ConfigDataProviderInterface {
    /**
     * Load new config data from data source.
     *
     * @returns Promise<ConfigDataInterface>
     */
    load(): Promise<ConfigDataInterface>;
}
