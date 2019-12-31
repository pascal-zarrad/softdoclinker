import ConfigInterface from "@/model/config/configInterface";

/**
 * A data provider to load a base configuration.
 *
 * @since 2.0.0
 */
export default interface ConfigDataProviderInterface {
    /**
     * Load the base configuration through ajax.
     */
    load(): Promise<ConfigInterface>;
}
