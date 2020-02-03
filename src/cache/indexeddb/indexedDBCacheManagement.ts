import CacheManagementInterface from "../cacheManagementInterface";
import CacheDataStorage from "../cacheDataStorage";

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
export default class IndexedDBCacheManagement<T>
    implements CacheManagementInterface<T> {
    /**
     * The instance of the browsers IndexedDB that is used by
     * this cache type to persist data.
     */
    private readonly _indexedDBDatabase: IDBDatabase;

    /**
     * Constructor
     *
     * @param indexedDBDatabase The database that is used
     */
    constructor(indexedDBDatabase: IDBDatabase) {
        this._indexedDBDatabase = indexedDBDatabase;
    }

    /**
     *
     * @param cacheMasterKeys
     */
    initialize(cacheMasterKeys: string[]): Promise<boolean> {
        this._indexedDBDatabase = indexedDB.open();
    }

    /**
     * @inheritdoc
     */
    load(key: string): Promise<CacheDataStorage<T>> {
        return Promise.resolve();
    }

    /**
     * @inheritdoc
     */
    update(data: CacheDataStorage<T>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    invalidate(): void {}

    /**
     * @inheritdoc
     */
    isValid(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    /**
     * Getter: _indexedDBDatabase
     */
    public get indexedDBDatabase(): IDBDatabase {
        return this._indexedDBDatabase;
    }
}
