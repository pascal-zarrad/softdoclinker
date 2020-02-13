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
     * If the chosen cache type does not need an initialization or warmup,
     * this function can just return an empty promise.
     *
     * @param cacheMasterKeys The cache master keys that define the different types of data
     */
    initialize(): Promise<void>;

    /**
     * Load the currently cached data from the cache.
     * If there is no value in the cache for the specified key,
     * the resolved promise returned by this function will receive
     * 'undefined' as value.
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
    update(data: CacheDataStorage<T>): Promise<void>;

    /**
     * Manually invalidates the currently cached data with the specified key.
     * This means that the cache data storage of the specified key will be deleted.
     *
     * @param key The key of the cache data storage to remove
     */
    invalidate(key: string): void;

    /**
     * Check if the cached data is valid
     *
     * @param key The key of the cache item to check
     */
    isValid(key: string): Promise<boolean>;
}
