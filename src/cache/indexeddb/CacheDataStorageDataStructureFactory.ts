import { injectable } from "inversify";
import CacheDataStorageDataStructureInterface from "./CacheDataStorageDataStructureInterface";

/**
 * Factory to create CacheDataStorageDataStructures.
 *
 * @since 2.0.0
 */
@injectable()
export default class CacheDataStorageDataStructureFactory {
    /**
     * Create a new CacheDataStorageDataStructure.
     *
     * @param data The data of the cache data storage to store
     * @param lastAccess The last time the entry was accessed
     */
    public create<T>(
        data: T,
        lastAccess: Date
    ): CacheDataStorageDataStructureInterface<T> {
        return {
            data: data,
            lastAccess: lastAccess
        };
    }
}
