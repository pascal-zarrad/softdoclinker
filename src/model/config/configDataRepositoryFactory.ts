/* istanbul ignore file */

import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigDataInterface from "@/model/config/configDataInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";

/**
 * Factory to create DataRepository for ConfigData instances.

 *
 * @since 2.0.0
 */
export default class ConfigDataRepositoryFactory {
    /**
     * Create a new DataRepositoryInterface<ConfigDataInterface>
     *
     * @param dataProvider The data provider to passed during instantiation
     * @param cacheManagement The cache management passed dusting instantiation
     * @param cacheDataStorageFactory The CacheDataStorageFactory passed during instantiation
     */
    public create(
        dataProvider: DataProviderInterface<ConfigDataInterface>,
        cacheManagement: CacheManagementInterface<ConfigDataInterface>,
        cacheDataStorageFactory: CacheDataStorageFactory
    ): DataRepositoryInterface<ConfigDataInterface> {
        return new ConfigDataRepository(
            dataProvider,
            cacheManagement,
            cacheDataStorageFactory
        );
    }
}
