import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import DataRepositoryInterface from "./dataRepositoryInterface";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";

/**
 * Abstract data repository that can be implemented get
 * data from a DataProviderInterface while using caching
 * mechanisms to improve performance.
 *
 * @since 2.0.0
 */
export default abstract class AbstractDataRepository<T>
    implements DataRepositoryInterface<T> {
    /**
     * The DataProviderInterface used as backend data source
     */
    protected dataProvider: DataProviderInterface<T>;

    /**
     * The CacheManagementInterface that is used to interact with
     * the cached data.
     */
    protected cacheManagement: CacheManagementInterface<T>;

    /**
     * The cacheDataStorageFactory factory used to create new
     * cacheDataStorage instances.
     */
    protected cacheDataStorageFactory: CacheDataStorageFactory;

    constructor(
        dataProvider: DataProviderInterface<T>,
        cacheManagement: CacheManagementInterface<T>,
        cacheDataStorageFactory: CacheDataStorageFactory
    ) {
        this.dataProvider = dataProvider;
        this.cacheManagement = cacheManagement;
        this.cacheDataStorageFactory = cacheDataStorageFactory;
    }

    /**
     * @inheritdoc
     */
    abstract async load(key: string): Promise<T>;
}
