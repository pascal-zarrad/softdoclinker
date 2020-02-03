import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import DataRepositoryInterface from "./dataRepositoryInterface";
import CacheManagementInterface from "@/cache/cacheManagementInterface";

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
    private dataProvider: DataProviderInterface<T>;

    /**
     * The CacheManagementInterface that is used to interact with
     * the cached data.
     */
    private cacheManagement: CacheManagementInterface<T>;

    constructor(
        dataProvider: DataProviderInterface<T>,
        cacheManagement: CacheManagementInterface<T>
    ) {
        this.dataProvider = dataProvider;
        this.cacheManagement = cacheManagement;
    }

    /**
     * @inheritdoc
     */
    abstract load(key: string): T;
}
