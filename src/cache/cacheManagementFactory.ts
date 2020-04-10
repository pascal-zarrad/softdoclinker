import CacheManagementInterface from "@/cache/cacheManagementInterface";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";

/**
 * Factory class to create cache management instances.
 *
 * @since 2.0.0
 */
export default class CacheManagementFactory {
    /**
     * Create a new cache management instance with a specific type
     * of caching backend.
     *
     * @param type The type of caching backend to use
     */
    public create<T>(type: string): CacheManagementInterface<T> {
        switch (type) {
            case "indexedDB":
                return new IndexedDBCacheManagement<T>();
            default:
                return new IndexedDBCacheManagement<T>();
        }
    }
}
