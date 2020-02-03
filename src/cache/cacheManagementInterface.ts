import CacheDataStorage from "./cacheDataStorage";

/**
 * An interface that can be used to implement caching
 * mechanisms.
 *
 * This interface provides basic functions to control
 * the implemented cache.
 *
 * @since 2.0.0
 */
export default interface CacheManagementInterface<T> {
    /**
     * Initialize the cache management and prepare it for use.
     *
     * @param cacheMasterKeys The cache master keys that define the different types of data
     */
    initialize(cacheMasterKeys: string[]): Promise<boolean>;

    /**
     * Load the currently cached data from the cache.
     * Will throw an error if the cached data could not
     * be retrieved or if no data is cached.
     *
     * @param key The key of the targeted cache
     * @throws Error
     */
    load(key: string): Promise<CacheDataStorage<T>>;

    /**
     * Save new data to a cache or update it.
     *
     * @param data The new or updated DataCacheStorage<T>
     */
    update(data: CacheDataStorage<T>): Promise<boolean>;

    /**
     * Manually invalidate the currently cached data
     *
     * The master key
     */
    invalidate(cacheMasterKey: string): void;

    /**
     * Check if the cached data is valid
     */
    isValid(): Promise<boolean>;
}
