import CacheManagementInterface from "./cacheManagementInterface";
import CacheDataStorage from "./cacheDataStorage";

/**
 * Provides an abstract base with some default methods
 * and values for cache management implementations.
 *
 * @since 2.0.0
 */
export default abstract class AbstractCacheManagement<T>
    implements CacheManagementInterface<T> {
    /**
     * The lifetime of a cache data storage till it is invalid in milliseconds.
     */
    protected lifetime: number;

    /**
     * Constructor
     *
     * @param lifetime The lifetime that cached data has in this cache (default: 24 hours)
     */
    public constructor(lifetime: number = 86400) {
        this.lifetime = lifetime;
    }

    /**
     * @inheritdoc
     */
    public abstract initialize(): Promise<void>;

    /**
     * @inheritdoc
     */
    public abstract load(key: string): Promise<CacheDataStorage<T>>;

    /**
     * @inheritdoc
     */
    public abstract update(data: CacheDataStorage<T>): Promise<void>;

    /**
     * @inheritdoc
     */
    public abstract invalidate(key: string): void;

    /**
     * @inheritdoc
     */
    public async isValid(key: string): Promise<boolean> {
        let cacheItem: CacheDataStorage<T> | undefined = await this.load(key);
        if (cacheItem === undefined) {
            return false;
        }

        const lastAccessDelta = Date.now() - cacheItem.lastAccess.getTime();
        if (lastAccessDelta > this.lifetime) {
            return false;
        }

        return true;
    }
}
