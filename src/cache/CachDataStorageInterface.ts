/**
 * Provides a type for the responses of caches that return a
 * plain old JavaScript object.
 *
 * Can be used in combination with Object.assign to convert
 * an existing
 *
 * @since 2.0.0
 */
export default interface CacheDataStorageDataInterface<T> {
    /**
     * The key of this cache data storage
     */
    _key: string;

    /**
     * The cached data
     */
    _data: T;

    /**
     * The last time this cache data storage has been accessed.
     */
    _lastAccess: Date;
}
