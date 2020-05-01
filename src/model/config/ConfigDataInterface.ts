/**
 * An interface that defines the base configuration of SoftDocLinker
 *
 * @since 2.0.0
 */
export default interface ConfigDataInterface {
    /**
     * The name of the current SoftDocLinker instance
     */
    instanceName: string;

    /**
     * The backend that should be used
     * Currently available options: JSON
     */
    backend: string;

    /**
     * The backend to use for caching.
     * Currently available options: indexedDB
     */
    cache: string;

    /**
     * The time until SoftDocLinker considers cached data as invalid.
     * Default:
     */
    cacheLifetime: number;
}
