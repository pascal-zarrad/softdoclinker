import CacheDataStorage from "@/cache/CacheDataStorage";
import CacheDataStorageInterface from "@/cache/CacheDataStorageInterface";
import CacheManagementBridge from "@/cache/CacheManagementBridge";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import CacheDataStorageDataStructureInterface from "@/cache/indexeddb/CacheDataStorageDataStructureInterface";
import { TYPES } from "@/di/types/inversify.symbols";
import SharedStateInterface from "@/model/SharedStateInterface";
import { del, get, set } from "idb-keyval";
import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

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
@(fluentProvide(TYPES.CacheManagementInterface)
    .whenInjectedInto(CacheManagementBridge)
    .done())
export default class IndexedDBCacheManagement<T>
    implements CacheManagementInterface<T> {
    /**
     * The sharedState of the application
     */
    protected sharedState: SharedStateInterface;

    /**
     * Constructor
     */
    public constructor(
        @inject(TYPES.SharedStateInterface) sharedState: SharedStateInterface
    ) {
        this.sharedState = sharedState;
    }

    /**
     * @inheritdoc
     *
     * The IndexedDB cache does not need any initialization.
     * The promise returned by this function will do nothing.
     */
    public initialize(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * @inheritdoc
     */
    public async load(key: string): Promise<CacheDataStorage<T>> {
        const data: CacheDataStorageDataStructureInterface<T> = (await get(
            key
        )) as CacheDataStorageDataStructureInterface<T>;

        return new CacheDataStorage<T>(key, data.data, data.lastAccess);
    }

    /**
     * @inheritdoc
     */
    public update(data: CacheDataStorageInterface<T>): Promise<void> {
        const simplifiedCacheData: CacheDataStorageDataStructureInterface<T> = {
            data: data.data,
            lastAccess: data.lastAccess
        };
        return set(data.key, simplifiedCacheData);
    }

    /**
     * @inheritdoc
     */
    public invalidate(key: string): Promise<void> {
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
            if (
                lastAccessDelta / 1000 >
                this.sharedState.currentConfig.cacheLifetime
            ) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
}
