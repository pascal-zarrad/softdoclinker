import AbstractCacheManagement from "@/cache/abstractCacheManagement";
import CacheDataStorage from "@/cache/cacheDataStorage";
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
    load(key: string): Promise<CacheDataStorage<T>> {
        return get(key);
    }

    /**
     * @inheritdoc
     */
    update(data: CacheDataStorage<T>): Promise<void> {
        return set(data.key, data);
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
            if (lastAccessDelta > this._lifetime) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
}
