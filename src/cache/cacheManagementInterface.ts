import CacheDataStorage from "./cacheDataStorage";

/**
 * An interface that can be used to implement caching
 * mechanisms.
 *
 * This interface provides basic functions to controll
 * the implemented cache.
 *
 * @since 2.0.0
 */
export default interface CacheManagementInterface<T> {
    /**
     * Load the currently cached data from the cache.
     * Will throw an error if the cached data could not
     * be retrieved or if no data is cached.
     *
     * @param key The key of the targeted cache
     * @throws Error
     */
    load(key: string): CacheDataStorage<T>;

    /**
     * Save new data to a cache or update it.
     *
     * @param data The new or updated DataCacheStorage<T>
     */
    update(data: CacheDataStorage<T>): boolean;

    /**
     * Manually invalidate the currently cached data
     */
    invalidate(): void;

    /**
     * Check if the cached data is valid
     */
    isValid(): boolean;
}
