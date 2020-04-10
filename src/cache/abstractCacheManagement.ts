import CacheDataStorage from "@/cache/cacheDataStorage";
import CacheManagementInterface from "@/cache/cacheManagementInterface";

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
    protected _lifetime: number;

    /**
     * Constructor
     *
     * @param lifetime The lifetime that cached data has in this cache (default: 24 hours)
     */
    public constructor(lifetime: number = 86400) {
        this._lifetime = lifetime;
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
    public abstract invalidate(key: string): Promise<void>;

    /**
     * @inheritdoc
     */
    public abstract async isValid(key: string): Promise<boolean>;

    /**
     * Getter: _lifetime
     */
    /* istanbul ignore next */
    public get lifetime_1(): number {
        return this._lifetime;
    }
}
