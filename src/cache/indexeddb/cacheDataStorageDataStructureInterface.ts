/**
 * Defines the structure of the way data is saved and resolved
 * using the IndexedDB cache.
 *
 * @since 2.0.0
 */
export default interface CacheDataStorageDataStructureInterface<T> {
    /**
     * The data that is or should be cached
     */
    readonly data: T;

    /**
     * The last time this cache item has been access
     */
    readonly lastAccess: Date;
}
