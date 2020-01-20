/**
 * A simple object that stores a
 *
 * @since 2.0.0
 */
export default class CacheDataStorage<T> {
    /**
     * The key of this cache data storage
     */
    public key: string;

    /**
     * The cached data
     */
    public data: T;

    /**
     * Constructor
     *
     * @param data The data that is cached by this CacheDataStorage object
     */
    constructor(key: string, data: T) {
        this.key = key;
        this.data = data;
    }
}
