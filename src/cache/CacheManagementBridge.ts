import CacheDataStorage from "@/cache/CacheDataStorage";
import CacheDataStorageInterface from "@/cache/CacheDataStorageInterface";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import BridgeInterface from "@/di/pattern/BridgeInterface";
import { Inject } from "@vue-ioc/core";
import { injectable } from "inversify";
import IndexedDBCacheManagement from "./indexeddb/IndexedDBCacheManagement";

/**
 * Bridge to enable dynamic exchange of cache management implementation.
 *
 * @since 2.0.0
 */
@injectable()
export default class CacheManagementBridge<T>
    implements
        CacheManagementInterface<T>,
        BridgeInterface<CacheManagementInterface<T>> {
    /**
     * @inheritdoc
     */
    private _implementation: CacheManagementInterface<T>;

    /**
     * Constructor
     */
    constructor(
        @Inject(IndexedDBCacheManagement)
        implementation: CacheManagementInterface<T>
    ) {
        this._implementation = implementation;
    }

    /**
     * @inheritdoc
     */
    public initialize(): Promise<void> {
        return this._implementation.initialize();
    }

    /**
     * @inheritdoc
     */
    public load(key: string): Promise<CacheDataStorage<T>> {
        return this._implementation.load(key);
    }

    /**
     * @inheritdoc
     */
    public update(data: CacheDataStorageInterface<T>): Promise<void> {
        return this._implementation.update(data);
    }

    /**
     * @inheritdoc
     */
    public invalidate(key: string): Promise<void> {
        return this._implementation.invalidate(key);
    }

    /**
     * @inheritdoc
     */
    public isValid(key: string): Promise<boolean> {
        return this._implementation.isValid(key);
    }

    /**
     * @inheritdoc
     */
    public exchangeImplementation(
        newImplementation: CacheManagementInterface<T>
    ): CacheManagementInterface<T> {
        const oldImplementation = this.implementation;
        this._implementation = newImplementation;

        return oldImplementation;
    }

    /**
     * Getter: _implementation
     */
    public get implementation(): CacheManagementInterface<T> {
        return this._implementation;
    }
}
