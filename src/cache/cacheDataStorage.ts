/* istanbul ignore file */

/**
 * A simple object that stores a simple key-value cache
 * object.
 *
 * @since 2.0.0
 */
export default class CacheDataStorage<T> {
    /**
     * The key of this cache data storage
     */
    private _key: string;

    /**
     * The cached data
     */
    private _data: T;

    /**
     * The last time this cache data storage has been accessed.
     */
    private _lastAccess: Date;

    /**
     * Constructor
     *
     * @param data The data that is cached by this CacheDataStorage object
     */
    constructor(key: string, data: T, lastAccess: Date = new Date()) {
        this._key = key;
        this._data = data;
        this._lastAccess = lastAccess;
    }

    /**
     * Getter: _key
     *
     * Will set _lastAccess to the current date when called.
     */
    public get key(): string {
        return this._key;
    }

    /**
     * Setter: _key
     *
     * Will set _lastAccess to the current date when called.
     */
    public set key(value: string) {
        this._key = value;
    }

    /**
     * Getter: _data
     *
     * Will set _lastAccess to the current date when called.
     */
    public get data(): T {
        return this._data;
    }

    /**
     * Setter: _data
     *
     * Will set _lastAccess to the current date when called.
     */
    public set data(value: T) {
        this._data = value;
    }

    /**
     * Getter: _lastAccess
     */
    public get lastAccess(): Date {
        return this._lastAccess;
    }
}
