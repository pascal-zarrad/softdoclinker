/* istanbul ignore file */

import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DocCollectionDataRepository from "@/model/doc/docCollectionDataRepository";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

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
