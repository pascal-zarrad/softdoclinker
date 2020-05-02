/* istanbul ignore file */

import CacheDataStorageFactory from "@/cache/CacheDataStorageFactory";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import DocCollectionDataRepository from "@/model/doc/DocCollectionDataRepository";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";

/**
 * Factory to create DataRepository for DocCollections instances.
 *
 * @since 2.0.0
 */
export default class DocCollectionDataRepositoryFactory {
    /**
     * Create a new DataRepositoryInterface<DocCollectionInterface>
     *
     * @param dataProvider The data provider to passed during instantiation
     * @param cacheManagement The cache management passed dusting instantiation
     * @param cacheDataStorageFactory The CacheDataStorageFactory passed during instantiation
     */
    public create(
        dataProvider: DataProviderInterface<DocCollectionInterface>,
        cacheManagement: CacheManagementInterface<DocCollectionInterface>,
        cacheDataStorageFactory: CacheDataStorageFactory
    ): DataRepositoryInterface<DocCollectionInterface> {
        return new DocCollectionDataRepository(
            dataProvider,
            cacheManagement,
            cacheDataStorageFactory
        );
    }
}
