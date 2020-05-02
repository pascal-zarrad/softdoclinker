/* istanbul ignore file */

import CacheDataStorageFactory from "@/cache/CacheDataStorageFactory";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import ConfigDataRepository from "@/model/config/ConfigDataRepository";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";

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
