import AbstractCacheManagement from "@/cache/AbstractCacheManagement";
import CacheDataStorage from "@/cache/CacheDataStorage";
import CacheDataStorageDataStructureInterface from "@/cache/indexeddb/CacheDataStorageDataStructureInterface";
import { del, get, set } from "idb-keyval";

/**
 * A cache manager that utilizes IndexedDB to store data local
 * in the browser of the user.
 *
 * The IndexedDB cache uses the key of a CacheDataStorage object
 * as the key to get the stored object.
 *
 * IndexedDB is used as a k-v store here. Not best practice
 * and will maybe change it in the future.
 *
 * The cache management converts the data to a simpler format
 * and throws away the cache key from the CacheDataStorage to
 * minimize saved data.
 *
 * @since 2.0.0
 */
export default class IndexedDBCacheManagement<
    T
> extends AbstractCacheManagement<T> {
    /**
     * @inheritdoc
     *
     * The IndexedDB cache does not need any initialization.
     * The promise returned by this function will do nothing.
     */
    initialize(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * @inheritdoc
     */
    async load(key: string): Promise<CacheDataStorage<T>> {
        const data: CacheDataStorageDataStructureInterface<T> = (await get(
            key
        )) as CacheDataStorageDataStructureInterface<T>;

        return new CacheDataStorage<T>(key, data.data, data.lastAccess);
    }

    /**
     * @inheritdoc
     */
    update(data: CacheDataStorage<T>): Promise<void> {
        const simplifiedCacheData: CacheDataStorageDataStructureInterface<T> = {
            data: data.data,
            lastAccess: data.lastAccess
        };
        return set(data.key, simplifiedCacheData);
    }

    /**
     * @inheritdoc
     */
    invalidate(key: string): Promise<void> {
        return del(key);
    }

    /**
     * @inheritdoc
     */
    public async isValid(key: string): Promise<boolean> {
        try {
            let cacheItem: CacheDataStorage<T> = await this.load(key);
            if (cacheItem === undefined) {
                return false;
            }

            const lastAccessDelta = Date.now() - cacheItem.lastAccess.getTime();
            if (lastAccessDelta / 1000 > this._lifetime) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
}
