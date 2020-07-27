/* istanbul ignore file */
import CacheDataStorage from "@/cache/CacheDataStorage";

/**
 * Factory class for CacheDataStorage.
 * Provides a unified way to create CacheDataStorages
 *
 * @since 2.0.
 */
export default class CacheDataStorageFactory {
    /**
     * Create a new CacheDataStorage.
     *
     * @param key The key that the created CaceDataStorage should have
     * @param data The data that the CacheDataStorage should store initially
     */
    public create<T>(key: string, data: T): CacheDataStorage<T> {
        return new CacheDataStorage<T>(key, data, new Date());
    }
}
