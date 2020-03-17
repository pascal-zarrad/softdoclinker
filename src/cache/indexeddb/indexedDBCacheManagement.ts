import CacheDataStorage from "../cacheDataStorage";
import { set, get, del } from "idb-keyval";
import AbstractCacheManagement from "../abstractCacheManagement";

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
}
