import ConfigDataRepository from "@/model/config/configDataRepository";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigDataInterface from "@/model/config/configDataInterface";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheDataStorage from "@/cache/cacheDataStorage";
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";
import DefaultConfigData from "@/model/config/defaultConfigData";

jest.mock("@/cache/cacheDataStorageFactory");
jest.mock("@/dataprovider/config/configAjaxDataProvider");
jest.mock("@/cache/indexeddb/indexedDBCacheManagement");

describe("ConfigDataRepository", () => {
    describe("load", () => {
        it("should load a cached value if any is cached", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = new CacheDataStorage(
                "config",
                new DefaultConfigData()
            );

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            (configDataCacheManagement.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );
            (configDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await configDataRepository.load(expectedKey);

                expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(configDataCacheManagement.load).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(result).toBe(expectedConfigData.data);

                // When we have data cached, we don't want to waste resources
                expect(configDataProviderInterface.load).toHaveBeenCalledTimes(
                    0
                );
                expect(cacheDataStorageFactory.create).toHaveBeenCalledTimes(0);
                expect(configDataCacheManagement.update).toHaveBeenCalledTimes(
                    0
                );
            } catch (e) {
                fail(e);
            }
        });

        it("should create a new value if none is cached and cache it", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = new CacheDataStorage(
                "config",
                new DefaultConfigData()
            );

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();
            (configDataProviderInterface.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            (configDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(false);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            (cacheDataStorageFactory.create as jest.Mock).mockReturnValue(
                expectedConfigData
            );

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await configDataRepository.load(expectedKey);

                expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(configDataCacheManagement.update).toHaveBeenCalledWith(
                    expectedConfigData
                );
                expect(cacheDataStorageFactory.create).toHaveBeenCalledWith(
                    expectedKey,
                    expectedConfigData
                );
                expect(configDataProviderInterface.load).toHaveBeenCalled();
                expect(result).toBe(expectedConfigData);

                // When we have data cached, we don't want to waste resources
                expect(configDataCacheManagement.load).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });
    });
});
